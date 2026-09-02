import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchMovieDetails } from '@/lib/tmdb';
import WatchlistButton from '@/app/components/WatchlistButton/WatchlistButton';
import styles from './page.module.scss';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const movie = await fetchMovieDetails(id);
    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : undefined;

    return {
      title: movie.title,
      description: movie.overview || 'Explore movie details on Movie Portfolio.',
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: posterUrl ? [{ url: posterUrl }] : [],
      },
    };
  } catch {
    return {
      title: 'Movie Details',
      description: 'View movie information and ratings.',
    };
  }
}

export default async function MovieDetailsPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const movie = await fetchMovieDetails(id);

    const backdropUrl = movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
      : null;

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '/placeholder-poster.png';

    return (
      <article className={styles.details}>
        {backdropUrl && (
          <div className={styles['details__backdrop-wrapper']}>
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              priority
              className={styles['details__backdrop']}
            />
            <div className={styles['details__overlay']} />
          </div>
        )}

        <div className={styles['details__container']}>
          <div className={styles['details__card']}>
            <div className={styles['details__poster-wrapper']}>
              <img
                src={posterUrl}
                alt={movie.title}
                className={styles['details__poster']}
              />
            </div>

            <div className={styles['details__content']}>
              <h1 className={styles['details__title']}>{movie.title}</h1>
              {movie.tagline && (
                <p className={styles['details__tagline']}>"{movie.tagline}"</p>
              )}

              <div className={styles['details__meta']}>
                <span>⭐ {(movie.vote_average ?? 0).toFixed(1)}</span>
                <span>{movie.runtime} min</span>
                <span>{movie.release_date?.split('-')[0]}</span>
              </div>

              <WatchlistButton movie={movie} />

              <div className={styles['details__genres']}>
                {movie.genres.map((genre) => (
                  <span key={genre.id} className={styles['details__genre-tag']}>
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className={styles['details__overview']}>{movie.overview}</p>
            </div>
          </div>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
