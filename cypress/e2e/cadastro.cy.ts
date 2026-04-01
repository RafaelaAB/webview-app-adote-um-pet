describe('Página de cadastro de pet — /cadastrar', () => {
  beforeEach(() => {
    cy.visit('/cadastrar')
  })

  // ── Estrutura do formulário ───────────────────────────────────────────────
  describe('Estrutura', () => {
    it('exibe o título da página', () => {
      cy.get('[data-testid="register-title"]').should('be.visible')
    })

    it('exibe o formulário de cadastro', () => {
      cy.get('[data-testid="register-form"]').should('be.visible')
    })

    it('exibe todos os campos obrigatórios', () => {
      cy.get('[data-testid="register-input-name"]').should('be.visible')
      cy.get('[data-testid="register-select-category"]').should('be.visible')
      cy.get('[data-testid="register-select-gender"]').should('be.visible')
      cy.get('[data-testid="register-select-size"]').should('be.visible')
      cy.get('[data-testid="register-input-location"]').should('be.visible')
      cy.get('[data-testid="register-input-contactName"]').should('be.visible')
      cy.get('[data-testid="register-input-contactPhone"]').should('be.visible')
    })

    it('exibe os campos opcionais', () => {
      cy.get('[data-testid="register-input-breed"]').should('be.visible')
      cy.get('[data-testid="register-input-age"]').should('be.visible')
      cy.get('[data-testid="register-input-description"]').should('be.visible')
    })

    it('exibe os botões de ação', () => {
      cy.get('[data-testid="register-btn-submit"]').should('be.visible')
      cy.get('[data-testid="register-btn-cancel"]').should('be.visible')
    })
  })

  // ── Validação ─────────────────────────────────────────────────────────────
  describe('Validação de campos obrigatórios', () => {
    beforeEach(() => {
      cy.get('[data-testid="register-btn-submit"]').click()
    })

    it('exibe erro ao não preencher o nome', () => {
      cy.get('[data-testid="register-error-name"]').should('contain.text', 'Nome é obrigatório')
    })

    it('exibe erro ao não selecionar a categoria', () => {
      cy.get('[data-testid="register-error-category"]').should('contain.text', 'Categoria é obrigatória')
    })

    it('exibe erro ao não selecionar o sexo', () => {
      cy.get('[data-testid="register-error-gender"]').should('be.visible')
    })

    it('exibe erro ao não selecionar o porte', () => {
      cy.get('[data-testid="register-error-size"]').should('be.visible')
    })

    it('exibe erro ao não preencher a localização', () => {
      cy.get('[data-testid="register-error-location"]').should('be.visible')
    })

    it('exibe erro ao não preencher o nome do responsável', () => {
      cy.get('[data-testid="register-error-contactName"]').should('be.visible')
    })

    it('exibe erro ao não preencher o telefone', () => {
      cy.get('[data-testid="register-error-contactPhone"]').should('be.visible')
    })
  })

  // ── Submissão com sucesso ─────────────────────────────────────────────────
  describe('Submissão com sucesso', () => {
    it('exibe mensagem de sucesso ao preencher todos os campos obrigatórios', () => {
      cy.fillPetForm({
        name: 'Bolota',
        category: 'Cachorro',
        breed: 'Vira-lata',
        age: '1 ano',
        gender: 'Macho',
        size: 'Médio',
        location: 'São Paulo, SP',
        description: 'Um cachorrinho muito fofo e carente.',
        contactName: 'Maria Silva',
        contactPhone: '(11) 99999-9999',
      })
      cy.get('[data-testid="register-btn-submit"]').click()
      cy.get('[data-testid="register-success"]', { timeout: 6000 }).should('be.visible')
      cy.get('[data-testid="register-success-title"]').should('contain.text', 'Pet cadastrado com sucesso!')
    })

    it('navega para / ao clicar em "Voltar ao início" após sucesso', () => {
      cy.fillPetForm({
        name: 'Bolota',
        category: 'Cachorro',
        gender: 'Macho',
        size: 'Médio',
        location: 'São Paulo, SP',
        contactName: 'Maria Silva',
        contactPhone: '(11) 99999-9999',
      })
      cy.get('[data-testid="register-btn-submit"]').click()
      cy.get('[data-testid="register-success"]', { timeout: 6000 })
      cy.contains('Voltar ao início').click()
      cy.url().should('eq', Cypress.config('baseUrl') + '/')
    })

    it('reexibe o formulário ao clicar em "Cadastrar outro pet"', () => {
      cy.fillPetForm({
        name: 'Bolota',
        category: 'Cachorro',
        gender: 'Macho',
        size: 'Médio',
        location: 'São Paulo, SP',
        contactName: 'Maria Silva',
        contactPhone: '(11) 99999-9999',
      })
      cy.get('[data-testid="register-btn-submit"]').click()
      cy.get('[data-testid="register-success"]', { timeout: 6000 })
      cy.contains('Cadastrar outro pet').click()
      cy.get('[data-testid="register-form"]').should('be.visible')
    })
  })

  // ── Cancelar ──────────────────────────────────────────────────────────────
  describe('Cancelar', () => {
    it('navega para fora da página ao clicar em "Cancelar"', () => {
      cy.get('[data-testid="register-btn-cancel"]').click()
      cy.url().should('not.include', '/cadastrar')
    })
  })

  // ── Gato com campos mínimos ───────────────────────────────────────────────
  describe('Cadastro de gato', () => {
    it('cadastra um gato com apenas campos obrigatórios', () => {
      cy.fillPetForm({
        name: 'Mimi',
        category: 'Gato',
        gender: 'Fêmea',
        size: 'Pequeno',
        location: 'Rio de Janeiro, RJ',
        contactName: 'João Costa',
        contactPhone: '(21) 98765-4321',
      })
      cy.get('[data-testid="register-btn-submit"]').click()
      cy.get('[data-testid="register-success"]', { timeout: 6000 }).should('be.visible')
    })
  })
})
