import { Suspense } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import GenreFilters from './components/GenreFilters/GenreFilters';
import MovieCard from './components/MovieCard/MovieCard';
import Pagination from './components/Pagination/Pagination';
import { fetchGenres, fetchMovies } from '@/lib/tmdb';
import styles from './page.module.scss';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    genre?: string;
    page?: string;
  }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { q, genre, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [genres, { movies, totalPages }] = await Promise.all([
    fetchGenres(),
    fetchMovies(q, genre, currentPage),
  ]);

  return (
    <main className={styles.home}>
      <div className={styles['home__filters']}>
        <Suspense fallback={<div className={styles['home__loading']}>Loading search...</div>}>
          <SearchBar />
          <GenreFilters genres={genres} />
        </Suspense>
      </div>

      <section className={styles['home__content']}>
        {movies.length === 0 ? (
          <div className={styles['home__empty']}>
            <h2>No movies found</h2>
            <p>Try adjusting your search term or selected genre filter.</p>
          </div>
        ) : (
          <>
            <div className={styles['home__grid']}>
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className={styles['home__pagination']}>
                <Suspense fallback={null}>
                  <Pagination currentPage={currentPage} totalPages={totalPages} />
                </Suspense>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
