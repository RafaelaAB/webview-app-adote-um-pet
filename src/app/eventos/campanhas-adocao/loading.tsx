/**
 * LOADING STATE — Campanhas de Adoção (/eventos/campanhas-adocao)
 */

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

/** Skeleton compartilhado para as páginas de eventos */
export function EventoPageSkeleton() {
  return (
    <>
      {/* Ícone */}
      <div className={styles.iconWrapper}>
        <Skeleton width={72} height={72} radius="xl" />
      </div>

      {/* Título */}
      <Skeleton width="50%" height={44} radius="md" className={styles.title} />

      {/* Subtítulo (2 linhas) */}
      <div className={styles.subtitle}>
        <Skeleton width="80%" height={18} radius="sm" />
        <Skeleton width="65%" height={18} radius="sm" />
      </div>

      {/* Card de conteúdo */}
      <div className={styles.card}>
        <Skeleton width="90%" height={18} radius="sm" />
        <Skeleton width="70%" height={18} radius="sm" />
        <Skeleton width={200} height={48} radius="full" className={styles.cta} />
      </div>
    </>
  )
}
