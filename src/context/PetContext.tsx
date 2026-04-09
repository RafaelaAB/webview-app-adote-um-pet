'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Pet, PetCategory, PetContextType } from '@/types'
import { petsData } from '@/data/pets'
import { createLogger } from '@/lib/logger'

const log = createLogger('PetContext')

const PetContext = createContext<PetContextType | null>(null)

export function PetProvider({ children }: { children: ReactNode }) {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    log.info('iniciando carregamento dos pets')

    const timer = setTimeout(() => {
      setPets(petsData)
      setLoading(false)
      log.info('pets carregados com sucesso', { total: petsData.length })
    }, 500)

    return () => {
      clearTimeout(timer)
      log.debug('timer de carregamento cancelado (componente desmontado)')
    }
  }, [])

  const getPetById = (id: string): Pet | undefined => {
    const pet = pets.find((pet) => pet.id === id)
    if (!pet) {
      log.warn('pet não encontrado', { id })
    }
    return pet
  }

  const filterPets = (category?: PetCategory): Pet[] => {
    if (!category) return pets
    const result = pets.filter((pet) => pet.category === category)
    log.debug('filtro aplicado', { category, resultados: result.length })
    return result
  }

  return (
    <PetContext.Provider value={{ pets, loading, getPetById, filterPets }}>
      {children}
    </PetContext.Provider>
  )
}

export function usePetContext(): PetContextType {
  const context = useContext(PetContext)
  if (!context) {
    log.error('usePetContext usado fora do PetProvider')
    throw new Error('usePetContext deve ser usado dentro de PetProvider')
  }
  return context
}
