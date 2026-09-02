'use client';

import { Movie } from '@/types/movie';
import { useWatchlist } from '@/context/WatchlistContext';
import styles from './MovieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const saved = isInWatchlist(movie.id);

  // Fallbacks for TMDB snake_case payload properties
  const posterPath = movie.posterPath || movie.poster_path;
  const releaseDate = movie.releaseDate || movie.release_date;
  const voteAverage = movie.voteAverage ?? movie.vote_average;

  const posterUrl = posterPath
    ? `https://image.tmdb.org/t/p/w500${posterPath}`
    : '/placeholder-poster.png';

  return (
    <article className={styles.card}>
      <div className={styles['card__poster-wrapper']}>
        <img
          src={posterUrl}
          alt={movie.title}
          className={styles['card__poster']}
          loading="lazy"
        />
        <button
          type="button"
          onClick={() => toggleWatchlist(movie)}
          className={`${styles['card__bookmark']} ${
            saved ? styles['card__bookmark--active'] : ''
          }`}
          aria-label={saved ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>

      <div className={styles['card__content']}>
        <h3 className={styles['card__title']}>{movie.title}</h3>
        <div className={styles['card__meta']}>
          {releaseDate && <span>{releaseDate.split('-')[0]}</span>}
          {voteAverage !== undefined && (
            <span>⭐ {voteAverage.toFixed(1)}</span>
          )}
        </div>
      </div>
    </article>
  );
}
