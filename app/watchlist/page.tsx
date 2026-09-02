'use client';

import Link from 'next/link';
import { useWatchlist } from '@/context/WatchlistContext';
import MovieCard from '@/app/components/MovieCard/MovieCard';
import styles from './watchlist.module.scss';

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <main className={styles.watchlist}>
      <header className={styles['watchlist__header']}>
        <h1 className={styles['watchlist__title']}>My Watchlist</h1>
        <p className={styles['watchlist__count']}>
          {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} saved
        </p>
      </header>

      {watchlist.length === 0 ? (
        <div className={styles['watchlist__empty']}>
          <h2>Your watchlist is empty</h2>
          <p>Explore popular movies and click the heart icon to save them here.</p>
          <Link href="/" className={styles['watchlist__explore-btn']}>
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className={styles['watchlist__grid']}>
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}
