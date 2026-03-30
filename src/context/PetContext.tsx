'use client'

/**
 * CONTEXTO GLOBAL DE PETS (PetContext)
 *
 * O que é Contexto (Context API)?
 * ─────────────────────────────────
 * Em React, normalmente você passa dados de um componente pai para um filho
 * via "props". Mas quando muitos componentes diferentes precisam dos mesmos
 * dados (ex: a lista de pets), fica impraticável ficar passando props para
 * todo lado. O Context resolve isso: você coloca os dados em um "contexto
 * global" e qualquer componente da árvore pode acessar diretamente.
 *
 * O que são Hooks?
 * ─────────────────
 * Hooks são funções especiais do React que permitem usar recursos do React
 * (como estado e efeitos) dentro de componentes funcionais. Todos começam
 * com "use". Exemplos:
 *   - useState   → armazena um valor que pode mudar (ex: lista de pets)
 *   - useEffect  → executa código em resposta a eventos do ciclo de vida
 *                  do componente (ex: ao montar a tela, buscar os dados)
 *   - useContext → lê o valor de um contexto criado com createContext
 *
 * Este arquivo faz 3 coisas:
 *   1. Cria o contexto (createContext)
 *   2. Cria o Provider — o componente que envolve a app e fornece os dados
 *   3. Cria o hook usePetContext — para os componentes lerem os dados
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Pet, PetCategory, PetContextType } from '@/types'
import { petsData } from '@/data/pets'

/**
 * createContext cria um "contêiner" vazio para os dados.
 * O valor inicial é null porque o Provider ainda não foi montado.
 * O tipo genérico <PetContextType | null> garante que o TypeScript
 * sabe o que vai estar disponível quando o contexto for preenchido.
 */
const PetContext = createContext<PetContextType | null>(null)

/**
 * PetProvider — componente que envolve toda a aplicação (veja layout.tsx).
 *
 * Ele é responsável por:
 *   - Guardar a lista de pets no estado
 *   - Simular o carregamento assíncrono (como se fosse uma chamada de API)
 *   - Disponibilizar os dados e funções para todos os componentes filhos
 *
 * @param children — todos os componentes que estão dentro do Provider
 *                   (ou seja, toda a aplicação)
 */
export function PetProvider({ children }: { children: ReactNode }) {
  // useState cria uma variável de estado.
  // pets começa como array vazio; loading começa como true (carregando)
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * useEffect executa o código dentro dele após o componente ser montado na tela.
   * O array vazio [] no segundo argumento significa "execute apenas uma vez,
   * quando o componente for criado" — equivalente ao "componentDidMount" de classes.
   *
   * Aqui simulamos uma chamada assíncrona (API/banco de dados) com um setTimeout
   * de 500ms. Em um app real, aqui teríamos um fetch() para um servidor.
   *
   * O return dentro do useEffect é a função de "limpeza": cancela o timer
   * caso o componente seja desmontado antes dos 500ms acabarem (evita memory leak).
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setPets(petsData)   // preenche a lista com os dados mock
      setLoading(false)   // indica que o carregamento terminou
    }, 500)

    return () => clearTimeout(timer) // limpeza: cancela o timer se necessário
  }, [])

  /**
   * getPetById — busca um único pet pelo seu id.
   * Usa Array.find() que percorre a lista e retorna o primeiro item
   * cujo id seja igual ao id buscado. Retorna undefined se não encontrar.
   *
   * @param id — o id do pet (ex: "1", "3")
   * @returns o objeto Pet encontrado ou undefined
   */
  const getPetById = (id: string): Pet | undefined => {
    return pets.find((pet) => pet.id === id)
  }

  /**
   * filterPets — retorna a lista de pets filtrada por categoria.
   * Se nenhuma categoria for passada (undefined), retorna todos os pets.
   *
   * @param category — categoria opcional para filtrar (ex: "Cachorro", "Gato")
   * @returns array de pets que correspondem à categoria
   */
  const filterPets = (category?: PetCategory): Pet[] => {
    if (!category) return pets
    return pets.filter((pet) => pet.category === category)
  }

  /**
   * O Provider envolve os filhos e disponibiliza os dados via "value".
   * Qualquer componente dentro dele pode chamar useContext(PetContext)
   * para acessar: pets, loading, getPetById e filterPets.
   */
  return (
    <PetContext.Provider value={{ pets, loading, getPetById, filterPets }}>
      {children}
    </PetContext.Provider>
  )
}

/**
 * usePetContext — hook customizado para consumir o contexto.
 *
 * Em vez de cada componente chamar useContext(PetContext) diretamente,
 * esse hook centraliza o acesso e adiciona uma verificação de segurança:
 * se alguém tentar usar fora do PetProvider, lança um erro claro.
 *
 * @returns o valor do contexto: { pets, loading, getPetById, filterPets }
 */
export function usePetContext(): PetContextType {
  const context = useContext(PetContext)
  if (!context) {
    // Erro preventivo: garante que o contexto sempre seja usado corretamente
    throw new Error('usePetContext deve ser usado dentro de PetProvider')
  }
  return context
}
