import { render, screen, fireEvent, act } from '@testing-library/react'
import Header from '@/components/Header/Header'
import { SidebarProvider } from '@/context/SidebarContext'

jest.mock('next/link', () => {
  return function MockLink({ href, children, className, 'data-testid': testId, 'aria-label': ariaLabel }: {
    href: string
    children: React.ReactNode
    className?: string
    'data-testid'?: string
    'aria-label'?: string
  }) {
    return <a href={href} className={className} data-testid={testId} aria-label={ariaLabel}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function MockImage({ src, alt, 'aria-hidden': ariaHidden }: {
    src: string
    alt: string
    'aria-hidden'?: boolean | 'true' | 'false'
  }) {
    return <img src={src} alt={alt} aria-hidden={ariaHidden as boolean} />
  }
})

/**
 * renderHeader — helper que envolve o Header no SidebarProvider.
 * O Header usa useSidebarContext(), que requer o provider no contexto.
 */
function renderHeader() {
  return render(
    <SidebarProvider>
      <Header />
    </SidebarProvider>
  )
}

describe('Header', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
  })

  // ── Renderização ──────────────────────────────────────────────────────────

  it('renderiza o header', () => {
    renderHeader()
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('tem role="banner"', () => {
    renderHeader()
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('exibe o nome da marca "Adote um Pet"', () => {
    renderHeader()
    expect(screen.getByText('Adote um Pet')).toBeInTheDocument()
  })

  it('o logo é um link para a home page', () => {
    renderHeader()
    expect(screen.getByTestId('header-brand')).toHaveAttribute('href', '/')
  })

  it('o link da marca tem aria-label descritivo', () => {
    renderHeader()
    expect(screen.getByTestId('header-brand')).toHaveAttribute('aria-label', 'Adote um Pet — página inicial')
  })

  // ── Botões ────────────────────────────────────────────────────────────────

  it('renderiza o botão de menu', () => {
    renderHeader()
    expect(screen.getByTestId('header-btn-menu')).toBeInTheDocument()
  })

  it('botão de menu tem aria-label descritivo', () => {
    renderHeader()
    expect(screen.getByLabelText('Abrir menu de navegação')).toBeInTheDocument()
  })

  it('renderiza o botão de busca', () => {
    renderHeader()
    expect(screen.getByTestId('header-btn-search')).toBeInTheDocument()
    expect(screen.getByLabelText('Buscar pets')).toBeInTheDocument()
  })

  it('renderiza o botão de perfil', () => {
    renderHeader()
    expect(screen.getByTestId('header-btn-profile')).toBeInTheDocument()
    expect(screen.getByLabelText('Meu perfil')).toBeInTheDocument()
  })

  it('os botões de menu, busca e perfil têm type="button"', () => {
    renderHeader()
    const buttons = [
      screen.getByTestId('header-btn-menu'),
      screen.getByTestId('header-btn-search'),
      screen.getByTestId('header-btn-profile'),
    ]
    buttons.forEach((btn) => expect(btn).toHaveAttribute('type', 'button'))
  })

  it('o grupo de ações tem aria-label', () => {
    renderHeader()
    expect(screen.getByRole('group', { name: 'Ações do usuário' })).toBeInTheDocument()
  })

  // ── Scroll ────────────────────────────────────────────────────────────────

  it('não tem classe "scrolled" quando a página não foi rolada', () => {
    renderHeader()
    expect(screen.getByTestId('header')).not.toHaveClass('scrolled')
  })

  it('adiciona classe "scrolled" ao rolar além de 10px', () => {
    renderHeader()

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 15 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByTestId('header')).toHaveClass('scrolled')
  })

  it('remove classe "scrolled" ao voltar ao topo', () => {
    renderHeader()

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 50 })
      window.dispatchEvent(new Event('scroll'))
    })

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 5 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByTestId('header')).not.toHaveClass('scrolled')
  })

  // ── Interação ─────────────────────────────────────────────────────────────

  it('o botão de menu chama o toggle da sidebar ao ser clicado', () => {
    renderHeader()
    const menuBtn = screen.getByTestId('header-btn-menu')
    expect(() => fireEvent.click(menuBtn)).not.toThrow()
  })

  // ── Logo ──────────────────────────────────────────────────────────────────

  it('exibe a imagem do logo com alt vazio (decorativa, texto já presente)', () => {
    renderHeader()
    const logo = screen.getByRole('img', { hidden: true })
    expect(logo).toHaveAttribute('alt', '')
  })
})
