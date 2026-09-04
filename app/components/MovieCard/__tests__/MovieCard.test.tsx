import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '@/app/components/MovieCard/MovieCard';
import { WatchlistProvider } from '@/context/WatchlistContext';

const mockMovie = {
  id: 1288445,
  title: 'Mutiny',
  poster_path: '/pu2VxGlpGwffOx292w18b1tv96j.jpg',
  vote_average: 7.5,
  release_date: '2026-01-01',
};

describe('MovieCard Component', () => {
  it('renders movie details, poster, and watchlist button correctly', () => {
    render(
      <WatchlistProvider>
        <MovieCard movie={mockMovie} />
      </WatchlistProvider>
    );

    // Verify title renders
    expect(screen.getByText('Mutiny')).toBeInTheDocument();

    // Verify poster image renders with correct alt text
    const image = screen.getByRole('img', { name: /mutiny/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('pu2VxGlpGwffOx292w18b1tv96j.jpg'));

    // Verify rating or release year renders
    expect(screen.getByText(/7.5/)).toBeInTheDocument();

    // Verify the WatchlistButton is nested inside the card with its dynamic name
    expect(screen.getByRole('button', { name: /add mutiny to watchlist/i })).toBeInTheDocument();
  });
});
