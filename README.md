# CineStream Movie Portfolio

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
- SCSS Modules for component-scoped styling
- TMDB API integration with cached server-side requests
- Google Gemini integration through the Vercel AI SDK
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
```

## Getting Started

### Prerequisites

- Node.js 20 or later
- A [TMDB API key](https://developer.themoviedb.org/docs/getting-started)
- A Google AI API key for the Film Concierge

### Installation

```bash
npm install
```

Create a `.env.local` file in the project root:

```env
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_key
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run the Jest test suite |
| `npm run test:watch` | Run Jest in watch mode |

## External Services

- [The Movie Database API](https://www.themoviedb.org/)
- [Google Gemini](https://ai.google.dev/) via the [Vercel AI SDK](https://ai-sdk.dev/)

Movie data and images are provided by TMDB. Watchlist data is stored locally in the browser and is not synced to a user account or external database.

## Deployment

The application can be deployed to [Vercel](https://vercel.com/) or another platform that supports Next.js.

Configure the environment variables listed above in the deployment provider before building the application.

To test the production build locally:

```bash
npm run build
npm run start
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)
- [TMDB API Documentation](https://developer.themoviedb.org/docs)
- [Vercel AI SDK Documentation](https://ai-sdk.dev/)
