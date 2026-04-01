describe('Páginas de Eventos', () => {
  // ── Campanhas de Adoção ───────────────────────────────────────────────────
  describe('Campanhas de Adoção — /eventos/campanhas-adocao', () => {
    beforeEach(() => {
      cy.visit('/eventos/campanhas-adocao')
    })

    it('exibe o título "Campanhas de Adoção"', () => {
      cy.contains('Campanhas de Adoção').should('be.visible')
    })

    it('exibe link para a listagem de pets disponíveis', () => {
      cy.contains('a', /pets disponíveis/i)
        .should('have.attr', 'href', '/pets')
    })

    it('navega para /pets ao clicar no link de pets disponíveis', () => {
      cy.contains('a', /pets disponíveis/i).click()
      cy.url().should('include', '/pets')
    })
  })

  // ── Campanhas de Vacinação ────────────────────────────────────────────────
  describe('Campanhas de Vacinação — /eventos/campanhas-vacinacao', () => {
    beforeEach(() => {
      cy.visit('/eventos/campanhas-vacinacao')
    })

    it('exibe o título "Campanhas de Vacinação"', () => {
      cy.contains('Campanhas de Vacinação').should('be.visible')
    })

    it('exibe link para a listagem de pets', () => {
      cy.contains('a', /pets/i)
        .should('have.attr', 'href', '/pets')
    })

    it('navega para /pets ao clicar no link', () => {
      cy.contains('a', /pets/i).click()
      cy.url().should('include', '/pets')
    })
  })
})
