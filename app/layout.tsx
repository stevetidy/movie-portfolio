import Header from './components/Header/Header';
import { WatchlistProvider } from '@/context/WatchlistContext';
import './styles/globals.scss';

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
        </WatchlistProvider>
      </body>
    </html>
  );
}
