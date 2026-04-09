import Skeleton from '@/components/Skeleton/Skeleton'
import styles from './cadastrar-loading.module.css'

export default function CadastrarLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando formulário de cadastro">
      <div className="container">

        <Skeleton width={80} height={34} radius="md" className={styles.backBtn} />

        <div className={styles.header}>
          <Skeleton width="40%" height={44} radius="md" />
          <Skeleton width="60%" height={18} radius="sm" />
        </div>

        <div className={styles.form}>

          <div className={styles.row}>
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          <div className={styles.row}>
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          <div className={styles.rowThree}>
            <FieldSkeleton />
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          <div className={styles.fullWidth}>
            <Skeleton width="25%" height={14} radius="sm" className={styles.label} />
            <Skeleton width="100%" height={100} radius="md" />
          </div>

          <div className={styles.row}>
            <FieldSkeleton />
            <FieldSkeleton />
          </div>

          <div className={styles.submitRow}>
            <Skeleton width={200} height={52} radius="full" />
          </div>

        </div>
      </div>
    </div>
  )
}

function FieldSkeleton() {
  return (
    <div className={styles.field}>
      <Skeleton width="40%" height={14} radius="sm" className={styles.label} />
      <Skeleton width="100%" height={44} radius="md" />
    </div>
  )
}
