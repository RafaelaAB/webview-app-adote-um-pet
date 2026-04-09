/**
 * usePagination — hook de paginação genérico
 * ────────────────────────────────────────────────────────────────────────────
 *
 * O que é um Custom Hook?
 * ─────────────────────────
 * No React, um Custom Hook é uma função JavaScript que:
 *   1. Começa com "use" (convenção obrigatória)
 *   2. Pode chamar outros hooks (useState, useEffect, etc.)
 *   3. Encapsula lógica reutilizável entre componentes
 *
 * Analogia com Angular: Custom Hooks são parecidos com Services do Angular,
 * mas sem injeção de dependência — eles são simplesmente funções chamadas
 * diretamente dentro de componentes funcionais.
 *
 * Por que extrair a paginação para um hook?
 * ──────────────────────────────────────────
 * Antes, toda a lógica de paginação estava dentro de PetsPage:
 *   - useState para currentPage e perPage
 *   - cálculos de totalPages, startIndex, endIndex
 *   - funções goToPage, handlePerPageChange
 *   - algoritmo getPageNumbers() com ellipsis
 *
 * Isso tornava PetsPage grande e difícil de testar isoladamente.
 * Agora PetsPage chama usePagination(pets) e recebe tudo pronto.
 *
 * Generics (<T>):
 * ────────────────
 * O `<T>` significa que este hook funciona com QUALQUER tipo de lista:
 *   usePagination<Pet>(pets)      → pagina pets
 *   usePagination<Ong>(ongs)      → pagina ONGs
 *   usePagination<string>(nomes)  → pagina strings
 * O TypeScript infere o tipo automaticamente pelo array passado.
 *
 * Algoritmo de ellipsis (getPageNumbers):
 * ────────────────────────────────────────
 * Para evitar mostrar dezenas de botões de página, usamos ellipsis (…).
 * O algoritmo garante sempre no máximo 7 itens visíveis:
 *
 *   [1] [2] [3] [4] [5] [6] [7]          → sem ellipsis (≤7 páginas)
 *   [1] … [4] [5] [6] … [20]             → ellipsis dos dois lados
 *   [1] [2] [3] [4] [5] … [20]           → ellipsis só à direita
 *   [1] … [16] [17] [18] [19] [20]       → ellipsis só à esquerda
 *
 * O valor 0 no array representa o ellipsis (…) na renderização.
 */

import { useState } from 'react'

/**
 * usePagination — divide uma lista em páginas e fornece navegação.
 *
 * @param items          Lista completa de itens a paginar (qualquer tipo).
 * @param defaultPerPage Quantidade inicial de itens por página (padrão: 10).
 *
 * @returns Objeto com estado e funções de paginação:
 *   - currentPage    → número da página atual (começa em 1)
 *   - perPage        → itens por página atualmente selecionados
 *   - totalItems     → total de itens na lista completa
 *   - totalPages     → total de páginas calculadas
 *   - startIndex     → índice do primeiro item da página atual
 *   - endIndex       → índice do último item da página atual (exclusivo)
 *   - paginatedItems → fatia da lista correspondente à página atual
 *   - goToPage()     → navega para uma página específica (com clamp)
 *   - changePerPage()→ muda itens por página e volta para página 1
 *   - resetPage()    → volta para a página 1 (usado ao mudar filtros)
 *   - getPageNumbers()→ retorna array de números para renderizar os botões
 */
export function usePagination<T>(items: T[], defaultPerPage = 10) {
  // Página atual — começa em 1, nunca vai abaixo de 1 nem acima de totalPages
  const [currentPage, setCurrentPage] = useState(1)

  // Quantos itens exibir por página — controlado pelo <select> na UI
  const [perPage, setPerPage] = useState(defaultPerPage)

  // ── Valores derivados (calculados a partir do estado, sem useState) ──────

  const totalItems = items.length

  // Math.max(1, …) garante mínimo de 1 página, mesmo com lista vazia
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))

  // Índices para o Array.slice() que extrai a página atual
  const startIndex = (currentPage - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalItems)

  // Fatia da lista que corresponde à página atual
  const paginatedItems = items.slice(startIndex, endIndex)

  // ── Funções de navegação ─────────────────────────────────────────────────

  /**
   * Navega para uma página específica.
   * Math.max/min garantem que o valor fique entre 1 e totalPages (clamp).
   */
  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  /**
   * Muda o número de itens por página e volta para a página 1.
   * Voltar para página 1 evita que o usuário fique em uma página inexistente
   * (ex: estava na página 5 de 10 itens/página → muda para 50/página → só existe 1 página).
   */
  function changePerPage(newPerPage: number) {
    setPerPage(newPerPage)
    setCurrentPage(1)
  }

  /**
   * Volta para a página 1.
   * Usado quando o filtro de categoria muda — os resultados são diferentes,
   * então faz sentido começar do início.
   */
  function resetPage() {
    setCurrentPage(1)
  }

  /**
   * Gera o array de números de página para renderizar os botões de navegação.
   * O valor 0 representa um ellipsis (…) na interface.
   *
   * @returns Array de números de página com 0 onde deve aparecer "…"
   */
  function getPageNumbers(): (number | 0)[] {
    // Com 7 ou menos páginas, mostra todas sem ellipsis
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | 0)[] = []

    // Ellipsis à esquerda: aparece quando estamos longe do início (página > 4)
    const showLeftEllipsis = currentPage > 4
    // Ellipsis à direita: aparece quando estamos longe do fim
    const showRightEllipsis = currentPage < totalPages - 3

    // Página 1 sempre aparece
    pages.push(1)

    // Ellipsis à esquerda (0 = placeholder)
    if (showLeftEllipsis) pages.push(0)

    // Páginas ao redor da atual (janela deslizante de ±1)
    const start = showLeftEllipsis ? Math.max(2, currentPage - 1) : 2
    const end = showRightEllipsis
      ? Math.min(totalPages - 1, currentPage + 1)
      : totalPages - 1
    for (let i = start; i <= end; i++) pages.push(i)

    // Ellipsis à direita
    if (showRightEllipsis) pages.push(0)

    // Última página sempre aparece
    pages.push(totalPages)

    return pages
  }

  return {
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
  }
}
