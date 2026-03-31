/**
 * LOADING STATE — Home page (/)
 *
 * O Next.js App Router exibe este componente automaticamente enquanto
 * o bundle da página está sendo carregado (via React Suspense).
 *
 * O layout imita a estrutura real da HomePage:
 *   - Hero: título + texto + botões
 *   - Grid: 4 cards de pets em destaque
 */

import Skeleton from '@/components/Skeleton/Skeleton'
import styles from './loading.module.css'

export default function HomeLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-label="Carregando página inicial">

      {/* ── Skeleton: seção Hero ── */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroInner}`}>

          {/* Badge */}
          <Skeleton width={160} height={32} radius="full" />

          {/* Título (2 linhas) */}
          <div className={styles.titleBlock}>
            <Skeleton width="70%" height={52} radius="md" />
            <Skeleton width="50%" height={52} radius="md" />
          </div>

          {/* Texto descritivo (3 linhas) */}
          <div className={styles.textBlock}>
            <Skeleton width="100%" height={18} radius="sm" />
            <Skeleton width="95%"  height={18} radius="sm" />
            <Skeleton width="80%"  height={18} radius="sm" />
          </div>

          {/* Botões de CTA */}
          <div className={styles.ctaBlock}>
            <Skeleton width={160} height={48} radius="full" />
            <Skeleton width={160} height={48} radius="full" />
          </div>
        </div>
      </section>

      {/* ── Skeleton: grid de pets em destaque ── */}
      <section className={styles.petsSection}>
        <div className="container">

          {/* Título da seção */}
          <div className={styles.sectionHeader}>
            <Skeleton width="45%" height={36} radius="md" />
            <Skeleton width="60%" height={18} radius="sm" />
          </div>

          {/* Grid: 4 cards */}
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
