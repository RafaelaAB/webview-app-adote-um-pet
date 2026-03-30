describe('Página Inicial — Adote um Pet', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('exibe o header com o título "Adote um Pet"', () => {
    cy.get('header').should('be.visible')
    cy.get('header').contains('Adote um Pet').should('be.visible')
  })

  it('exibe o título hero da página', () => {
    cy.contains('Salve uma vida').should('be.visible')
  })

  it('exibe a seção de pets com 4 cards', () => {
    cy.contains('Veja os pets que precisam de ajuda').should('be.visible')
    cy.get('[data-testid="pets-grid"]', { timeout: 5000 })
      .find('[data-testid="pet-card"]')
      .should('have.length', 4)
  })

  it('exibe o botão "Veja todos" que leva à página de pets', () => {
    cy.contains('Veja todos').should('be.visible')
    cy.contains('Veja todos').click()
    cy.url().should('include', '/pets')
  })

  it('exibe o botão de cadastro de pet', () => {
    cy.contains('Cadastre aqui').should('be.visible')
  })

  it('redireciona para /cadastrar ao clicar em "Cadastre aqui"', () => {
    cy.contains('Cadastre aqui').click()
    cy.url().should('include', '/cadastrar')
  })

  it('exibe a seção "Quem somos nós"', () => {
    cy.contains('Quem somos nós').should('be.visible')
  })

  it('exibe o footer com o nome da desenvolvedora', () => {
    cy.get('footer').should('be.visible')
    cy.get('footer').contains('Rafaela Andrade Batista').should('be.visible')
  })

  it('exibe links de GitHub e Instagram no footer', () => {
    cy.get('footer').contains('GitHub').should('be.visible')
    cy.get('footer').contains('Instagram').should('be.visible')
  })
})

describe('Página de listagem de pets', () => {
  beforeEach(() => {
    cy.visit('/pets')
  })

  it('exibe todos os pets', () => {
    cy.get('[data-testid="all-pets-grid"]', { timeout: 5000 })
      .find('[data-testid="pet-card"]')
      .should('have.length.greaterThan', 4)
  })

  it('filtra pets por categoria', () => {
    cy.contains('Cachorros').click()
    cy.get('[data-testid="pet-card"]').should('have.length.greaterThan', 0)
  })

  it('navega para o detalhe do pet ao clicar no card', () => {
    cy.get('[data-testid="pet-card"]', { timeout: 5000 }).first().click()
    cy.url().should('match', /\/pets\/\d+/)
  })
})

describe('Página de cadastro de pet', () => {
  beforeEach(() => {
    cy.visit('/cadastrar')
  })

  it('exibe o formulário de cadastro', () => {
    cy.contains('Cadastrar um pet').should('be.visible')
    cy.get('form').should('be.visible')
  })

  it('exibe erros de validação ao submeter formulário vazio', () => {
    cy.get('form').submit()
    cy.contains('Nome é obrigatório').should('be.visible')
  })

  it('exibe mensagem de sucesso ao preencher e submeter formulário', () => {
    cy.get('#name').type('Bolota')
    cy.get('#category').select('Cachorro')
    cy.get('#breed').type('Vira-lata')
    cy.get('#age').type('1 ano')
    cy.get('#gender').select('Macho')
    cy.get('#size').select('Médio')
    cy.get('#location').type('São Paulo, SP')
    cy.get('#description').type('Um cachorrinho muito fofo e carente.')
    cy.get('#contactName').type('Maria Silva')
    cy.get('#contactPhone').type('(11) 99999-9999')
    cy.get('form').submit()
    cy.contains('Pet cadastrado com sucesso!').should('be.visible')
  })
})
