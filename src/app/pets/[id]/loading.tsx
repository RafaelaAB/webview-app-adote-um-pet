import Skeleton from '@/components/Skeleton/Skeleton'
import styles from './pet-detail-loading.module.css'

export default function PetDetailLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando detalhes do pet">
      <div className="container">

        <Skeleton width={80} height={34} radius="md" className={styles.backBtn} />

        <div className={styles.detail}>

          <Skeleton width="100%" height={480} radius="xl" />

          <div className={styles.info}>

            <div className={styles.badges}>
              <Skeleton width={90}  height={28} radius="full" />
              <Skeleton width={100} height={28} radius="full" />
            </div>

            <Skeleton width="55%" height={48} radius="md" />

            <Skeleton width="40%" height={20} radius="sm" />

            <div className={styles.textBlock}>
              <Skeleton width="100%" height={16} radius="sm" />
              <Skeleton width="100%" height={16} radius="sm" />
              <Skeleton width="75%"  height={16} radius="sm" />
            </div>

            <div className={styles.attributesGrid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={styles.attribute}>
                  <Skeleton width="50%" height={14} radius="sm" />
                  <Skeleton width="70%" height={20} radius="sm" />
                </div>
              ))}
            </div>

            <div className={styles.healthRow}>
              <Skeleton width={120} height={32} radius="md" />
              <Skeleton width={120} height={32} radius="md" />
            </div>

            <Skeleton width="100%" height={52} radius="full" />
          </div>

        </div>
      </div>
    </div>
  )
}
