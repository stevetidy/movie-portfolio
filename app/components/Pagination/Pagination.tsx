'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Cap visible total pages to avoid excessive pages from TMDB
  const maxPages = Math.min(totalPages, 500);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > maxPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    router.push(`/?${params.toString()}`);
  };

  if (maxPages <= 1) return null;

  return (
    <nav className={styles['pagination']} aria-label="Pagination Navigation">
      <button
        type="button"
        className={styles['pagination__button']}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>

      <span className={styles['pagination__info']}>
        Page {currentPage} of {maxPages}
      </span>

      <button
        type="button"
        className={styles['pagination__button']}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= maxPages}
      >
        Next
      </button>
    </nav>
  );
}
