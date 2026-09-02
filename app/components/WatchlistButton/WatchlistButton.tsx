'use client';

import { useWatchlist } from '@/context/WatchlistContext';
import { Movie } from '@/types/movie';
import styles from './WatchlistButton.module.scss';

interface WatchlistButtonProps {
  movie: Movie;
}

export default function WatchlistButton({ movie }: WatchlistButtonProps) {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const active = isInWatchlist(movie.id);

  const handleClick = () => {
    if (active) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <button
      type="button"
      className={`${styles['watchlist-btn']} ${
        active ? styles['watchlist-btn--active'] : ''
      }`}
      onClick={handleClick}
      aria-label={active ? 'Remove from Watchlist' : 'Add to Watchlist'}
    >
      <svg
        className={styles['watchlist-btn__icon']}
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span>{active ? 'In Watchlist' : 'Add to Watchlist'}</span>
    </button>
  );
}
