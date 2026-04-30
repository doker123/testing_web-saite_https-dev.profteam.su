Cypress.Commands.add('loginAs', (role) => {
    cy.fixture('users.json').then((users) => {

        const user = users[role];

        if (!user) {
            throw new Error(`Роль "${role}" не найдена в users.json`);
        }

        cy.visit('/login')

        cy.get('[autocomplete="username"]')
            .should('be.visible')
            .type(user.username)

        cy.get('input[type="password"]')
            .should('be.visible')
            .type(user.password)

        cy.get('form')
            .contains('button', 'Войти')
            .should('be.enabled')
            .click()

        cy.url().should('not.include', '/login');

        cy.get('body').should('contain', 'Личный кабинет');
    })
})