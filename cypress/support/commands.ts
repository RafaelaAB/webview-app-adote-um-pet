// Custom Cypress commands
// Add your custom commands here

Cypress.Commands.add('visitHome', () => {
  cy.visit('/')
})

declare global {
  namespace Cypress {
    interface Chainable {
      visitHome(): Chainable<void>
    }
  }
}
