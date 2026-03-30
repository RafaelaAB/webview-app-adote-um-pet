import { render, screen, waitFor, act } from '@testing-library/react'
import { PetProvider, usePetContext } from '@/context/PetContext'
import { petsData } from '@/data/pets'

// Componente auxiliar para expor o contexto na tela e facilitar os asserts
function ContextConsumer() {
  const { pets, loading, getPetById, filterPets } = usePetContext()
  const dog = getPetById('1')
  const dogs = filterPets('Cachorro')
  const all = filterPets()

  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="count">{pets.length}</span>
      <span data-testid="pet-name">{dog?.name ?? 'not-found'}</span>
      <span data-testid="not-found">{getPetById('999')?.name ?? 'not-found'}</span>
      <span data-testid="dogs-count">{dogs.length}</span>
      <span data-testid="all-count">{all.length}</span>
    </div>
  )
}

describe('PetProvider', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renderiza os filhos corretamente', () => {
    render(
      <PetProvider>
        <span data-testid="child">filho</span>
      </PetProvider>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('inicia com loading=true e lista vazia', () => {
    render(
      <PetProvider>
        <ContextConsumer />
      </PetProvider>
    )
    expect(screen.getByTestId('loading')).toHaveTextContent('true')
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('após 500ms carrega os pets e loading vira false', async () => {
    render(
      <PetProvider>
        <ContextConsumer />
      </PetProvider>
    )

    act(() => {
      jest.advanceTimersByTime(500)
    })

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })
    expect(screen.getByTestId('count')).toHaveTextContent(String(petsData.length))
  })

  it('getPetById retorna o pet correto pelo id', async () => {
    render(
      <PetProvider>
        <ContextConsumer />
      </PetProvider>
    )

    act(() => { jest.advanceTimersByTime(500) })

    await waitFor(() => {
      expect(screen.getByTestId('pet-name')).toHaveTextContent('Rex')
    })
  })

  it('getPetById retorna undefined para id inexistente', async () => {
    render(
      <PetProvider>
        <ContextConsumer />
      </PetProvider>
    )

    act(() => { jest.advanceTimersByTime(500) })

    await waitFor(() => {
      expect(screen.getByTestId('not-found')).toHaveTextContent('not-found')
    })
  })

  it('filterPets filtra apenas cachorros', async () => {
    render(
      <PetProvider>
        <ContextConsumer />
      </PetProvider>
    )

    act(() => { jest.advanceTimersByTime(500) })

    await waitFor(() => {
      const dogsInData = petsData.filter((p) => p.category === 'Cachorro').length
      expect(screen.getByTestId('dogs-count')).toHaveTextContent(String(dogsInData))
    })
  })

  it('filterPets sem categoria retorna todos os pets', async () => {
    render(
      <PetProvider>
        <ContextConsumer />
      </PetProvider>
    )

    act(() => { jest.advanceTimersByTime(500) })

    await waitFor(() => {
      expect(screen.getByTestId('all-count')).toHaveTextContent(String(petsData.length))
    })
  })

  it('cancela o timer ao desmontar o componente', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout')
    const { unmount } = render(
      <PetProvider>
        <span />
      </PetProvider>
    )
    unmount()
    expect(clearTimeoutSpy).toHaveBeenCalled()
  })
})

describe('usePetContext fora do Provider', () => {
  it('lança erro quando usado fora do PetProvider', () => {
    // Suprime o console.error do React durante o teste de erro esperado
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {})

    function BrokenComponent() {
      usePetContext()
      return null
    }

    expect(() => render(<BrokenComponent />)).toThrow(
      'usePetContext deve ser usado dentro de PetProvider'
    )

    spy.mockRestore()
  })
})
