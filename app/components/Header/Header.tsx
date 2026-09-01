'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useWatchlist } from '@/context/WatchlistContext';
import styles from './Header.module.scss';

export default function Header() {
  const { watchlist, isHydrated } = useWatchlist();
  const pathname = usePathname();
  const [animateBadge, setAnimateBadge] = useState(false);

  const count = isHydrated ? watchlist.length : 0;

  // Trigger scale pop animation when watchlist count increases
  useEffect(() => {
    if (count === 0) return;
    setAnimateBadge(true);
    const timeout = setTimeout(() => setAnimateBadge(false), 200);
    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <header className={styles.header}>
      <div className={styles['header__container']}>
        <Link href="/" className={styles['header__logo']}>
          🎬 <span>CineStream</span>
        </Link>

        <nav className={styles['header__nav']}>
          <Link
            href="/"
            className={`${styles['header__link']} ${
              pathname === '/' ? styles['header__link--active'] : ''
            }`}
          >
            Explore
          </Link>

          <Link
            href="/watchlist"
            className={`${styles['header__link']} ${
              pathname === '/watchlist' ? styles['header__link--active'] : ''
            }`}
          >
            <span>Watchlist</span>
            <span
              className={`${styles['header__badge']} ${
                animateBadge ? styles['header__badge--pop'] : ''
              }`}
              aria-label={`${count} items in watchlist`}
            >
              {count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
