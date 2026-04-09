import Skeleton from '@/components/Skeleton/Skeleton'
import styles from './eventos-loading.module.css'

export default function CampanhasAdocaoLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando campanhas de adoção">
      <div className={`container ${styles.inner}`}>
        <Skeleton width={80} height={34} radius="md" className={styles.backBtn} />
        <EventoPageSkeleton />
      </div>
    </div>
  )
}

export function EventoPageSkeleton() {
  return (
    <>

      <div className={styles.iconWrapper}>
        <Skeleton width={72} height={72} radius="xl" />
      </div>

      <Skeleton width="50%" height={44} radius="md" className={styles.title} />

      <div className={styles.subtitle}>
        <Skeleton width="80%" height={18} radius="sm" />
        <Skeleton width="65%" height={18} radius="sm" />
      </div>

      <div className={styles.card}>
        <Skeleton width="90%" height={18} radius="sm" />
        <Skeleton width="70%" height={18} radius="sm" />
        <Skeleton width={200} height={48} radius="full" className={styles.cta} />
      </div>
    </>
  )
}
