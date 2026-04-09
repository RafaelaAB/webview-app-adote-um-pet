import Skeleton from './Skeleton'
import styles from './evento-page-skeleton.module.css'

export default function EventoPageSkeleton() {
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
