/**
 * COMPONENTE: EventoPageSkeleton
 *
 * Skeleton compartilhado pelas páginas de eventos (campanhas de adoção e vacinação).
 * Extraído para componente próprio para evitar importações cruzadas entre
 * arquivos loading.tsx, que causam erro de módulo no webpack.
 */

import Skeleton from './Skeleton'
import styles from './evento-page-skeleton.module.css'

export default function EventoPageSkeleton() {
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
