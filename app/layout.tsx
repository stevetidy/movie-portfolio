import Header from './components/Header/Header';
import './globals.scss';

export const metadata = {
  title: 'Movie DB App',
  description: 'Explore movies powered by TMDB and Next.js',
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
