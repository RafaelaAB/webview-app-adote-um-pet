import { render, screen, fireEvent, act } from '@testing-library/react'
import Header from '@/components/Header/Header'

jest.mock('next/link', () => {
  return function MockLink({ href, children, className, 'data-testid': testId }: {
    href: string
    children: React.ReactNode
    className?: string
    'data-testid'?: string
  }) {
    return <a href={href} className={className} data-testid={testId}>{children}</a>
  }
})

describe('Header', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
  })

  it('renderiza o header', () => {
    render(<Header />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('exibe o nome da marca "Adote um Pet"', () => {
    render(<Header />)
    expect(screen.getByText('Adote um Pet')).toBeInTheDocument()
  })

  it('o logo é um link para a home page', () => {
    render(<Header />)
    expect(screen.getByTestId('header-brand')).toHaveAttribute('href', '/')
  })

  it('renderiza o botão de menu', () => {
    render(<Header />)
    expect(screen.getByTestId('header-btn-menu')).toBeInTheDocument()
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument()
  })

  it('renderiza o botão de busca', () => {
    render(<Header />)
    expect(screen.getByTestId('header-btn-search')).toBeInTheDocument()
    expect(screen.getByLabelText('Buscar pets')).toBeInTheDocument()
  })

  it('renderiza o botão de perfil', () => {
    render(<Header />)
    expect(screen.getByTestId('header-btn-profile')).toBeInTheDocument()
    expect(screen.getByLabelText('Meu perfil')).toBeInTheDocument()
  })

  it('não tem classe "scrolled" quando a página não foi rolada', () => {
    render(<Header />)
    expect(screen.getByTestId('header')).not.toHaveClass('scrolled')
  })

  it('adiciona classe "scrolled" ao rolar além de 10px', () => {
    render(<Header />)

    act(() => {
      Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 15 })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(screen.getByTestId('header')).toHaveClass('scrolled')
  })

  it('remove classe "scrolled" ao voltar ao topo', () => {
    render(<Header />)

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

  it('os botões de menu, busca e perfil têm type="button"', () => {
    render(<Header />)
    const buttons = [
      screen.getByTestId('header-btn-menu'),
      screen.getByTestId('header-btn-search'),
      screen.getByTestId('header-btn-profile'),
    ]
    buttons.forEach((btn) => expect(btn).toHaveAttribute('type', 'button'))
  })
})
