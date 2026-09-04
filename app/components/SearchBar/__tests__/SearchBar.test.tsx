import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '@/app/components/SearchBar/SearchBar';

const mockSearchResults = {
  results: [
    {
      id: 1,
      title: 'Mutiny on the Bounty',
      poster_path: '/poster1.jpg',
      release_date: '2026-05-12',
    },
    {
      id: 2,
      title: 'Mutiny Rising',
      poster_path: null,
      release_date: '2025-01-01',
    },
  ],
};

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders search input initially without dropdown', () => {
    render(<SearchBar />);
    
    const input = screen.getByPlaceholderText(/search movies.../i);
    expect(input).toBeInTheDocument();
    expect(screen.queryByText(/searching.../i)).not.toBeInTheDocument();
  });

  it('fetches and displays search results after typing and debounce', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResults,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search movies.../i);

    fireEvent.change(input, { target: { value: 'Mutiny' } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText('Mutiny on the Bounty')).toBeInTheDocument();
      expect(screen.getByText('Mutiny Rising')).toBeInTheDocument();
    });

    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
  });

  it('displays "No movies found" when search returns empty results', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search movies.../i);
    fireEvent.change(input, { target: { value: 'UnknownMovieX' } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(screen.getByText(/no movies found/i)).toBeInTheDocument();
    });
  });
});
