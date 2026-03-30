'use client'

/**
 * PÁGINA DE LISTAGEM DE PETS — rota: /pets
 *
 * Exibe todos os pets com filtro por categoria e paginação.
 *
 * Funcionalidades:
 *   - Filtro por categoria (Todos, Cachorros, Gatos, Aves, Coelhos, Outros)
 *   - Seletor de quantos pets exibir por página (10, 20, 50, 100)
 *   - Paginação com navegação por número de página
 *   - Contador "Mostrando X–Y de Z pets"
 *   - Ao trocar filtro ou perPage, volta automaticamente para a página 1
 *
 * Hooks usados:
 *   - useState (3x) → categoria ativa, página atual, itens por página
 *   - useRouter     → router.back() no botão Voltar
 *   - usePets       → lista de pets filtrados do contexto global
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import { usePets } from '@/hooks/usePets'
import { PetCategory } from '@/types'
import PetCard from '@/components/PetCard/PetCard'
import styles from './pets.module.css'

/** Opções de filtro de categoria */
const CATEGORIES: { label: string; value: PetCategory | 'Todos' }[] = [
  { label: '🐾 Todos', value: 'Todos' },
  { label: '🐶 Cachorros', value: 'Cachorro' },
  { label: '🐱 Gatos', value: 'Gato' },
  { label: '🐦 Aves', value: 'Ave' },
  { label: '🐰 Coelhos', value: 'Coelho' },
  { label: '✨ Outros', value: 'Outro' },
]

/** Opções de quantos itens exibir por página */
const PER_PAGE_OPTIONS = [10, 20, 50, 100]

export default function PetsPage() {
  const router = useRouter()

  // Categoria selecionada no filtro (padrão: sem filtro)
  const [activeCategory, setActiveCategory] = useState<PetCategory | 'Todos'>('Todos')

  // Página atual da paginação
  const [currentPage, setCurrentPage] = useState(1)

  // Quantos pets exibir por página (padrão: 10)
  const [perPage, setPerPage] = useState(10)

  // Busca todos os pets filtrados pela categoria selecionada
  const { pets, loading } = usePets(
    activeCategory === 'Todos' ? undefined : activeCategory
  )

  // ── Cálculos de paginação ──────────────────────────────────────────────────

  const totalPets = pets.length
  const totalPages = Math.max(1, Math.ceil(totalPets / perPage))

  // Índices do slice: quais pets desta página mostrar
  const startIndex = (currentPage - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalPets)
  const paginatedPets = pets.slice(startIndex, endIndex)

  // ── Handlers ──────────────────────────────────────────────────────────────

  /** Troca de categoria: aplica o filtro e volta para a página 1 */
  function handleCategoryChange(value: PetCategory | 'Todos') {
    setActiveCategory(value)
    setCurrentPage(1)
  }

  /** Troca quantos itens por página e volta para a página 1 */
  function handlePerPageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  /** Navega para uma página específica (com guard para não sair dos limites) */
  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // ── Geração dos números de página a exibir ─────────────────────────────────
  /**
   * Mostra no máximo 7 "slots" na barra de paginação:
   *   [1] ... [currentPage-1] [currentPage] [currentPage+1] ... [totalPages]
   * Usa o número especial 0 como marcador de "..." (ellipsis).
   */
  function getPageNumbers(): (number | 0)[] {
    if (totalPages <= 7) {
      // Cabe tudo sem ellipsis
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | 0)[] = []
    const showLeftEllipsis = currentPage > 4
    const showRightEllipsis = currentPage < totalPages - 3

    pages.push(1) // primeira página sempre aparece

    if (showLeftEllipsis) pages.push(0) // "..." esquerdo

    // Janela ao redor da página atual
    const start = showLeftEllipsis ? Math.max(2, currentPage - 1) : 2
    const end = showRightEllipsis ? Math.min(totalPages - 1, currentPage + 1) : totalPages - 1
    for (let i = start; i <= end; i++) pages.push(i)

    if (showRightEllipsis) pages.push(0) // "..." direito

    pages.push(totalPages) // última página sempre aparece

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={styles.page}>
      <div className="container">

        {/* Botão Voltar */}
        <button
          onClick={() => router.back()}
          className={styles.backBtn}
          aria-label="Voltar"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Voltar
        </button>

        {/* Cabeçalho da página */}
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Todos os pets</h1>
          <p className={styles.pageSubtitle}>
            Encontre seu novo melhor amigo. Cada pet aqui está esperando por um
            lar cheio de amor.
          </p>
        </div>

        {/* Filtros de categoria */}
        <div className={styles.filters} role="group" aria-label="Filtrar por categoria">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
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
        {!loading && totalPets > 0 && (
          <div className={styles.controls}>
            <p className={styles.resultsCount}>
              Mostrando{' '}
              <strong>{startIndex + 1}–{endIndex}</strong>{' '}
              de <strong>{totalPets}</strong>{' '}
              {totalPets === 1 ? 'pet' : 'pets'}
            </p>

            <label className={styles.perPageLabel}>
              Por página:
              <select
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
          <div className={styles.grid}>
            {Array.from({ length: perPage > 10 ? 10 : perPage }).map((_, i) => (
              <div key={i} className={styles.skeleton} aria-hidden="true" />
            ))}
          </div>
        ) : paginatedPets.length > 0 ? (
          <div className={styles.grid} data-testid="all-pets-grid">
            {paginatedPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true">🐾</span>
            <p>Nenhum pet encontrado nessa categoria por enquanto.</p>
          </div>
        )}

        {/* Paginação */}
        {!loading && totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Paginação">

            {/* Botão Página Anterior */}
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageBtn}
              aria-label="Página anterior"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Números de página */}
            {pageNumbers.map((page, i) =>
              page === 0 ? (
                // Ellipsis (reticências) — não é clicável
                <span key={`ellipsis-${i}`} className={styles.ellipsis} aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
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

            {/* Botão Próxima Página */}
            <button
              onClick={() => goToPage(currentPage + 1)}
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
