describe('Página de detalhe do pet — /pets/[id]', () => {
  // ── Pet existente (id=1) ───────────────────────────────────────────────────
  describe('Pet existente', () => {
    beforeEach(() => {
      cy.visit('/pets/1')
    })

    it('exibe o nome do pet', () => {
      cy.get('[data-testid="pet-detail-name"]', { timeout: 6000 }).should('be.visible')
    })

    it('exibe a raça do pet', () => {
      cy.get('[data-testid="pet-detail-breed"]').should('be.visible')
    })

    it('exibe a categoria do pet', () => {
      cy.get('[data-testid="pet-detail-category"]').should('be.visible')
    })

    it('exibe a localização do pet', () => {
      cy.get('[data-testid="pet-detail-location"]').should('be.visible')
    })

    it('exibe o status do pet', () => {
      cy.get('[data-testid="pet-detail-status"]').should('be.visible')
    })

    it('exibe as informações de saúde (vacinado e castrado)', () => {
      cy.get('[data-testid="pet-detail-health-vaccinated"]').should('be.visible')
      cy.get('[data-testid="pet-detail-health-castrated"]').should('be.visible')
    })

    it('exibe o botão de adoção', () => {
      cy.get('[data-testid="pet-detail-btn-adopt"]').should('be.visible')
    })

    it('navega para /cadastrar ao clicar no botão de adoção', () => {
      cy.get('[data-testid="pet-detail-btn-adopt"]').click()
      cy.url().should('include', '/cadastrar')
    })

    it('exibe o botão de favoritar', () => {
      cy.get('[data-testid="pet-detail-btn-favorite"]').should('be.visible')
    })
  })

  // ── Pet inexistente ────────────────────────────────────────────────────────
  describe('Pet não encontrado', () => {
    it('exibe mensagem de "Pet não encontrado" para ID inválido', () => {
      cy.visit('/pets/99999')
      cy.contains('Pet não encontrado', { timeout: 6000 }).should('be.visible')
    })

    it('exibe link para voltar à listagem de pets', () => {
      cy.visit('/pets/99999')
      cy.contains('a', /pets/i, { timeout: 6000 }).should('have.attr', 'href', '/pets')
    })
  })

  // ── Acesso via listagem ────────────────────────────────────────────────────
  describe('Acesso a partir da listagem', () => {
    it('navega para o detalhe correto ao clicar em um card na listagem', () => {
      cy.visit('/pets')
      cy.get('[data-testid="pet-card"]', { timeout: 6000 }).first().click()
      cy.get('[data-testid="pet-detail-name"]', { timeout: 6000 }).should('be.visible')
    })
  })
})
