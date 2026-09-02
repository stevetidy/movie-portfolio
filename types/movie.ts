export interface Movie {
  id: number;
  title: string;
  posterPath?: string;
  poster_path?: string; // TMDB raw payload key
  releaseDate?: string;
  release_date?: string; // TMDB raw payload key
  voteAverage?: number;
  vote_average?: number; // TMDB raw payload key
  overview?: string;
}
