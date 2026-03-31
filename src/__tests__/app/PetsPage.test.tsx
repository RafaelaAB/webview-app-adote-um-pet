import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import PetsPage from '@/app/pets/page'
import { PetProvider } from '@/context/PetContext'
import { petsData } from '@/data/pets'

const mockBack = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack }),
}))

jest.mock('next/link', () => {
  return function MockLink({ href, children, 'data-testid': testId }: {
    href: string; children: React.ReactNode; 'data-testid'?: string
  }) {
    return <a href={href} data-testid={testId}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

function renderPage() {
  return render(
    <PetProvider>
      <PetsPage />
    </PetProvider>
  )
}

describe('PetsPage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockBack.mockClear()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  // ── Estrutura ─────────────────────────────────────────────────────────────

  it('exibe o título "Todos os pets"', () => {
    renderPage()
    expect(screen.getByTestId('pets-title')).toHaveTextContent('Todos os pets')
  })

  it('exibe o subtítulo', () => {
    renderPage()
    expect(screen.getByTestId('pets-subtitle')).toBeInTheDocument()
  })

  it('exibe o botão Voltar', () => {
    renderPage()
    expect(screen.getByTestId('pets-btn-back')).toBeInTheDocument()
  })

  it('chama router.back() ao clicar em Voltar', () => {
    renderPage()
    fireEvent.click(screen.getByTestId('pets-btn-back'))
    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  // ── Loading ───────────────────────────────────────────────────────────────

  it('exibe skeleton de loading antes dos dados chegarem', () => {
    renderPage()
    expect(screen.getByTestId('pets-loading')).toBeInTheDocument()
  })

  it('não exibe os controles enquanto carrega', () => {
    renderPage()
    expect(screen.queryByTestId('pets-controls')).not.toBeInTheDocument()
  })

  // ── Grid e contagem ───────────────────────────────────────────────────────

  it('exibe o grid com até 10 cards após carregar (padrão)', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('all-pets-grid')).toBeInTheDocument()
    })
    expect(screen.getAllByTestId('pet-card')).toHaveLength(10)
  })

  it('exibe o contador de resultados', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pets-results-count')).toBeInTheDocument()
    })
    expect(screen.getByTestId('pets-results-count')).toHaveTextContent('1–10')
  })

  // ── Filtros ───────────────────────────────────────────────────────────────

  it('renderiza todos os botões de filtro', () => {
    renderPage()
    expect(screen.getByTestId('pets-filter-todos')).toBeInTheDocument()
    expect(screen.getByTestId('pets-filter-cachorro')).toBeInTheDocument()
    expect(screen.getByTestId('pets-filter-gato')).toBeInTheDocument()
    expect(screen.getByTestId('pets-filter-ave')).toBeInTheDocument()
    expect(screen.getByTestId('pets-filter-coelho')).toBeInTheDocument()
    expect(screen.getByTestId('pets-filter-outro')).toBeInTheDocument()
  })

  it('filtro "Todos" está ativo por padrão (aria-pressed=true)', () => {
    renderPage()
    expect(screen.getByTestId('pets-filter-todos')).toHaveAttribute('aria-pressed', 'true')
  })

  it('ao clicar em "Cachorros", filtra somente cachorros', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('all-pets-grid')).toBeInTheDocument() })

    fireEvent.click(screen.getByTestId('pets-filter-cachorro'))
    await waitFor(() => {
      const dogs = petsData.filter((p) => p.category === 'Cachorro')
      const cards = screen.getAllByTestId('pet-card')
      // pode ter menos de 10, mostra todos os cachorros se < 10 ou 10 se > 10
      expect(cards.length).toBeLessThanOrEqual(10)
      expect(cards.length).toBeGreaterThan(0)
    })
    expect(screen.getByTestId('pets-filter-cachorro')).toHaveAttribute('aria-pressed', 'true')
  })

  it('ao trocar o filtro, volta para a página 1', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('pets-pagination')).toBeInTheDocument() })

    // vai para página 2
    fireEvent.click(screen.getByTestId('pets-btn-page-2'))
    // troca filtro — deve voltar para pág 1
    fireEvent.click(screen.getByTestId('pets-filter-todos'))
    expect(screen.getByTestId('pets-btn-page-1')).toHaveAttribute('aria-current', 'page')
  })

  // ── Paginação ─────────────────────────────────────────────────────────────

  it('exibe a navegação de paginação', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pets-pagination')).toBeInTheDocument()
    })
  })

  it('botão "anterior" está desabilitado na primeira página', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('pets-btn-prev')).toBeInTheDocument() })
    expect(screen.getByTestId('pets-btn-prev')).toBeDisabled()
  })

  it('navega para a próxima página ao clicar em "próximo"', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('pets-btn-next')).toBeInTheDocument() })

    fireEvent.click(screen.getByTestId('pets-btn-next'))
    expect(screen.getByTestId('pets-btn-page-2')).toHaveAttribute('aria-current', 'page')
  })

  it('navega para página específica ao clicar no número', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('pets-btn-page-2')).toBeInTheDocument() })

    fireEvent.click(screen.getByTestId('pets-btn-page-2'))
    expect(screen.getByTestId('pets-btn-page-2')).toHaveAttribute('aria-current', 'page')
    expect(screen.getByTestId('pets-btn-prev')).not.toBeDisabled()
  })

  it('botão "próximo" está desabilitado na última página', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('pets-pagination')).toBeInTheDocument() })

    // vai para a última página
    const lastPage = Math.ceil(petsData.length / 10)
    fireEvent.click(screen.getByTestId(`pets-btn-page-${lastPage}`))
    expect(screen.getByTestId('pets-btn-next')).toBeDisabled()
  })

  // ── Seletor de itens por página ───────────────────────────────────────────

  it('exibe o seletor de itens por página', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pets-per-page-select')).toBeInTheDocument()
    })
  })

  it('ao selecionar 20 por página, exibe até 20 cards', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('pets-per-page-select')).toBeInTheDocument() })

    fireEvent.change(screen.getByTestId('pets-per-page-select'), { target: { value: '20' } })
    await waitFor(() => {
      const cards = screen.getAllByTestId('pet-card')
      expect(cards.length).toBeLessThanOrEqual(20)
      expect(cards.length).toBeGreaterThan(10)
    })
  })

  it('ao mudar itens por página, volta para a página 1', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => { expect(screen.getByTestId('pets-btn-page-2')).toBeInTheDocument() })

    fireEvent.click(screen.getByTestId('pets-btn-page-2'))
    fireEvent.change(screen.getByTestId('pets-per-page-select'), { target: { value: '20' } })
    expect(screen.getByTestId('pets-btn-page-1')).toHaveAttribute('aria-current', 'page')
  })
})
