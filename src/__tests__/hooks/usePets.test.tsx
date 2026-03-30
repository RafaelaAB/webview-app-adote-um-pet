import { renderHook, act } from '@testing-library/react'
import { usePets } from '@/hooks/usePets'
import { PetProvider } from '@/context/PetContext'
import { petsData } from '@/data/pets'
import React from 'react'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PetProvider>{children}</PetProvider>
)

describe('usePets', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('retorna loading=true antes dos dados carregarem', () => {
    const { result } = renderHook(() => usePets(), { wrapper })
    expect(result.current.loading).toBe(true)
  })

  it('retorna todos os pets após carregar (sem categoria)', async () => {
    const { result } = renderHook(() => usePets(), { wrapper })

    act(() => { jest.advanceTimersByTime(500) })

    await act(async () => {})

    expect(result.current.loading).toBe(false)
    expect(result.current.pets).toHaveLength(petsData.length)
    expect(result.current.total).toBe(petsData.length)
  })

  it('allPets retorna todos os pets independente do filtro', async () => {
    const { result } = renderHook(() => usePets('Cachorro'), { wrapper })

    act(() => { jest.advanceTimersByTime(500) })
    await act(async () => {})

    expect(result.current.allPets).toHaveLength(petsData.length)
  })

  it('filtra corretamente por categoria Cachorro', async () => {
    const { result } = renderHook(() => usePets('Cachorro'), { wrapper })

    act(() => { jest.advanceTimersByTime(500) })
    await act(async () => {})

    const expectedCount = petsData.filter((p) => p.category === 'Cachorro').length
    expect(result.current.pets).toHaveLength(expectedCount)
    expect(result.current.total).toBe(expectedCount)
    result.current.pets.forEach((pet) => {
      expect(pet.category).toBe('Cachorro')
    })
  })

  it('filtra corretamente por categoria Gato', async () => {
    const { result } = renderHook(() => usePets('Gato'), { wrapper })

    act(() => { jest.advanceTimersByTime(500) })
    await act(async () => {})

    const expectedCount = petsData.filter((p) => p.category === 'Gato').length
    expect(result.current.pets).toHaveLength(expectedCount)
    result.current.pets.forEach((pet) => {
      expect(pet.category).toBe('Gato')
    })
  })

  it('retorna lista vazia para categoria sem pets', async () => {
    const { result } = renderHook(() => usePets('Outro'), { wrapper })

    act(() => { jest.advanceTimersByTime(500) })
    await act(async () => {})

    const expectedCount = petsData.filter((p) => p.category === 'Outro').length
    expect(result.current.pets).toHaveLength(expectedCount)
    expect(result.current.total).toBe(expectedCount)
  })
})
