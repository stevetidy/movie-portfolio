import MovieCard, { Movie } from './components/MovieCard/MovieCard';
import GenreFilters from './components/GenreFilters/GenreFilters';
import styles from './page.module.scss';

interface HomeProps {
  searchParams: Promise<{ genre?: string }>;
}

async function getMovies(genreId?: string): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  const endpoint = genreId
    ? `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc`
    : `${baseUrl}/trending/movie/day?api_key=${apiKey}`;

  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const data = await res.json();
  return data.results;
}

export default async function HomePage({ searchParams }: HomeProps) {
  const { genre } = await searchParams;
  const movies = await getMovies(genre);

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
          <p className={styles['home__empty']}>No movies found for this genre.</p>
        )}
      </div>
    </main>
  );
}
