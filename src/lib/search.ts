/**
 * BUSCA GLOBAL — adote-um-pet
 *
 * Centraliza a lógica de busca em todos os conteúdos do site:
 *   - Pets (nome, raça, categoria, localização, descrição)
 *   - ONGs (nome, cidade, descrição, formas de ajudar)
 *   - Páginas estáticas (título, palavras-chave)
 */

import { Pet } from '@/types'
import { Ong } from '@/data/ongs'

// ── Tipos de resultado ───────────────────────────────────────────────────────

export interface PetResult {
  type: 'pet'
  id: string
  title: string
  subtitle: string
  href: string
  image: string
  badge: string
}

export interface OngResult {
  type: 'ong'
  id: string
  title: string
  subtitle: string
  href: string
}

export interface PageResult {
  type: 'page'
  id: string
  title: string
  subtitle: string
  href: string
  keywords: string[]
}

export type SearchResult = PetResult | OngResult | PageResult

// ── Páginas estáticas indexadas ─────────────────────────────────────────────

const STATIC_PAGES: PageResult[] = [
  {
    type: 'page',
    id: 'home',
    title: 'Página Inicial',
    subtitle: 'Adote um pet e transforme duas vidas',
    href: '/',
    keywords: ['home', 'início', 'adoção', 'adote', 'pet', 'animal'],
  },
  {
    type: 'page',
    id: 'pets',
    title: 'Todos os Pets',
    subtitle: 'Listagem completa de pets disponíveis para adoção',
    href: '/pets',
    keywords: ['pets', 'listagem', 'todos', 'animais', 'adotar', 'disponível'],
  },
  {
    type: 'page',
    id: 'cadastrar',
    title: 'Cadastrar um Pet',
    subtitle: 'Registre um pet que precisa de um novo lar',
    href: '/cadastrar',
    keywords: ['cadastrar', 'registrar', 'cadastro', 'novo pet', 'ajudar', 'incluir'],
  },
  {
    type: 'page',
    id: 'ongs',
    title: 'ONGs Parceiras',
    subtitle: 'Conheça as organizações que cuidam dos animais',
    href: '/ongs',
    keywords: ['ong', 'organização', 'parceiros', 'doação', 'voluntário', 'resgate', 'ajudar'],
  },
  {
    type: 'page',
    id: 'campanhas-adocao',
    title: 'Campanhas de Adoção',
    subtitle: 'Eventos de adoção de pets na sua cidade',
    href: '/eventos/campanhas-adocao',
    keywords: ['campanha', 'adoção', 'evento', 'cidade', 'feira'],
  },
  {
    type: 'page',
    id: 'campanhas-vacinacao',
    title: 'Campanhas de Vacinação',
    subtitle: 'Vacinação gratuita para seu pet',
    href: '/eventos/campanhas-vacinacao',
    keywords: ['vacinação', 'vacina', 'campanha', 'saúde', 'gratuita'],
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_EMOJI: Record<string, string> = {
  Cachorro: '🐶',
  Gato: '🐱',
  Ave: '🐦',
  Coelho: '🐰',
  Outro: '✨',
}

function matches(fields: string[], query: string): boolean {
  const q = query.toLowerCase().trim()
  return fields.some((f) => f.toLowerCase().includes(q))
}

// ── Funções de busca por tipo ────────────────────────────────────────────────

export function searchPets(pets: Pet[], query: string): PetResult[] {
  if (!query.trim()) return []
  return pets
    .filter((pet) =>
      matches([pet.name, pet.breed, pet.category, pet.location, pet.description], query)
    )
    .map((pet) => ({
      type: 'pet',
      id: pet.id,
      title: pet.name,
      subtitle: `${pet.breed} · ${pet.age} · ${pet.location}`,
      href: `/pets/${pet.id}`,
      image: pet.image,
      badge: `${CATEGORY_EMOJI[pet.category] ?? '🐾'} ${pet.category}`,
    }))
}

export function searchOngs(ongs: Ong[], query: string): OngResult[] {
  if (!query.trim()) return []
  return ongs
    .filter((ong) =>
      matches(
        [ong.name, ong.city, ong.description, ong.address, ...ong.howToHelp],
        query
      )
    )
    .map((ong) => ({
      type: 'ong',
      id: ong.id,
      title: ong.name,
      subtitle: ong.city,
      href: '/ongs',
    }))
}

export function searchPages(query: string): PageResult[] {
  if (!query.trim()) return []
  return STATIC_PAGES.filter((page) =>
    matches([page.title, page.subtitle, ...page.keywords], query)
  )
}

// ── Busca unificada ──────────────────────────────────────────────────────────

export interface GlobalSearchResults {
  pets: PetResult[]
  ongs: OngResult[]
  pages: PageResult[]
  total: number
}

export function globalSearch(
  pets: Pet[],
  ongs: Ong[],
  query: string
): GlobalSearchResults {
  const petResults = searchPets(pets, query)
  const ongResults = searchOngs(ongs, query)
  const pageResults = searchPages(query)
  return {
    pets: petResults,
    ongs: ongResults,
    pages: pageResults,
    total: petResults.length + ongResults.length + pageResults.length,
  }
}
