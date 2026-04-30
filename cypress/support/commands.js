Cypress.Commands.add('loginAs', (role) => {
    cy.fixture('users.json').then((users) => {
        cy.visit('/login')
        cy.get('[autocomplete="username"]').type(users[role].username)
        cy.get('input[type="password"]').type(users[role].password)
        cy.get('form').contains('button', 'Войти').should('be.enabled').click()
    })
})