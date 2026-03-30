import { render, screen, act, waitFor } from '@testing-library/react'
import HomePage from '@/app/page'
import { PetProvider } from '@/context/PetContext'
import { petsData } from '@/data/pets'

jest.mock('next/link', () => {
  return function MockLink({ href, children, 'data-testid': testId, className }: {
    href: string; children: React.ReactNode; 'data-testid'?: string; className?: string
  }) {
    return <a href={href} data-testid={testId} className={className}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

function renderHome() {
  return render(
    <PetProvider>
      <HomePage />
    </PetProvider>
  )
}

describe('HomePage', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  // ── Hero ──────────────────────────────────────────────────────────────────

  it('exibe o badge "Adoção responsável"', () => {
    renderHome()
    expect(screen.getByTestId('home-hero-badge')).toHaveTextContent('Adoção responsável')
  })

  it('exibe o título hero', () => {
    renderHome()
    expect(screen.getByTestId('home-hero-title')).toHaveTextContent('Salve uma vida e')
  })

  it('exibe o botão "Adotar agora" apontando para /pets', () => {
    renderHome()
    expect(screen.getByTestId('home-btn-adopt')).toHaveAttribute('href', '/pets')
  })

  it('exibe o botão "Cadastrar pet" apontando para /cadastrar', () => {
    renderHome()
    expect(screen.getByTestId('home-btn-register')).toHaveAttribute('href', '/cadastrar')
  })

  // ── Seção de pets ─────────────────────────────────────────────────────────

  it('exibe o título da seção de pets', () => {
    renderHome()
    expect(screen.getByTestId('home-pets-title')).toHaveTextContent('Veja os pets que precisam de ajuda')
  })

  it('exibe skeleton de loading enquanto os dados não chegam', () => {
    renderHome()
    expect(screen.getByTestId('home-pets-loading')).toBeInTheDocument()
  })

  it('exibe 4 cards de pets em destaque após carregar', async () => {
    renderHome()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('home-pets-grid')).toBeInTheDocument()
    })
    expect(screen.getAllByTestId('pet-card')).toHaveLength(4)
  })

  it('exibe botão "Veja todos" apontando para /pets', async () => {
    renderHome()
    act(() => { jest.advanceTimersByTime(500) })
    await waitFor(() => {
      expect(screen.getByTestId('home-btn-see-all')).toHaveAttribute('href', '/pets')
    })
  })

  // ── Seção CTA ─────────────────────────────────────────────────────────────

  it('exibe o título da seção CTA', () => {
    renderHome()
    expect(screen.getByTestId('home-cta-title')).toHaveTextContent('Encontrou algum pet que precisa de ajuda?')
  })

  it('exibe o botão CTA apontando para /cadastrar', () => {
    renderHome()
    expect(screen.getByTestId('home-btn-cta-register')).toHaveAttribute('href', '/cadastrar')
  })

  // ── Seção Sobre ───────────────────────────────────────────────────────────

  it('exibe o título "Quem somos nós"', () => {
    renderHome()
    expect(screen.getByTestId('home-about-title')).toHaveTextContent('Quem somos nós')
  })

  it('exibe o bloco de estatísticas', () => {
    renderHome()
    expect(screen.getByTestId('home-about-stats')).toBeInTheDocument()
  })

  it('exibe as 4 estatísticas da ONG', () => {
    renderHome()
    expect(screen.getByText('500+')).toBeInTheDocument()
    expect(screen.getByText('Pets adotados')).toBeInTheDocument()
    expect(screen.getByText('200+')).toBeInTheDocument()
    expect(screen.getByText('Famílias felizes')).toBeInTheDocument()
  })

  it('exibe o botão "Saiba mais sobre nós" apontando para /sobre', () => {
    renderHome()
    expect(screen.getByTestId('home-btn-about')).toHaveAttribute('href', '/sobre')
  })
})
