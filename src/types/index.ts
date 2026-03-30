/**
 * TIPOS E INTERFACES DO PROJETO
 *
 * TypeScript usa "tipos" para definir o formato dos dados que vão circular
 * pelo sistema. Isso evita erros, pois o editor avisa quando você tenta
 * passar um valor errado para uma função ou componente.
 *
 * - `type` define um alias para um valor específico (como uma lista de opções fixas)
 * - `interface` define a estrutura de um objeto (quais campos ele tem e de que tipo são)
 */

// Categorias possíveis de um pet — só esses valores são aceitos
export type PetCategory = 'Cachorro' | 'Gato' | 'Ave' | 'Coelho' | 'Outro'

// Sexo do pet
export type PetGender = 'Macho' | 'Fêmea'

// Status de adoção do pet
export type PetStatus = 'Disponível' | 'Adotado' | 'Pendente'

// Porte físico do pet
export type PetSize = 'Pequeno' | 'Médio' | 'Grande'

/**
 * Interface Pet — define todos os campos que um pet deve ter.
 * Todos os objetos de pet no projeto seguem esse contrato.
 */
export interface Pet {
  id: string           // identificador único (ex: "1", "2")
  name: string         // nome do pet
  category: PetCategory
  breed: string        // raça
  age: string          // idade em texto (ex: "2 anos")
  gender: PetGender
  size: PetSize
  description: string  // texto descritivo sobre o pet
  image: string        // URL da foto
  location: string     // cidade/estado onde está
  status: PetStatus
  vaccinated: boolean  // true = vacinado, false = não vacinado
  castrated: boolean   // true = castrado, false = não castrado
}

/**
 * Interface PetContextType — define o que o Contexto global vai disponibilizar
 * para todos os componentes da aplicação.
 *
 * Qualquer componente que chamar usePetContext() receberá exatamente isso.
 */
export interface PetContextType {
  pets: Pet[]                                      // lista completa de pets
  loading: boolean                                 // true enquanto os dados estão carregando
  getPetById: (id: string) => Pet | undefined      // busca um pet pelo id
  filterPets: (category?: PetCategory) => Pet[]   // filtra pets por categoria
}
