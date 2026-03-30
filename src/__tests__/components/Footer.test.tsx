import { render, screen } from '@testing-library/react'
import Footer from '@/components/Footer/Footer'

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  it('renderiza o elemento footer', () => {
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('exibe o nome da marca "Adote um Pet"', () => {
    expect(screen.getByTestId('footer-brand')).toHaveTextContent('Adote um Pet')
  })

  it('exibe o nome da desenvolvedora', () => {
    expect(screen.getByText('Rafaela Andrade Batista')).toBeInTheDocument()
  })

  it('exibe o link do GitHub com href correto', () => {
    const githubLink = screen.getByTestId('footer-link-github')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/rafaela-andrade')
  })

  it('o link do GitHub abre em nova aba', () => {
    const githubLink = screen.getByTestId('footer-link-github')
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('exibe o link do Instagram com href correto', () => {
    const instagramLink = screen.getByTestId('footer-link-instagram')
    expect(instagramLink).toBeInTheDocument()
    expect(instagramLink).toHaveAttribute('href', 'https://instagram.com/rafaela.andrade')
  })

  it('o link do Instagram abre em nova aba', () => {
    const instagramLink = screen.getByTestId('footer-link-instagram')
    expect(instagramLink).toHaveAttribute('target', '_blank')
    expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('exibe o texto "GitHub"', () => {
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })

  it('exibe o texto "Instagram"', () => {
    expect(screen.getByText('Instagram')).toBeInTheDocument()
  })
})
