/**
 * ROTAS DA APLICAÇÃO — equivalente ao app-routing.module.ts do Angular
 * ────────────────────────────────────────────────────────────────────────────
 *
 * O que é o app-routing.module.ts no Angular?
 * ─────────────────────────────────────────────
 * No Angular, o RouterModule.forRoot(routes) recebe um array de objetos
 * que mapeiam caminhos de URL para componentes:
 *
 *   const routes: Routes = [
 *     { path: '',         component: HomeComponent },
 *     { path: 'pets',     component: PetsComponent },
 *     { path: 'pets/:id', component: PetDetailComponent },
 *   ]
 *
 * Qual é o equivalente no Next.js?
 * ──────────────────────────────────
 * No Next.js com App Router, as rotas são definidas pela ESTRUTURA DE PASTAS:
 *
 *   src/app/page.tsx           → /
 *   src/app/pets/page.tsx      → /pets
 *   src/app/pets/[id]/page.tsx → /pets/123   ([id] é parâmetro dinâmico)
 *
 * Não existe um arquivo central de rotas — o Next.js lê as pastas
 * automaticamente. Mas isso significa que as strings de URL ficam
 * espalhadas por todo o código:
 *
 *   <Link href="/pets">          ← em Header.tsx
 *   router.push('/pets/5')       ← em PetCard.tsx
 *   href={`/adotar/${pet.id}`}   ← em PetDetail.tsx
 *
 * O problema: se a rota mudar (ex: /pets → /animais), precisamos buscar
 * e substituir em TODOS os arquivos. É fácil esquecer algum.
 *
 * A solução deste arquivo:
 * ─────────────────────────
 * Centralizar todas as strings de rota em constantes tipadas.
 * Agora toda mudança de URL é feita em um único lugar.
 *
 *   // ❌ Antes (string literal espalhada)
 *   <Link href="/pets">
 *   router.push(`/pets/${id}`)
 *   router.push(`/busca?q=${query}`)
 *
 *   // ✅ Depois (constante centralizada)
 *   <Link href={ROUTES.PETS}>
 *   router.push(ROUTES.PET_DETAIL(id))
 *   router.push(ROUTES.SEARCH(query))
 *
 * O `as const` no final garante que o TypeScript trate os valores como
 * literais fixos (não strings genéricas), ativando autocomplete e
 * checagem de tipos mais precisa.
 */

export const ROUTES = {
  /** Página inicial — hero, pets em destaque, estatísticas */
  HOME: '/',

  /** Listagem completa de pets com filtro por categoria e paginação */
  PETS: '/pets',

  /**
   * Detalhes de um pet específico.
   * @param id — identificador do pet (string ou número)
   * @example ROUTES.PET_DETAIL('5') → '/pets/5'
   */
  PET_DETAIL: (id: string | number) => `/pets/${id}`,

  /**
   * Página de adoção de um pet específico.
   * Exibe passo a passo, requisitos e card de contato do responsável.
   * @param id — identificador do pet
   * @example ROUTES.ADOPT('5') → '/adotar/5'
   */
  ADOPT: (id: string | number) => `/adotar/${id}`,

  /** Formulário de cadastro de novo pet */
  REGISTER: '/cadastrar',

  /**
   * Página de resultados de busca global.
   * Sem query retorna a URL base; com query codifica o parâmetro.
   * @param q — termo de busca (opcional)
   * @example ROUTES.SEARCH('labrador') → '/busca?q=labrador'
   * @example ROUTES.SEARCH()           → '/busca'
   */
  SEARCH: (q?: string) =>
    q ? `/busca?q=${encodeURIComponent(q)}` : '/busca',

  /** Listagem de ONGs parceiras com informações de contato e doação */
  ONGS: '/ongs',

  /** Sub-rotas da seção de Eventos */
  EVENTOS: {
    /** Campanhas de adoção em cidades parceiras */
    CAMPANHAS_ADOCAO: '/eventos/campanhas-adocao',
    /** Campanhas de vacinação periódicas */
    CAMPANHAS_VACINACAO: '/eventos/campanhas-vacinacao',
  },
} as const
