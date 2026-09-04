import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WatchlistButton from '@/app/components/WatchlistButton/WatchlistButton';
import { WatchlistProvider } from '@/context/WatchlistContext';

const mockMovie = {
  id: 1288445,
  title: 'Mutiny',
  poster_path: '/pu2VxGlpGwffOx292w18b1tv96j.jpg',
  vote_average: 7.5,
  release_date: '2026-01-01',
};

describe('WatchlistButton Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('renders add to watchlist state initially', () => {
    render(
      <WatchlistProvider>
        <WatchlistButton movie={mockMovie} />
      </WatchlistProvider>
    );
    
    const button = screen.getByRole('button', { name: /add to watchlist/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles aria-label and updates localStorage when clicked', () => {
    render(
      <WatchlistProvider>
        <WatchlistButton movie={mockMovie} />
      </WatchlistProvider>
    );
    
    const button = screen.getByRole('button', { name: /add to watchlist/i });
    
    fireEvent.click(button);

    // Adjust "/remove from watchlist/i" if your remove text is slightly different
    expect(screen.getByRole('button', { name: /remove from watchlist/i })).toBeInTheDocument();

    const storedWatchlist = JSON.parse(localStorage.getItem('movie_portfolio_watchlist') || '[]');
    expect(storedWatchlist).toHaveLength(1);
    expect(storedWatchlist[0].id).toBe(mockMovie.id);
  });

  it('removes the movie from localStorage when clicked a second time', () => {
    render(
      <WatchlistProvider>
        <WatchlistButton movie={mockMovie} />
      </WatchlistProvider>
    );
    
    const button = screen.getByRole('button', { name: /add to watchlist/i });
    
    fireEvent.click(button);
    expect(JSON.parse(localStorage.getItem('movie_portfolio_watchlist') || '[]')).toHaveLength(1);

    const removeButton = screen.getByRole('button', { name: /remove from watchlist/i });
    fireEvent.click(removeButton);

    expect(screen.getByRole('button', { name: /add to watchlist/i })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('movie_portfolio_watchlist') || '[]')).toHaveLength(0);
  });
});
