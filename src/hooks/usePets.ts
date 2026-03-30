'use client'

/**
 * HOOK CUSTOMIZADO: usePets
 *
 * O que é um Hook Customizado?
 * ─────────────────────────────
 * Um hook customizado é uma função JavaScript que começa com "use" e
 * pode chamar outros hooks do React internamente. Ele serve para
 * reutilizar lógica entre componentes sem precisar copiar código.
 *
 * Por que criar esse hook se já existe usePetContext?
 * ────────────────────────────────────────────────────
 * O usePets é uma camada de conveniência. Em vez de cada componente
 * chamar usePetContext() e depois chamar filterPets() manualmente,
 * esse hook já faz tudo junto e entrega o resultado pronto.
 *
 * Exemplo de uso em um componente:
 *   const { pets, loading, total } = usePets('Cachorro')
 *   → retorna apenas os cachorros disponíveis
 *
 *   const { pets, loading } = usePets()
 *   → retorna todos os pets
 */

import { usePetContext } from '@/context/PetContext'
import { PetCategory } from '@/types'

/**
 * usePets — hook que retorna pets opcionalmente filtrados por categoria.
 *
 * @param category — categoria para filtrar (ex: 'Cachorro', 'Gato').
 *                   Se omitida, retorna todos os pets.
 * @returns objeto com:
 *   - pets: lista de pets filtrados pela categoria informada
 *   - allPets: lista completa de todos os pets (sem filtro)
 *   - loading: true enquanto os dados estão carregando
 *   - total: quantidade de pets no resultado filtrado
 */
export function usePets(category?: PetCategory) {
  // Acessa os dados globais e a função de filtro via contexto
  const { pets, loading, filterPets } = usePetContext()

  // Aplica o filtro de categoria (ou retorna tudo se category for undefined)
  const filteredPets = filterPets(category)

  return {
    pets: filteredPets,   // pets filtrados (ou todos, se sem categoria)
    allPets: pets,        // todos os pets sem nenhum filtro
    loading,              // estado de carregamento
    total: filteredPets.length, // número de pets no resultado
  }
}
