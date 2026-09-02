import { Movie } from '@/types/movie';
import MovieCard from './components/MovieCard/MovieCard';
import GenreFilters from './components/GenreFilters/GenreFilters';
import Pagination from './components/Pagination/Pagination';
import styles from './page.module.scss';

interface HomeProps {
  searchParams: Promise<{ genre?: string; page?: string }>;
}

interface FetchMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

async function getMovies(genreId?: string, page: number = 1): Promise<FetchMoviesResponse> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  const endpoint = genreId
    ? `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
    : `${baseUrl}/trending/movie/day?api_key=${apiKey}&page=${page}`;

  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  
  if (!res.ok) {
    return { results: [], page: 1, total_pages: 0 };
  }

  return res.json();
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { genre, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { results: movies, total_pages } = await getMovies(genre, currentPage);

  return (
    <main className={styles['home']}>
      <div className={styles['home__header']}>
        <h1 className={styles['home__title']}>
          {genre ? 'Filtered Movies' : 'Trending Movies'}
        </h1>
        <GenreFilters />
      </div>

      <div className={styles['home__grid']}>
        {movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className={styles['home__empty']}>No movies found.</p>
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={total_pages} />
    </main>
  );
}
