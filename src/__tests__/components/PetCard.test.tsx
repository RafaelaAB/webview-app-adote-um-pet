import { render, screen } from '@testing-library/react'
import PetCard from '@/components/PetCard/PetCard'
import { Pet } from '@/types'

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

jest.mock('next/image', () => {
  return function MockImage({ src, alt }: { src: string; alt: string }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} />
  }
})

const mockPet: Pet = {
  id: '1',
  name: 'Rex',
  category: 'Cachorro',
  breed: 'Labrador Retriever',
  age: '2 anos',
  gender: 'Macho',
  size: 'Grande',
  description: 'Um cão muito carinhoso.',
  image: 'https://example.com/rex.jpg',
  location: 'São Paulo, SP',
  status: 'Disponível',
  vaccinated: true,
  castrated: true,
}

describe('PetCard', () => {
  it('renderiza o card como link para /pets/1', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card')).toHaveAttribute('href', '/pets/1')
  })

  it('exibe o nome do pet', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card-name-1')).toHaveTextContent('Rex')
  })

  it('exibe a raça do pet', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card-breed-1')).toHaveTextContent('Labrador Retriever')
  })

  it('exibe a idade do pet', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card-age-1')).toHaveTextContent('2 anos')
  })

  it('exibe o sexo do pet', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card-gender-1')).toHaveTextContent('Macho')
  })

  it('exibe a localização do pet', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card-location-1')).toHaveTextContent('São Paulo, SP')
  })

  it('exibe o badge de categoria com emoji de cachorro', () => {
    render(<PetCard pet={mockPet} />)
    const badge = screen.getByTestId('pet-card-category-1')
    expect(badge).toHaveTextContent('🐶')
    expect(badge).toHaveTextContent('Cachorro')
  })

  it('exibe o badge de status "Disponível"', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card-status-1')).toHaveTextContent('Disponível')
  })

  it('aplica classe statusAvailable quando status é "Disponível"', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByTestId('pet-card-status-1')).toHaveClass('statusAvailable')
  })

  it('aplica classe statusPending quando status não é "Disponível"', () => {
    render(<PetCard pet={{ ...mockPet, status: 'Adotado' }} />)
    expect(screen.getByTestId('pet-card-status-1')).toHaveClass('statusPending')
  })

  it('renderiza a imagem com alt correto', () => {
    render(<PetCard pet={mockPet} />)
    expect(screen.getByAltText('Foto de Rex')).toBeInTheDocument()
  })

  it('exibe emoji correto para gato', () => {
    render(<PetCard pet={{ ...mockPet, id: '2', category: 'Gato' }} />)
    expect(screen.getByTestId('pet-card-category-2')).toHaveTextContent('🐱')
  })

  it('exibe emoji correto para ave', () => {
    render(<PetCard pet={{ ...mockPet, id: '3', category: 'Ave' }} />)
    expect(screen.getByTestId('pet-card-category-3')).toHaveTextContent('🐦')
  })

  it('exibe emoji correto para coelho', () => {
    render(<PetCard pet={{ ...mockPet, id: '4', category: 'Coelho' }} />)
    expect(screen.getByTestId('pet-card-category-4')).toHaveTextContent('🐰')
  })

  it('exibe emoji correto para Outro', () => {
    render(<PetCard pet={{ ...mockPet, id: '5', category: 'Outro' }} />)
    expect(screen.getByTestId('pet-card-category-5')).toHaveTextContent('🐾')
  })
})
