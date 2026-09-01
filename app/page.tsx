import MovieCard, { Movie } from './components/MovieCard/MovieCard';
import styles from './page.module.scss';

async function getTrendingMovies(): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  const res = await fetch(`${baseUrl}/trending/movie/day?api_key=${apiKey}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.results;
}

export default async function HomePage() {
  const movies = await getTrendingMovies();

  return (
    <main className={styles['home']}>
      <h1 className={styles['home__title']}>Trending Movies</h1>
      <div className={styles['home__grid']}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
