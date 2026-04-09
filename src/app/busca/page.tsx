'use client'

/**
 * PÁGINA DE RESULTADOS DE BUSCA GLOBAL
 * Rota: /busca?q=termo
 *
 * Exibe resultados agrupados por tipo: Pets, ONGs e Páginas.
 */

import { Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, PawPrint, Building2, FileText } from 'lucide-react'
import { usePetContext } from '@/context/PetContext'
import { ongs } from '@/data/ongs'
import { useGlobalSearch } from '@/hooks/useGlobalSearch'
import PetCard from '@/components/PetCard/PetCard'
import BackButton from '@/components/BackButton/BackButton'
import { ROUTES } from '@/lib/routes'
import { createLogger } from '@/lib/logger'
import styles from './busca.module.css'

const log = createLogger('BuscaPage')

function BuscaResults() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const { pets, loading } = usePetContext()
  const { petResults, ongResults, pageResults, total } = useGlobalSearch(query)

  log.info('busca global realizada', { query, total })

  const isEmpty = !loading && total === 0 && query !== ''

  return (
    <div data-testid="busca-page" className={styles.page}>
      <div className="container">

        <BackButton />

        {/* Cabeçalho */}
        <div className={styles.pageHeader}>
          <h1 data-testid="busca-title" className={styles.pageTitle}>
            Resultados para{' '}
            <span className={styles.queryHighlight}>&ldquo;{query}&rdquo;</span>
          </h1>

          {!loading && (
            <p data-testid="busca-count" className={styles.resultsCount}>
              {total === 0
                ? 'Nenhum resultado encontrado'
                : `${total} resultado${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`}
            </p>
          )}
        </div>

        {/* ── Grupo: Pets ──────────────────────────────────────────── */}
        {!loading && petResults.length > 0 && (
          <section aria-labelledby="busca-section-pets" className={styles.section}>
            <h2 id="busca-section-pets" className={styles.sectionTitle}>
              <PawPrint size={18} strokeWidth={2} aria-hidden="true" />
              Pets
              <span className={styles.sectionCount}>{petResults.length}</span>
            </h2>
            <div data-testid="busca-grid-pets" className={styles.grid}>
              {petResults.map((result) => {
                const pet = pets.find((p) => p.id === result.id)
                return pet ? <PetCard key={pet.id} pet={pet} /> : null
              })}
            </div>
          </section>
        )}

        {/* ── Grupo: ONGs ──────────────────────────────────────────── */}
        {!loading && ongResults.length > 0 && (
          <section aria-labelledby="busca-section-ongs" className={styles.section}>
            <h2 id="busca-section-ongs" className={styles.sectionTitle}>
              <Building2 size={18} strokeWidth={2} aria-hidden="true" />
              ONGs
              <span className={styles.sectionCount}>{ongResults.length}</span>
            </h2>
            <ul data-testid="busca-grid-ongs" className={styles.ongList} role="list">
              {ongResults.map((result) => {
                const ong = ongs.find((o) => o.id === result.id)
                if (!ong) return null
                return (
                  <li key={ong.id}>
                    <Link href={ROUTES.ONGS} className={styles.ongCard}>
                      <div className={styles.ongCardIcon} aria-hidden="true">
                        <Building2 size={24} strokeWidth={1.75} />
                      </div>
                      <div className={styles.ongCardInfo}>
                        <p className={styles.ongCardName}>{ong.name}</p>
                        <p className={styles.ongCardMeta}>{ong.city} · {ong.phone}</p>
                        <p className={styles.ongCardDesc}>{ong.description}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* ── Grupo: Páginas ───────────────────────────────────────── */}
        {!loading && pageResults.length > 0 && (
          <section aria-labelledby="busca-section-pages" className={styles.section}>
            <h2 id="busca-section-pages" className={styles.sectionTitle}>
              <FileText size={18} strokeWidth={2} aria-hidden="true" />
              Páginas
              <span className={styles.sectionCount}>{pageResults.length}</span>
            </h2>
            <ul data-testid="busca-grid-pages" className={styles.pageList} role="list">
              {pageResults.map((page) => (
                <li key={page.id}>
                  <Link href={page.href} className={styles.pageCard}>
                    <div className={styles.pageCardIcon} aria-hidden="true">
                      <FileText size={20} strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className={styles.pageCardTitle}>{page.title}</p>
                      <p className={styles.pageCardDesc}>{page.subtitle}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Estado vazio ─────────────────────────────────────────── */}
        {isEmpty && (
          <div data-testid="busca-empty" className={styles.empty} role="status">
            <span className={styles.emptyEmoji} aria-hidden="true">🐾</span>

            <h2 className={styles.emptyTitle}>
              Não encontramos nada para &ldquo;{query}&rdquo;
            </h2>

            <p className={styles.emptyText}>
              Parece que nenhum pet, ONG ou página corresponde a essa busca.
              Tente palavras diferentes — o nome de uma raça, uma cidade, ou
              termos como &ldquo;cachorro&rdquo;, &ldquo;doação&rdquo; ou &ldquo;vacinação&rdquo;.
            </p>

            <div className={styles.emptyActions}>
              <Link href={ROUTES.PETS} className={styles.btnPrimary}>
                <PawPrint size={16} strokeWidth={2} aria-hidden="true" />
                Ver todos os pets
              </Link>
              <button
                type="button"
                className={styles.btnOutline}
                onClick={() => router.back()}
              >
                <Search size={16} strokeWidth={2} aria-hidden="true" />
                Tentar outra busca
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default function BuscaPage() {
  return (
    <Suspense>
      <BuscaResults />
    </Suspense>
  )
}
