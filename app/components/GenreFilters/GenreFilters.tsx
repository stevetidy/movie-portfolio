'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './GenreFilters.module.scss';

interface Genre {
  id: number;
  name: string;
}

export default function GenreFilters() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedGenre = searchParams.get('genre');

  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch('/api/genres');
        if (res.ok) {
          const data = await res.json();
          setGenres(data.genres || []);
        }
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    }
    fetchGenres();
  }, []);

  const handleSelectGenre = (genreId: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (genreId) {
      params.set('genre', genreId.toString());
    } else {
      params.delete('genre');
    }
    router.push(`/?${params.toString()}`);
  };

  if (genres.length === 0) return null;

  return (
    <div className={styles['genre-filters']}>
      <button
        type="button"
        className={`${styles['genre-filters__pill']} ${
          !selectedGenre ? styles['genre-filters__pill--active'] : ''
        }`}
        onClick={() => handleSelectGenre(null)}
      >
        All
      </button>

      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className={`${styles['genre-filters__pill']} ${
            selectedGenre === genre.id.toString() ? styles['genre-filters__pill--active'] : ''
          }`}
          onClick={() => handleSelectGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
