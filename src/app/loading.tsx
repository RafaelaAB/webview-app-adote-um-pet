import Skeleton from '@/components/Skeleton/Skeleton'
import styles from './loading.module.css'

export default function HomeLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando página inicial">

      <section className={styles.heroSection}>
        <div className={`container ${styles.heroInner}`}>

          <Skeleton width={160} height={32} radius="full" />

          <div className={styles.titleBlock}>
            <Skeleton width="70%" height={52} radius="md" />
            <Skeleton width="50%" height={52} radius="md" />
          </div>

          <div className={styles.textBlock}>
            <Skeleton width="100%" height={18} radius="sm" />
            <Skeleton width="95%"  height={18} radius="sm" />
            <Skeleton width="80%"  height={18} radius="sm" />
          </div>

          <div className={styles.ctaBlock}>
            <Skeleton width={160} height={48} radius="full" />
            <Skeleton width={160} height={48} radius="full" />
          </div>
        </div>
      </section>

      <section className={styles.petsSection}>
        <div className="container">

          <div className={styles.sectionHeader}>
            <Skeleton width="45%" height={36} radius="md" />
            <Skeleton width="60%" height={18} radius="sm" />
          </div>

          <div className={styles.grid}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={styles.card}>
                <Skeleton width="100%" height={200} radius="lg" />
                <div className={styles.cardBody}>
                  <Skeleton width="70%" height={20} radius="sm" />
                  <Skeleton width="50%" height={16} radius="sm" />
                  <Skeleton width="40%" height={16} radius="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
