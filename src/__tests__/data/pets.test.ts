import { petsData } from '@/data/pets'

describe('petsData', () => {
  it('contém 28 pets', () => {
    expect(petsData).toHaveLength(28)
  })

  it('todos os pets possuem os campos obrigatórios', () => {
    petsData.forEach((pet) => {
      expect(pet.id).toBeTruthy()
      expect(pet.name).toBeTruthy()
      expect(pet.category).toBeTruthy()
      expect(pet.breed).toBeTruthy()
      expect(pet.age).toBeTruthy()
      expect(pet.gender).toBeTruthy()
      expect(pet.size).toBeTruthy()
      expect(pet.description).toBeTruthy()
      expect(pet.image).toBeTruthy()
      expect(pet.location).toBeTruthy()
      expect(pet.status).toBeTruthy()
      expect(typeof pet.vaccinated).toBe('boolean')
      expect(typeof pet.castrated).toBe('boolean')
    })
  })

  it('todos os ids são únicos', () => {
    const ids = petsData.map((p) => p.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(petsData.length)
  })

  it('categorias são valores válidos', () => {
    const validCategories = ['Cachorro', 'Gato', 'Ave', 'Coelho', 'Outro']
    petsData.forEach((pet) => {
      expect(validCategories).toContain(pet.category)
    })
  })

  it('status são valores válidos', () => {
    const validStatus = ['Disponível', 'Adotado', 'Pendente']
    petsData.forEach((pet) => {
      expect(validStatus).toContain(pet.status)
    })
  })

  it('gêneros são valores válidos', () => {
    const validGenders = ['Macho', 'Fêmea']
    petsData.forEach((pet) => {
      expect(validGenders).toContain(pet.gender)
    })
  })

  it('portes são valores válidos', () => {
    const validSizes = ['Pequeno', 'Médio', 'Grande']
    petsData.forEach((pet) => {
      expect(validSizes).toContain(pet.size)
    })
  })

  it('imagens são URLs válidas', () => {
    petsData.forEach((pet) => {
      expect(pet.image).toMatch(/^https?:\/\
    })
  })

  it('contém cachorros, gatos e outros animais', () => {
    const categories = petsData.map((p) => p.category)
    expect(categories).toContain('Cachorro')
    expect(categories).toContain('Gato')
    expect(categories).toContain('Ave')
    expect(categories).toContain('Coelho')
  })
})
