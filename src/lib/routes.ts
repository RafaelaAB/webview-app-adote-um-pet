export const ROUTES = {

  HOME: '/',

  PETS: '/pets',

  PET_DETAIL: (id: string | number) => `/pets/${id}`,

  ADOPT: (id: string | number) => `/adotar/${id}`,

  REGISTER: '/cadastrar',

  SEARCH: (q?: string) =>
    q ? `/busca?q=${encodeURIComponent(q)}` : '/busca',

  ONGS: '/ongs',

  EVENTOS: {

    CAMPANHAS_ADOCAO: '/eventos/campanhas-adocao',

    CAMPANHAS_VACINACAO: '/eventos/campanhas-vacinacao',
  },
} as const
