import { useState } from 'react'

export function usePagination<T>(items: T[], defaultPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1)

  const [perPage, setPerPage] = useState(defaultPerPage)

  const totalItems = items.length

  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))

  const startIndex = (currentPage - 1) * perPage
  const endIndex = Math.min(startIndex + perPage, totalItems)

  const paginatedItems = items.slice(startIndex, endIndex)

  function goToPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  function changePerPage(newPerPage: number) {
    setPerPage(newPerPage)
    setCurrentPage(1)
  }

  function resetPage() {
    setCurrentPage(1)
  }

  function getPageNumbers(): (number | 0)[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | 0)[] = []

    const showLeftEllipsis = currentPage > 4
    const showRightEllipsis = currentPage < totalPages - 3

    pages.push(1)

    if (showLeftEllipsis) pages.push(0)

    const start = showLeftEllipsis ? Math.max(2, currentPage - 1) : 2
    const end = showRightEllipsis
      ? Math.min(totalPages - 1, currentPage + 1)
      : totalPages - 1
    for (let i = start; i <= end; i++) pages.push(i)

    if (showRightEllipsis) pages.push(0)

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
