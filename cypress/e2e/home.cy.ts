describe('Página Inicial — Adote um Pet', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // ── Header ────────────────────────────────────────────────────────────────
  describe('Header', () => {
    it('exibe o header com o título "Adote um Pet"', () => {
      cy.get('header').should('be.visible')
      cy.get('[data-testid="header-brand"]').should('contain.text', 'Adote um Pet')
    })

    it('exibe os botões de menu, busca e perfil no header', () => {
      cy.get('[data-testid="header-btn-menu"]').should('be.visible')
      cy.get('[data-testid="header-btn-search"]').should('be.visible')
      cy.get('[data-testid="header-btn-profile"]').should('be.visible')
    })

    it('abre a sidebar ao clicar no botão de menu', () => {
      cy.get('[data-testid="header-btn-menu"]').click()
      cy.get('[data-testid="sidebar"]').should('be.visible')
    })
  })

  // ── Hero ──────────────────────────────────────────────────────────────────
  describe('Seção Hero', () => {
    it('exibe o título hero da página', () => {
      cy.get('[data-testid="home-hero-title"]').should('contain.text', 'Salve uma vida')
    })

    it('exibe o badge de adoção responsável', () => {
      cy.get('[data-testid="home-hero-badge"]').should('be.visible')
    })

    it('navega para /pets ao clicar em "Adotar agora"', () => {
      cy.get('[data-testid="home-btn-adopt"]').click()
      cy.url().should('include', '/pets')
    })

    it('navega para /cadastrar ao clicar em "Cadastrar pet"', () => {
      cy.visit('/')
      cy.get('[data-testid="home-btn-register"]').click()
      cy.url().should('include', '/cadastrar')
    })
  })

  // ── Grid de pets em destaque ───────────────────────────────────────────────
  describe('Seção de Pets em Destaque', () => {
    it('exibe o título da seção de pets', () => {
      cy.get('[data-testid="home-pets-title"]').should('be.visible')
    })

    it('exibe exatamente 4 cards de pets', () => {
      cy.get('[data-testid="home-pets-grid"]', { timeout: 6000 })
        .find('[data-testid="pet-card"]')
        .should('have.length', 4)
    })

    it('navega para /pets ao clicar em "Veja todos"', () => {
      cy.get('[data-testid="home-btn-see-all"]').click()
      cy.url().should('include', '/pets')
    })
  })

  // ── CTA ───────────────────────────────────────────────────────────────────
  describe('Seção CTA', () => {
    it('exibe a seção de chamada para cadastro', () => {
      cy.get('[data-testid="home-cta-section"]').should('be.visible')
    })

    it('exibe o botão "Cadastre aqui"', () => {
      cy.get('[data-testid="home-btn-cta-register"]').should('be.visible')
    })

    it('navega para /cadastrar ao clicar em "Cadastre aqui"', () => {
      cy.get('[data-testid="home-btn-cta-register"]').click()
      cy.url().should('include', '/cadastrar')
    })
  })

  // ── Quem somos nós ────────────────────────────────────────────────────────
  describe('Seção Quem Somos Nós', () => {
    it('exibe a seção com o título correto', () => {
      cy.get('[data-testid="home-about-section"]').should('be.visible')
      cy.get('[data-testid="home-about-title"]').should('contain.text', 'Quem somos nós')
    })

    it('exibe os cards de estatísticas', () => {
      cy.get('[data-testid="home-about-stats"]').should('be.visible')
    })
  })

  // ── Footer ────────────────────────────────────────────────────────────────
  describe('Footer', () => {
    it('exibe o footer com o nome da desenvolvedora', () => {
      cy.get('[data-testid="footer"]').should('be.visible')
      cy.get('[data-testid="footer"]').should('contain.text', 'Rafaela Andrade Batista')
    })

    it('exibe o link do GitHub no footer', () => {
      cy.get('[data-testid="footer-link-github"]')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', 'github.com')
    })

    it('exibe o link do Instagram no footer', () => {
      cy.get('[data-testid="footer-link-instagram"]')
        .should('be.visible')
        .and('have.attr', 'href')
        .and('include', 'instagram.com')
    })
  })
})
