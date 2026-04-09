/**
 * useGlobalSearch — hook de busca global
 * ────────────────────────────────────────────────────────────────────────────
 *
 * Por que este hook existe?
 * ──────────────────────────
 * Antes deste hook, duas partes diferentes da aplicação faziam a mesma
 * chamada de busca de formas independentes:
 *
 *   SearchModal.tsx:
 *     const { pets } = usePetContext()
 *     const { pets: petResults, ... } = globalSearch(pets, ongs, query)
 *
 *   BuscaPage (busca/page.tsx):
 *     const { pets } = usePetContext()
 *     const { pets: petResults, ... } = globalSearch(pets, ongs, query)
 *
 * Código duplicado = dois problemas:
 *   1. Se a lógica de busca mudar, precisa mudar em dois lugares.
 *   2. Ambos os arquivos precisam importar usePetContext e ongs diretamente.
 *
 * Este hook encapsula tudo isso, expondo apenas a interface simples:
 *   const { petResults, ongResults, pageResults, total } = useGlobalSearch(query)
 *
 * Fluxo interno:
 * ──────────────
 *   1. Obtém a lista de pets via usePetContext() (dados em memória)
 *   2. Importa as ONGs diretamente de src/data/ongs.ts (dados estáticos)
 *   3. Chama globalSearch() que cruza pets + ongs + páginas estáticas
 *   4. Retorna os resultados agrupados por tipo
 *
 * Por que ongs é importado aqui e não via Context?
 * ─────────────────────────────────────────────────
 * Os dados de pets mudam (simulam uma API com loading), por isso estão
 * em um Context com estado. Os dados de ONGs são estáticos (não mudam
 * durante a sessão), então a importação direta é suficiente.
 *
 * Onde é usado:
 *   - src/components/SearchModal/SearchModal.tsx → preview em tempo real
 *   - src/app/busca/page.tsx                     → página completa de resultados
 *
 * @param query Termo digitado pelo usuário. String vazia retorna resultados vazios.
 */

import { usePetContext } from '@/context/PetContext'
import { ongs } from '@/data/ongs'
import { globalSearch } from '@/lib/search'

export function useGlobalSearch(query: string) {
  // Acessa a lista de pets carregada pelo PetProvider
  const { pets } = usePetContext()

  // globalSearch cruza pets, ongs e páginas estáticas com o termo pesquisado
  const { pets: petResults, ongs: ongResults, pages: pageResults, total } =
    globalSearch(pets, ongs, query)

  return {
    /** Pets que correspondem ao termo de busca */
    petResults,
    /** ONGs que correspondem ao termo de busca */
    ongResults,
    /** Páginas estáticas do site que correspondem ao termo */
    pageResults,
    /** Total combinado de resultados nos três grupos */
    total,
  }
}
