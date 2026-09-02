import { Movie } from '@/types/movie';
import type { Genre } from '@/app/components/GenreFilters/GenreFilters';

const BASE_URL = 'https://api.themoviedb.org/3';

interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('TMDB_API_KEY is not defined in environment variables.');
  }

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    ...params,
  });

  const res = await fetch(`${BASE_URL}${endpoint}?${queryParams.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchGenres(): Promise<Genre[]> {
  const data = await tmdbFetch<{ genres: Genre[] }>('/genre/movie/list');
  return data.genres;
}

export async function fetchMovies(
  searchQuery?: string,
  genreId?: string,
  page: number = 1
): Promise<{ movies: Movie[]; totalPages: number }> {
  let endpoint = '/movie/popular';
  const params: Record<string, string> = {
    page: page.toString(),
  };

  if (searchQuery) {
    endpoint = '/search/movie';
    params.query = searchQuery;
  } else if (genreId) {
    endpoint = '/discover/movie';
    params.with_genres = genreId;
  }

  const data = await tmdbFetch<TMDBPaginatedResponse<Movie>>(endpoint, params);

  // TMDB caps pagination at 500 pages max
  const totalPages = Math.min(data.total_pages || 1, 500);

  return {
    movies: data.results,
    totalPages,
  };
}
