import Header from './components/Header/Header';
import { WatchlistProvider } from '@/context/WatchlistContext';
import AiAssistant from '@/app/components/AiAssistant/AiAssistant';
import './styles/globals.scss';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://movies.stevetidy.com'),
  title: {
    default: 'Movie Portfolio | Steve Tidy',
    template: '%s | Movie Portfolio',
  },
  description: 'A responsive movie discovery and watchlist application built with Next.js and TMDB.',
  openGraph: {
    title: 'Movie Portfolio | Steve Tidy',
    description: 'Explore movies, check details, and curate your personal watchlist.',
    url: 'https://movies.stevetidy.com',
    siteName: 'Movie Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movie Portfolio | Steve Tidy',
    description: 'Explore movies, check details, and curate your personal watchlist.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WatchlistProvider>
          <Header />
          {children}
          <AiAssistant />
        </WatchlistProvider>
      </body>
    </html>
  );
}
