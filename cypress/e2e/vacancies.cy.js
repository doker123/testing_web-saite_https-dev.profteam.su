describe('Страница вакансий', () => {
    it('должна успешно загрузится и отобразить список', () => {
        cy.visit('/vacancies');
        cy.get('h1').should('contain', 'Вакансии');
        cy.get('[class *= "vacancy-item"]').should('have.length.at.least', 1);
    })
})