import { Metadata } from 'next';
import Header from './components/Header/Header';
import './styles/globals.scss';

export const metadata: Metadata = {
  metadataBase: new URL('https://movies.stevetidy.com'),
  title: {
    default: 'MovieApp - Discover Trending Movies',
    template: '%s | MovieApp',
  },
  description: 'Explore movies powered by TMDB and Next.js App Router',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
