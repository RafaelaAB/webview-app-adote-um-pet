describe('Sidebar — navegação', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('abre a sidebar ao clicar no botão de menu', () => {
    cy.get('[data-testid="header-btn-menu"]').click()
    cy.get('[data-testid="sidebar"]').should('be.visible')
  })

  it('fecha a sidebar ao clicar no botão de fechar', () => {
    cy.openSidebar()
    cy.get('[data-testid="sidebar-close"]').click()
    cy.get('[data-testid="sidebar"]').should('not.be.visible')
  })

  it('fecha a sidebar ao clicar no overlay', () => {
    cy.openSidebar()
    cy.get('[data-testid="sidebar-overlay"]').click({ force: true })
    cy.get('[data-testid="sidebar"]').should('not.be.visible')
  })

  it('fecha a sidebar ao pressionar a tecla Escape', () => {
    cy.openSidebar()
    cy.get('body').type('{esc}')
    cy.get('[data-testid="sidebar"]').should('not.be.visible')
  })

  it('navega para /pets ao clicar em "Adote um Pet" na sidebar', () => {
    cy.openSidebar()
    cy.get('[data-testid="sidebar-link-/pets"]').click()
    cy.url().should('include', '/pets')
  })

  it('navega para /cadastrar ao clicar em "Cadastre um Pet" na sidebar', () => {
    cy.openSidebar()
    cy.get('[data-testid="sidebar-link-/cadastrar"]').click()
    cy.url().should('include', '/cadastrar')
  })

  it('expande o grupo de Eventos na sidebar', () => {
    cy.openSidebar()
    cy.get('[data-testid="sidebar-group-eventos"]').click()
    cy.get('[data-testid="sidebar-link-/eventos/campanhas-adocao"]').should('be.visible')
    cy.get('[data-testid="sidebar-link-/eventos/campanhas-vacinacao"]').should('be.visible')
  })

  it('navega para campanhas de adoção pela sidebar', () => {
    cy.openSidebar()
    cy.get('[data-testid="sidebar-group-eventos"]').click()
    cy.get('[data-testid="sidebar-link-/eventos/campanhas-adocao"]').click()
    cy.url().should('include', '/eventos/campanhas-adocao')
  })

  it('navega para campanhas de vacinação pela sidebar', () => {
    cy.openSidebar()
    cy.get('[data-testid="sidebar-group-eventos"]').click()
    cy.get('[data-testid="sidebar-link-/eventos/campanhas-vacinacao"]').click()
    cy.url().should('include', '/eventos/campanhas-vacinacao')
  })

  it('navega para / ao clicar em "Home" na sidebar', () => {
    cy.visit('/pets')
    cy.openSidebar()
    cy.get('[data-testid="sidebar-link-/"]').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })
})
