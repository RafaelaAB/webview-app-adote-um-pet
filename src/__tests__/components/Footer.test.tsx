import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer/Footer'

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />
  }
})

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  // ── Estrutura e semântica ─────────────────────────────────────────────────

  it('renderiza o elemento footer', () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('tem role="contentinfo"', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  // ── Marca ─────────────────────────────────────────────────────────────────

  it('exibe o nome da marca "Adote um Pet"', () => {
    expect(screen.getByTestId('footer-brand')).toHaveTextContent('Adote um Pet')
  })

  it('exibe o nome da desenvolvedora', () => {
    expect(screen.getByText('Rafaela Andrade Batista')).toBeInTheDocument()
  })

  // ── Links sociais ─────────────────────────────────────────────────────────

  it('a navegação de redes sociais tem aria-label', () => {
    expect(screen.getByRole('navigation', { name: 'Redes sociais' })).toBeInTheDocument()
  })

  it('exibe o link do GitHub com href correto', () => {
    const githubLink = screen.getByTestId('footer-link-github')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/RafaelaAB')
  })

  it('o link do GitHub abre em nova aba', () => {
    const githubLink = screen.getByTestId('footer-link-github')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('o link do GitHub tem aria-label com aviso de nova aba', () => {
    const githubLink = screen.getByTestId('footer-link-github')
    expect(githubLink).toHaveAttribute('aria-label', expect.stringContaining('nova aba'))
  })

  it('exibe o link do Instagram com href correto', () => {
    const instagramLink = screen.getByTestId('footer-link-instagram')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/___hadouken/')
  })

  it('o link do Instagram abre em nova aba', () => {
    const instagramLink = screen.getByTestId('footer-link-instagram')
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('o link do Instagram tem aria-label com aviso de nova aba', () => {
    const instagramLink = screen.getByTestId('footer-link-instagram')
    expect(instagramLink).toHaveAttribute('aria-label', expect.stringContaining('nova aba'))
  })

  it('exibe o texto "GitHub"', () => {
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('exibe o texto "Instagram"', () => {
    expect(screen.getByText('Instagram')).toBeInTheDocument()
  })
})
