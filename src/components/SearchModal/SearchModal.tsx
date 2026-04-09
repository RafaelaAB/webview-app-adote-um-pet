'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight, Building2, FileText } from 'lucide-react'
import { useGlobalSearch } from '@/hooks/useGlobalSearch'
import { ROUTES } from '@/lib/routes'
import styles from './SearchModal.module.css'

const SUGGESTIONS = ['Cachorro', 'Gato', 'Labrador', 'São Paulo', 'Doação', 'ONG']

interface SearchModalProps {
  onClose: () => void
}

export default function SearchModal({ onClose }: SearchModalProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const { petResults, ongResults, pageResults, total } = useGlobalSearch(query)

  const hasQuery = query.trim().length > 0

  const previewPets = petResults.slice(0, 4)
  const previewOngs = ongResults.slice(0, 2)
  const previewPages = pageResults.slice(0, 3)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    onClose()
    router.push(ROUTES.SEARCH(query.trim()))
  }

  function handleNavigate(href: string) {
    onClose()
    router.push(href)
  }

  function handleSuggestionClick(suggestion: string) {
    setQuery(suggestion)
    inputRef.current?.focus()
  }

  function handleSeeAll() {
    onClose()
    router.push(ROUTES.SEARCH(query.trim()))
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Busca global"
    >
      <div className={styles.modal}>

        <form onSubmit={handleSubmit} role="search">
          <div className={styles.inputRow}>
            <Search
              size={20}
              strokeWidth={2}
              className={styles.searchIcon}
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              data-testid="search-input"
              className={styles.input}
              type="search"
              placeholder="Buscar pets, ONGs, páginas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Campo de busca"
              autoComplete="off"
            />
            {hasQuery && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => { setQuery(''); inputRef.current?.focus() }}
                aria-label="Limpar busca"
              >
                <X size={16} strokeWidth={2.5} aria-hidden="true" />
              </button>
            )}
          </div>
        </form>

        <div className={styles.results} role="listbox" aria-label="Resultados da busca">

          {!hasQuery && (
            <div className={styles.hint} aria-live="polite">
              <Search size={16} aria-hidden="true" />
              <span>Busque por pets, ONGs ou páginas do site</span>
            </div>
          )}

          {hasQuery && total === 0 && (
            <div
              data-testid="search-empty"
              className={styles.empty}
              role="status"
              aria-live="polite"
            >
              <span className={styles.emptyEmoji} aria-hidden="true">🔍</span>
              <p className={styles.emptyTitle}>
                Nenhum resultado para &ldquo;{query}&rdquo;
              </p>
              <p className={styles.emptyText}>
                Tente outro termo — nome de pet, raça, cidade, ONG ou uma página do site.
              </p>
              <div className={styles.emptySuggestions} aria-label="Sugestões de busca">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={styles.suggestionChip}
                    onClick={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {hasQuery && previewPets.length > 0 && (
            <>
              <div className={styles.groupLabel} aria-hidden="true">
                🐾 Pets
              </div>
              {previewPets.map((pet) => (
                <button
                  key={pet.id}
                  type="button"
                  role="option"
                  aria-selected="false"
                  data-testid={`search-result-pet-${pet.id}`}
                  className={styles.resultItem}
                  onClick={() => handleNavigate(pet.href)}
                >

                  <img
                    src={pet.image}
                    alt=""
                    aria-hidden="true"
                    className={styles.resultImg}
                  />
                  <div className={styles.resultInfo}>
                    <p className={styles.resultName}>{pet.title}</p>
                    <p className={styles.resultMeta}>{pet.subtitle}</p>
                  </div>
                  <span className={styles.resultBadge}>{pet.badge}</span>
                </button>
              ))}
            </>
          )}

          {hasQuery && previewOngs.length > 0 && (
            <>
              <div className={styles.groupLabel} aria-hidden="true">
                🏠 ONGs
              </div>
              {previewOngs.map((ong) => (
                <button
                  key={ong.id}
                  type="button"
                  role="option"
                  aria-selected="false"
                  data-testid={`search-result-ong-${ong.id}`}
                  className={styles.resultItem}
                  onClick={() => handleNavigate(ong.href)}
                >
                  <div className={styles.resultIcon} aria-hidden="true">
                    <Building2 size={22} strokeWidth={1.75} />
                  </div>
                  <div className={styles.resultInfo}>
                    <p className={styles.resultName}>{ong.title}</p>
                    <p className={styles.resultMeta}>{ong.subtitle}</p>
                  </div>
                  <span className={styles.resultBadge}>ONG</span>
                </button>
              ))}
            </>
          )}

          {hasQuery && previewPages.length > 0 && (
            <>
              <div className={styles.groupLabel} aria-hidden="true">
                📄 Páginas
              </div>
              {previewPages.map((page) => (
                <button
                  key={page.id}
                  type="button"
                  role="option"
                  aria-selected="false"
                  data-testid={`search-result-page-${page.id}`}
                  className={styles.resultItem}
                  onClick={() => handleNavigate(page.href)}
                >
                  <div className={`${styles.resultIcon} ${styles.resultIconPage}`} aria-hidden="true">
                    <FileText size={22} strokeWidth={1.75} />
                  </div>
                  <div className={styles.resultInfo}>
                    <p className={styles.resultName}>{page.title}</p>
                    <p className={styles.resultMeta}>{page.subtitle}</p>
                  </div>
                  <span className={styles.resultBadge} style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
                    Página
                  </span>
                </button>
              ))}
            </>
          )}
        </div>

        {hasQuery && total > 0 && (
          <div className={styles.footer}>
            <button
              type="button"
              data-testid="search-see-all"
              className={styles.footerBtn}
              onClick={handleSeeAll}
              aria-label={`Ver todos os ${total} resultados para ${query}`}
            >
              <span>
                Ver todos os <strong>{total}</strong> resultado{total !== 1 ? 's' : ''} para &ldquo;{query}&rdquo;
              </span>
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
