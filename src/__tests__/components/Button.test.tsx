import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/Button/Button'

// next/link é um componente complexo — mockamos como <a> simples para testes unitários
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

describe('Button — versão <button>', () => {
  it('renderiza o texto filho', () => {
    render(<Button>Clique aqui</Button>)
    expect(screen.getByText('Clique aqui')).toBeInTheDocument()
  })

  it('aplica a classe da variante primary por padrão', () => {
    render(<Button>Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('primary')
  })

  it('aplica a variante outline', () => {
    render(<Button variant="outline">Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('outline')
  })

  it('aplica a variante secondary', () => {
    render(<Button variant="secondary">Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('secondary')
  })

  it('aplica a variante ghost', () => {
    render(<Button variant="ghost">Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('ghost')
  })

  it('aplica o tamanho md por padrão', () => {
    render(<Button>Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('md')
  })

  it('aplica o tamanho sm', () => {
    render(<Button size="sm">Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('sm')
  })

  it('aplica o tamanho lg', () => {
    render(<Button size="lg">Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('lg')
  })

  it('aplica fullWidth quando a prop é true', () => {
    render(<Button fullWidth>Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('fullWidth')
  })

  it('não aplica fullWidth por padrão', () => {
    render(<Button>Texto</Button>)
    expect(screen.getByRole('button')).not.toHaveClass('fullWidth')
  })

  it('usa type="button" por padrão', () => {
    render(<Button>Texto</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('usa type="submit" quando especificado', () => {
    render(<Button type="submit">Enviar</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('chama onClick ao clicar', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Clique</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('fica desabilitado quando disabled=true', () => {
    render(<Button disabled>Desabilitado</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('aplica className customizada', () => {
    render(<Button className="minha-classe">Texto</Button>)
    expect(screen.getByRole('button')).toHaveClass('minha-classe')
  })

  it('aplica data-testid quando fornecido', () => {
    render(<Button data-testid="meu-botao">Texto</Button>)
    expect(screen.getByTestId('meu-botao')).toBeInTheDocument()
  })
})

describe('Button — versão <link>', () => {
  it('renderiza um elemento <a> quando as="link"', () => {
    render(<Button as="link" href="/pets">Ver pets</Button>)
    expect(screen.getByRole('link')).toBeInTheDocument()
  })

  it('aponta para o href correto', () => {
    render(<Button as="link" href="/cadastrar">Cadastrar</Button>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/cadastrar')
  })

  it('exibe o texto filho no link', () => {
    render(<Button as="link" href="/pets">Adotar agora</Button>)
    expect(screen.getByText('Adotar agora')).toBeInTheDocument()
  })

  it('aplica variante e tamanho no link', () => {
    render(<Button as="link" href="/pets" variant="outline" size="lg">Ver todos</Button>)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('outline')
    expect(link).toHaveClass('lg')
  })

  it('aplica data-testid no link quando fornecido', () => {
    render(<Button as="link" href="/pets" data-testid="link-pets">Ver pets</Button>)
    expect(screen.getByTestId('link-pets')).toBeInTheDocument()
  })
})
