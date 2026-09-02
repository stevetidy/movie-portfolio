'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import styles from './GenreFilters.module.scss';

export interface Genre {
  id: number;
  name: string;
}

interface GenreFiltersProps {
  genres: Genre[];
}

export default function GenreFilters({ genres }: GenreFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [, startTransition] = useTransition();

  const selectedGenre = searchParams.get('genre') ?? '';

  const handleSelectGenre = (genreId: string) => {
    const params = new URLSearchParams(searchParams);

    if (genreId && genreId !== selectedGenre) {
      params.set('genre', genreId);
    } else {
      params.delete('genre');
    }

    params.delete('page');

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className={styles.genres}>
      <button
        type="button"
        className={`${styles['genres__chip']} ${
          !selectedGenre ? styles['genres__chip--active'] : ''
        }`}
        onClick={() => handleSelectGenre('')}
      >
        All
      </button>
      {genres?.map((genre) => {
        const idStr = genre.id.toString();
        const isActive = selectedGenre === idStr;

        return (
          <button
            key={genre.id}
            type="button"
            className={`${styles['genres__chip']} ${
              isActive ? styles['genres__chip--active'] : ''
            }`}
            onClick={() => handleSelectGenre(idStr)}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
}
