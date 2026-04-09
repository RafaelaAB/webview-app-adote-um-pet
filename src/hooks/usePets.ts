'use client'

import { usePetContext } from '@/context/PetContext'
import { PetCategory } from '@/types'

export function usePets(category?: PetCategory) {
  const { pets, loading, filterPets } = usePetContext()

  const filteredPets = filterPets(category)

  return {
    pets: filteredPets,
    allPets: pets,
    loading,
    total: filteredPets.length,
  }
}
