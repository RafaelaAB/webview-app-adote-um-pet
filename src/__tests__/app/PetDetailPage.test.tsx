import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import PetDetailPage from '@/app/pets/[id]/page'
import { PetProvider } from '@/context/PetContext'

const mockBack = jest.fn()
const mockParams: { id: string | string[] } = { id: '1' }

jest.mock('next/navigation', () => ({
  useRouter: () => ({ back: mockBack }),
  useParams: () => mockParams,
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
      <PetDetailPage />
    </PetProvider>
  )
}

describe('PetDetailPage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockBack.mockClear()
    mockParams.id = '1'
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  // ── Loading ───────────────────────────────────────────────────────────────

  it('exibe o skeleton de loading antes dos dados chegarem', () => {
    renderPage()
    expect(screen.getByTestId('pet-detail-loading')).toBeInTheDocument()
  })

  it('o skeleton de loading tem aria-busy="true"', () => {
    renderPage()
    expect(screen.getByTestId('pet-detail-loading')).toHaveAttribute('aria-busy', 'true')
  })

  // ── Pet encontrado ────────────────────────────────────────────────────────

  it('exibe a página de detalhe após carregar', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-page')).toBeInTheDocument()
    })
  })

  it('exibe o nome do pet (Rex)', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-name')).toHaveTextContent('Rex')
    })
  })

  it('exibe a raça do pet', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-breed')).toHaveTextContent('Labrador Retriever')
    })
  })

  it('exibe a categoria do pet', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-category')).toHaveTextContent('Cachorro')
    })
  })

  it('exibe o status do pet', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-status')).toHaveTextContent('Disponível')
    })
  })

  it('exibe a localização do pet', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-location')).toHaveTextContent('São Paulo, SP')
    })
  })

  it('exibe os atributos de idade, sexo e porte', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-attr-idade')).toHaveTextContent('2 anos')
      expect(screen.getByTestId('pet-detail-attr-sexo')).toHaveTextContent('Macho')
      expect(screen.getByTestId('pet-detail-attr-porte')).toHaveTextContent('Grande')
    })
  })

  it('exibe o indicador de vacinação', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-health-vaccinated')).toHaveTextContent('Sim')
    })
  })

  it('exibe o indicador de castração', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-health-castrated')).toHaveTextContent('Sim')
    })
  })

  it('exibe "Não" para pet não vacinado', async () => {
    mockParams.id = '6' // Pingo — vaccinated: false
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-health-vaccinated')).toHaveTextContent('Não')
    })
  })

  it('exibe a descrição do pet', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-description')).toBeInTheDocument()
    })
  })

  it('exibe o botão "Quero adotar" apontando para /cadastrar', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-btn-adopt')).toHaveAttribute('href', '/cadastrar')
    })
  })

  it('exibe o botão de favoritar', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-btn-favorite')).toBeInTheDocument()
    })
  })

  it('o botão de favoritar tem aria-label', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-btn-favorite')).toHaveAttribute('aria-label')
    })
  })

  it('chama router.back() ao clicar em Voltar', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-btn-back')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByTestId('pet-detail-btn-back'))
    expect(mockBack).toHaveBeenCalledTimes(1)
  })

  it('a imagem tem alt correto', async () => {
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByAltText('Foto de Rex')).toBeInTheDocument()
    })
  })

  // ── Pet não encontrado ────────────────────────────────────────────────────

  it('exibe "Pet não encontrado" para id inválido', async () => {
    mockParams.id = '999'
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-not-found')).toBeInTheDocument()
    })
    expect(screen.getByText('Pet não encontrado')).toBeInTheDocument()
  })

  it('exibe link "Ver todos os pets" na tela de não encontrado', async () => {
    mockParams.id = '999'
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-btn-back-to-list')).toHaveAttribute('href', '/pets')
    })
  })

  // ── params como array ─────────────────────────────────────────────────────

  it('aceita params.id como array de strings', async () => {
    mockParams.id = ['1']
    renderPage()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('pet-detail-name')).toHaveTextContent('Rex')
    })
  })
})
