import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  runtime: number;
}

async function getMovie(id: string): Promise<MovieDetail | null> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  if (!apiKey) {
    console.error('TMDB_API_KEY is missing from environment variables.');
    return null;
  }

  const res = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}

// ⚠️ THIS LINE IS REQUIRED: MUST BE "export default async function"
export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    notFound();
  }

  return (
    <main className={styles['movie-detail']}>
      <div className={styles['movie-detail__hero']}>
        <div className={styles['movie-detail__media']}>
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 300px"
              className={styles['movie-detail__poster']}
            />
          ) : (
            <div className={styles['movie-detail__placeholder']}>
              No Image Available
            </div>
          )}
        </div>

        <div className={styles['movie-detail__content']}>
          <h1 className={styles['movie-detail__title']}>{movie.title}</h1>
          {movie.tagline && (
            <p className={styles['movie-detail__tagline']}>"{movie.tagline}"</p>
          )}

          <div className={styles['movie-detail__meta']}>
            <span>★ {movie.vote_average.toFixed(1)}</span>
            <span>•</span>
            <span>{movie.runtime} min</span>
            <span>•</span>
            <span>{movie.release_date?.slice(0, 4)}</span>
          </div>

          <p className={styles['movie-detail__overview']}>{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}
