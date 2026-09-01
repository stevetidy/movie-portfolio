'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Movie } from '@/types/movie';

const STORAGE_KEY = 'movie_portfolio_watchlist';

interface WatchlistContextType {
  watchlist: Movie[];
  isHydrated: boolean;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  toggleWatchlist: (movie: Movie) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // 1. Initial Load from localStorage after client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setWatchlist(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to parse watchlist from localStorage:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Cross-tab synchronization via window 'storage' event listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const updated = e.newValue ? JSON.parse(e.newValue) : [];
          setWatchlist(updated);
        } catch (error) {
          console.error('Failed to sync watchlist across tabs:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Helper to persist state to localStorage
  const saveToStorage = (updatedList: Movie[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error('Failed to write watchlist to localStorage:', error);
    }
  };

  const addToWatchlist = useCallback((movie: Movie) => {
    setWatchlist((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      const next = [...prev, movie];
      saveToStorage(next);
      return next;
    });
  }, []);

  const removeFromWatchlist = useCallback((movieId: number) => {
    setWatchlist((prev) => {
      const next = prev.filter((m) => m.id !== movieId);
      saveToStorage(next);
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (movieId: number) => watchlist.some((m) => m.id === movieId),
    [watchlist]
  );

  const toggleWatchlist = useCallback(
    (movie: Movie) => {
      if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
      } else {
        addToWatchlist(movie);
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  );

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        isHydrated,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
        toggleWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

// Custom hook to consume the Watchlist context safely
export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
}
