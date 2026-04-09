import Skeleton from '@/components/Skeleton/Skeleton'
import { EventoPageSkeleton } from '../campanhas-adocao/loading'
import styles from '../campanhas-adocao/eventos-loading.module.css'

export default function CampanhasVacinacaoLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando campanhas de vacinação">
      <div className={`container ${styles.inner}`}>
        <Skeleton width={80} height={34} radius="md" className={styles.backBtn} />
        <EventoPageSkeleton />
      </div>
    </div>
  )
}
