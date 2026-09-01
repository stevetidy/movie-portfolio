import styles from './loading.module.scss';

export default function MovieDetailLoading() {
  return (
    <main className={styles['detail-skeleton']}>
      <div className={styles['detail-skeleton__hero']}>
        <div className={styles['detail-skeleton__poster']} />
        <div className={styles['detail-skeleton__content']}>
          <div className={styles['detail-skeleton__title']} />
          <div className={styles['detail-skeleton__meta']} />
          <div className={styles['detail-skeleton__line']} />
          <div className={styles['detail-skeleton__line']} />
          <div
            className={`${styles['detail-skeleton__line']} ${styles['detail-skeleton__line--short']}`}
          />
        </div>
      </div>
    </main>
  );
}
