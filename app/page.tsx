import MovieCard, { Movie } from './components/MovieCard/MovieCard';
import styles from './page.module.scss';

async function getTrendingMovies(): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL;

  const isBearer = apiKey?.length && apiKey.length > 50;
  const url = isBearer
    ? `${baseUrl}/trending/movie/day`
    : `${baseUrl}/trending/movie/day?api_key=${apiKey}`;

  const res = await fetch(url, {
    headers: isBearer ? { Authorization: `Bearer ${apiKey}` } : {},
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movies from TMDB');
  }

  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const movies = await getTrendingMovies();

  return (
    <main className={styles['movie-hub']}>
      <header className={styles['movie-hub__header']}>
        <h1 className={styles['movie-hub__title']}>Movie Portfolio</h1>
        <p className={styles['movie-hub__subtitle']}>
          Trending titles fetched directly from TMDB
        </p>
      </header>

      <section className={styles['movie-grid']}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
}
