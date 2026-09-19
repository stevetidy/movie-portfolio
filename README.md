# CineStream Movie Portfolio

> **Live Demo:** [movies.stevetidy.com](https://movies.stevetidy.com)

CineStream is a responsive movie discovery application built with Next.js, React, TypeScript, and the [TMDB API](https://www.themoviedb.org/).

This portfolio project demonstrates server-rendered data fetching, client-side state management, API integrations, responsive UI, accessibility-minded interactions, and an AI-powered movie recommendation experience.

## Features

- Browse popular movies from TMDB
- Search movies with debounced autocomplete suggestions
- Filter movies by genre
- Paginate through movie results
- View detailed movie pages with:
  - Poster and backdrop artwork
  - Overview and tagline
  - Release year
  - Runtime
  - Genres
  - TMDB rating
- Add and remove movies from a personal watchlist
- Persist watchlist data in `localStorage`
- Synchronize watchlist changes across browser tabs
- Display the current watchlist count in the navigation
- Ask the AI Film Concierge for movie recommendations
- Stream AI responses and render Markdown formatting
- Display loading skeletons for movie grids and detail pages
- Generate dynamic page metadata and Open Graph previews
- Provide accessible labels and navigation semantics

## Technical Highlights

- Next.js App Router
- Server-rendered movie data
- TypeScript
- React Context for shared watchlist state
- SCSS Modules for component-scoped styling (kebab-case convention)
- TMDB API integration with cached server-side requests
- Google Gemini (`gemini-3.8-flash`) integration through the Vercel AI SDK
- URL-driven search, genre filtering, and pagination
- Jest and React Testing Library tests for core components

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Movie discovery, search, filtering, and pagination |
| `/movie/[id]` | Movie details |
| `/watchlist` | Saved movies |

## API Routes

| Route | Description |
| --- | --- |
| `/api/search` | Search movies through TMDB |
| `/api/genres` | Retrieve available movie genres |
| `/api/chat` | Stream AI Film Concierge responses |

## Project Structure

```text
app/
  api/             API route handlers
  components/      Reusable UI components
  movie/[id]/      Movie detail route
  watchlist/       Watchlist route
  page.tsx         Movie discovery route
context/           Shared watchlist state
lib/               TMDB data access helpers
types/             Shared TypeScript models
