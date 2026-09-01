// app/loading.tsx
import styles from './loading.module.scss';

export default function HomeLoading() {
  return (
    <main className={styles['home-skeleton']}>
      <div className={styles['home-skeleton__title']} />
      <div className={styles['home-skeleton__grid']}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={styles['home-skeleton__card']}>
            <div className={styles['home-skeleton__poster']} />
            <div className={styles['home-skeleton__text']} />
            <div
              className={`${styles['home-skeleton__text']} ${styles['home-skeleton__text--short']}`}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
