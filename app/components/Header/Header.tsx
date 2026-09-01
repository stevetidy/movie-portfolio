import Link from 'next/link';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles['header']}>
      <div className={styles['header__container']}>
        <Link href="/" className={styles['header__logo']}>
          MovieApp
        </Link>
        <div className={styles['header__search']}>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
