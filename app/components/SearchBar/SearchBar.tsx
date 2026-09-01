'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SearchBar.module.scss';

interface SearchResult {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        // Fetch via your secure internal Next.js API Route Handler
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        
        if (res.ok) {
          const data = await res.json();
          setResults(data.results?.slice(0, 5) || []);
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Failed to search movies:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={styles['search-bar']}>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => query.trim() && setIsOpen(true)}
        className={styles['search-bar__input']}
      />

      {isOpen && (
        <div className={styles['search-bar__dropdown']}>
          {isLoading ? (
            <div className={styles['search-bar__status']}>Searching...</div>
          ) : results.length > 0 ? (
            results.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.id}`}
                onClick={() => setIsOpen(false)}
                className={styles['search-bar__item']}
              >
                <div className={styles['search-bar__poster']}>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      sizes="40px"
                    />
                  ) : (
                    <div className={styles['search-bar__no-img']}>N/A</div>
                  )}
                </div>
                <div className={styles['search-bar__info']}>
                  <p className={styles['search-bar__title']}>{movie.title}</p>
                  <span className={styles['search-bar__year']}>
                    {movie.release_date?.slice(0, 4) || 'N/A'}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className={styles['search-bar__status']}>No movies found</div>
          )}
        </div>
      )}
    </div>
  );
}
