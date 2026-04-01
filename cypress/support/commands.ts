// Custom Cypress commands

Cypress.Commands.add('visitHome', () => {
  cy.visit('/')
})

Cypress.Commands.add('openSidebar', () => {
  cy.get('[data-testid="header-btn-menu"]').click()
  cy.get('[data-testid="sidebar"]').should('be.visible')
})

Cypress.Commands.add('fillPetForm', (data: {
  name?: string
  category?: string
  breed?: string
  age?: string
  gender?: string
  size?: string
  location?: string
  description?: string
  contactName?: string
  contactPhone?: string
}) => {
  if (data.name)        cy.get('[data-testid="register-input-name"]').type(data.name)
  if (data.category)    cy.get('[data-testid="register-select-category"]').select(data.category)
  if (data.breed)       cy.get('[data-testid="register-input-breed"]').type(data.breed)
  if (data.age)         cy.get('[data-testid="register-input-age"]').type(data.age)
  if (data.gender)      cy.get('[data-testid="register-select-gender"]').select(data.gender)
  if (data.size)        cy.get('[data-testid="register-select-size"]').select(data.size)
  if (data.location)    cy.get('[data-testid="register-input-location"]').type(data.location)
  if (data.description) cy.get('[data-testid="register-input-description"]').type(data.description)
  if (data.contactName) cy.get('[data-testid="register-input-contactName"]').type(data.contactName)
  if (data.contactPhone)cy.get('[data-testid="register-input-contactPhone"]').type(data.contactPhone)
})

declare global {
  namespace Cypress {
    interface Chainable {
      visitHome(): Chainable<void>
      openSidebar(): Chainable<void>
      fillPetForm(data: {
        name?: string
        category?: string
        breed?: string
        age?: string
        gender?: string
        size?: string
        location?: string
        description?: string
        contactName?: string
        contactPhone?: string
      }): Chainable<void>
    }
  }
}
