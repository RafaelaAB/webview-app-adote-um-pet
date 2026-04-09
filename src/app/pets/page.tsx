'use client'

/**
 * PÁGINA DE LISTAGEM DE PETS — rota: /pets
 *
 * Exibe todos os pets com filtro por categoria e paginação.
 */

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePets } from '@/hooks/usePets'
import { usePagination } from '@/hooks/usePagination'
import { PetCategory } from '@/types'
import PetCard from '@/components/PetCard/PetCard'
import BackButton from '@/components/BackButton/BackButton'
import { createLogger } from '@/lib/logger'
import styles from './pets.module.css'

const log = createLogger('PetsPage')

const CATEGORIES: { label: string; value: PetCategory | 'Todos' }[] = [
  { label: '🐾 Todos', value: 'Todos' },
  { label: '🐶 Cachorros', value: 'Cachorro' },
  { label: '🐱 Gatos', value: 'Gato' },
  { label: '🐦 Aves', value: 'Ave' },
  { label: '🐰 Coelhos', value: 'Coelho' },
  { label: '✨ Outros', value: 'Outro' },
]

const PER_PAGE_OPTIONS = [10, 20, 50, 100]

export default function PetsPage() {
  const [activeCategory, setActiveCategory] = useState<PetCategory | 'Todos'>('Todos')

  const { pets, loading } = usePets(
    activeCategory === 'Todos' ? undefined : activeCategory
  )

  const {
    currentPage,
    perPage,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    paginatedItems,
    goToPage,
    changePerPage,
    resetPage,
    getPageNumbers,
  } = usePagination(pets)

  const pageNumbers = getPageNumbers()

  function handleCategoryChange(value: PetCategory | 'Todos') {
    log.info('filtro de categoria alterado', { de: activeCategory, para: value })
    setActiveCategory(value)
    resetPage()
  }

  function handlePerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const novoValor = Number(e.target.value)
    log.info('itens por página alterado', { de: perPage, para: novoValor })
    changePerPage(novoValor)
  }

  function handlePageNav(page: number) {
    log.debug('navegação de página', { de: currentPage, para: page, totalPages })
    goToPage(page)
  }

  return (
    <div data-testid="pets-page" className={styles.page}>
      <div className="container">

        <BackButton data-testid="pets-btn-back" />

        {/* Cabeçalho da página */}
        <div className={styles.pageHeader}>
          <h1 data-testid="pets-title" className={styles.pageTitle}>Todos os pets</h1>
          <p data-testid="pets-subtitle" className={styles.pageSubtitle}>
            Encontre seu novo melhor amigo. Cada pet aqui está esperando por um
            lar cheio de amor.
          </p>
        </div>

        {/* Filtros de categoria */}
        <div
          data-testid="pets-filters"
          className={styles.filters}
          role="group"
          aria-label="Filtrar por categoria"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              data-testid={`pets-filter-${cat.value.toLowerCase()}`}
              onClick={() => handleCategoryChange(cat.value as PetCategory | 'Todos')}
              className={`${styles.filterBtn} ${
                activeCategory === cat.value ? styles.filterActive : ''
              }`}
              aria-pressed={activeCategory === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Barra de controles: contagem + seletor de itens por página */}
        {!loading && totalItems > 0 && (
          <div data-testid="pets-controls" className={styles.controls}>
            <p data-testid="pets-results-count" className={styles.resultsCount}>
              Mostrando{' '}
              <strong>{startIndex + 1}–{endIndex}</strong>{' '}
              de <strong>{totalItems}</strong>{' '}
              {totalItems === 1 ? 'pet' : 'pets'}
            </p>

            <label className={styles.perPageLabel}>
              Por página:
              <select
                data-testid="pets-per-page-select"
                value={perPage}
                onChange={handlePerPageChange}
                className={styles.perPageSelect}
                aria-label="Itens por página"
              >
                {PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>
          </div>
        )}

        {/* Grid de pets */}
        {loading ? (
          <div data-testid="pets-loading" className={styles.grid}>
            {Array.from({ length: perPage > 10 ? 10 : perPage }).map((_, i) => (
              <div key={i} className={styles.skeleton} aria-hidden="true" />
            ))}
          </div>
        ) : paginatedItems.length > 0 ? (
          <div data-testid="all-pets-grid" className={styles.grid}>
            {paginatedItems.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div data-testid="pets-empty" className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true">🐾</span>
            <p>Nenhum pet encontrado nessa categoria por enquanto.</p>
          </div>
        )}

        {/* Paginação */}
        {!loading && totalPages > 1 && (
          <nav data-testid="pets-pagination" className={styles.pagination} aria-label="Paginação">

            <button
              data-testid="pets-btn-prev"
              onClick={() => handlePageNav(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageBtn}
              aria-label="Página anterior"
            >
              <ChevronLeft size={16} />
            </button>

            {pageNumbers.map((page, i) =>
              page === 0 ? (
                <span key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  data-testid={`pets-btn-page-${page}`}
                  onClick={() => handlePageNav(page)}
                  className={`${styles.pageBtn} ${
                    currentPage === page ? styles.pageBtnActive : ''
                  }`}
                  aria-label={`Página ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            )}

            <button
              data-testid="pets-btn-next"
              onClick={() => handlePageNav(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageBtn}
              aria-label="Próxima página"
            >
              <ChevronRight size={16} />
            </button>
          </nav>
        )}
      </div>
    </div>
  )
}
