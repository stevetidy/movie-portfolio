import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';

interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  tagline: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. Fetcher helper function
async function getMovie(id: string): Promise<MovieDetail | null> {
  const apiKey = process.env.TMDB_API_KEY;
  const baseUrl = process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3';

  const res = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}

// 2. Dynamic Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
    : '/fallback-og.jpg';

  return {
    title: `${movie.title} (${movie.release_date?.slice(0, 4) || 'N/A'}) - MovieApp`,
    description: movie.overview || movie.tagline || 'Explore movie details on MovieApp.',
    openGraph: {
      title: movie.title,
      description: movie.overview,
      type: 'video.movie',
      images: [
        {
          url: posterUrl,
          width: 1280,
          height: 720,
          alt: `${movie.title} Poster`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: movie.title,
      description: movie.overview,
      images: [posterUrl],
    },
  };
}

// 3. Main Page Component
export default async function MovieDetailPage({ params }: PageProps) {
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
              className={styles['movie-detail__poster']}
            />
          ) : (
            <div className={styles['movie-detail__placeholder']}>No Image</div>
          )}
        </div>

        <div className={styles['movie-detail__content']}>
          <h1 className={styles['movie-detail__title']}>{movie.title}</h1>
          {movie.tagline && (
            <p className={styles['movie-detail__tagline']}>"{movie.tagline}"</p>
          )}
          <div className={styles['movie-detail__meta']}>
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>★ {movie.vote_average.toFixed(1)}</span>
          </div>
          <p className={styles['movie-detail__overview']}>{movie.overview}</p>
        </div>
      </div>
    </main>
  );
}
