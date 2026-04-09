import { usePetContext } from '@/context/PetContext'
import { ongs } from '@/data/ongs'
import { globalSearch } from '@/lib/search'

export function useGlobalSearch(query: string) {
  const { pets } = usePetContext()

  const { pets: petResults, ongs: ongResults, pages: pageResults, total } =
    globalSearch(pets, ongs, query)

  return {

    petResults,

    ongResults,

    pageResults,

    total,
  }
}
