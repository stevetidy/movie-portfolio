import Link from 'next/link';
import Image from 'next/image';
import styles from './MovieCard.module.scss';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date?: string;
}

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { id, title, poster_path, vote_average } = movie;

  return (
    <Link href={`/movie/${id}`} className={styles['movie-card__link']}>
      <article className={styles['movie-card']}>
        <div className={styles['movie-card__media']}>
          {poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 180px"
              className={styles['movie-card__poster']}
            />
          ) : (
            <div
              className={`${styles['movie-card__poster']} ${styles['movie-card__poster--placeholder']}`}
            >
              No Image
            </div>
          )}
        </div>

        <div className={styles['movie-card__content']}>
          <h2 className={styles['movie-card__title']}>{title}</h2>
          <span className={styles['movie-card__rating']}>
            ★ {vote_average.toFixed(1)}
          </span>
        </div>
      </article>
    </Link>
  );
}
