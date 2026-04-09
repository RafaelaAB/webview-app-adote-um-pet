export type PetCategory = 'Cachorro' | 'Gato' | 'Ave' | 'Coelho' | 'Outro'

export type PetGender = 'Macho' | 'Fêmea'

export type PetStatus = 'Disponível' | 'Adotado' | 'Pendente'

export type PetSize = 'Pequeno' | 'Médio' | 'Grande'

export type DonorType = 'ong' | 'tutor'

export interface PetContact {
  type: DonorType
  name: string
  address: string
  city: string
  phone: string
  email?: string
  openingHours?: string
}

export interface Pet {
  id: string
  name: string
  category: PetCategory
  breed: string
  age: string
  gender: PetGender
  size: PetSize
  description: string
  image: string
  location: string
  status: PetStatus
  vaccinated: boolean
  castrated: boolean
  contact: PetContact
}

export interface PetContextType {
  pets: Pet[]
  loading: boolean
  getPetById: (id: string) => Pet | undefined
  filterPets: (category?: PetCategory) => Pet[]
}
