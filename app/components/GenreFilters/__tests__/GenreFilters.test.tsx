import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GenreFilters from '@/app/components/GenreFilters/GenreFilters';

const mockReplace = jest.fn();
let mockSearchParams = new URLSearchParams();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => mockSearchParams,
  usePathname: () => '/movies',
}));

const mockGenres = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
];

describe('GenreFilters Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchParams = new URLSearchParams();
  });

  it('renders "All" and genre buttons, with "All" active initially', () => {
    render(<GenreFilters genres={mockGenres} />);

    const allButton = screen.getByRole('button', { name: /^all$/i });
    const actionButton = screen.getByRole('button', { name: /action/i });
    const comedyButton = screen.getByRole('button', { name: /comedy/i });

    expect(allButton).toBeInTheDocument();
    expect(allButton).toHaveClass('genres__chip--active');

    expect(actionButton).toBeInTheDocument();
    expect(actionButton).not.toHaveClass('genres__chip--active');

    expect(comedyButton).toBeInTheDocument();
  });

  it('updates query parameters and calls router replace when a genre is selected', () => {
    render(<GenreFilters genres={mockGenres} />);

    const actionButton = screen.getByRole('button', { name: /action/i });
    fireEvent.click(actionButton);

    expect(mockReplace).toHaveBeenCalledWith('/movies?genre=28');
  });

  it('highlights the active genre based on search params', () => {
    mockSearchParams = new URLSearchParams('genre=35');

    render(<GenreFilters genres={mockGenres} />);

    const comedyButton = screen.getByRole('button', { name: /comedy/i });
    const allButton = screen.getByRole('button', { name: /^all$/i });

    expect(comedyButton).toHaveClass('genres__chip--active');
    expect(allButton).not.toHaveClass('genres__chip--active');
  });

  it('resets query params when clicking "All"', () => {
    mockSearchParams = new URLSearchParams('genre=28&page=2');

    render(<GenreFilters genres={mockGenres} />);

    const allButton = screen.getByRole('button', { name: /^all$/i });
    fireEvent.click(allButton);

    expect(mockReplace).toHaveBeenCalledWith('/movies?');
  });
});
