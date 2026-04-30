describe('Авторизация', () => {

    it('Авторизация через кастомную команду', () => {
        cy.loginAs('student');
        cy.url().should('not.include', '/login');
        cy.log("Авторизация студента успешна")
    });
    it('Авторизация через кастомную команду', () => {
        cy.loginAs('employer');
        cy.url().should('not.include', '/login');
        cy.log("Авторизация работодателя успешна")
    });
})