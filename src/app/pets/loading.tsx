import Skeleton from '@/components/Skeleton/Skeleton'
import styles from './pets-loading.module.css'

export default function PetsLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando pets">
      <div className="container">

        <Skeleton width={80} height={34} radius="md" className={styles.backBtn} />

        <div className={styles.header}>
          <Skeleton width="35%" height={44} radius="md" />
          <Skeleton width="55%" height={18} radius="sm" />
        </div>

        <div className={styles.filters}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} width={110} height={36} radius="full" />
          ))}
        </div>

        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, i) => (
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
    </div>
  )
}
