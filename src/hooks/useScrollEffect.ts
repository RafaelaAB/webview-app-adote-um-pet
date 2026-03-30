'use client'

/**
 * HOOK CUSTOMIZADO: useScrollEffect
 *
 * Detecta se o usuário rolou a página além de um determinado número de pixels.
 * É usado pelo Header para aplicar um estilo diferente (sombra, fundo sólido)
 * quando o usuário rola a página para baixo.
 *
 * Como funciona:
 *   1. useState guarda um booleano: "a página foi rolada além do threshold?"
 *   2. useEffect registra um listener no evento "scroll" do window
 *   3. A cada scroll, verifica se window.scrollY (posição vertical atual)
 *      é maior que o threshold
 *   4. Atualiza o estado com o resultado (true ou false)
 *   5. Quando o componente é desmontado, remove o listener (limpeza)
 *
 * Exemplo de uso:
 *   const isScrolled = useScrollEffect(10)
 *   → isScrolled é true se o usuário rolou mais de 10px para baixo
 */

import { useState, useEffect } from 'react'

/**
 * useScrollEffect — retorna true se a página foi rolada além do threshold.
 *
 * @param threshold — quantidade de pixels a rolar antes de ativar.
 *                    Valor padrão: 10px
 * @returns boolean — true se rolou além do threshold, false caso contrário
 */
export function useScrollEffect(threshold = 10) {
  // Estado que armazena se a página está ou não rolada além do threshold
  const [isScrolled, setIsScrolled] = useState(false)

  /**
   * useEffect registra e limpa o event listener de scroll.
   *
   * { passive: true } é uma otimização de performance: informa ao browser
   * que esse listener nunca vai chamar preventDefault(), permitindo que
   * o scroll seja processado de forma mais suave.
   *
   * O array [threshold] no segundo argumento significa "re-execute esse
   * efeito apenas quando o valor de threshold mudar".
   *
   * O return (função de limpeza) remove o listener quando o componente
   * for desmontado — evita memory leak e comportamento inesperado.
   */
  useEffect(() => {
    // Função que verifica a posição atual do scroll e atualiza o estado
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    // Registra o listener: handleScroll será chamado a cada evento de scroll
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Limpeza: remove o listener quando o componente sair da tela
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
