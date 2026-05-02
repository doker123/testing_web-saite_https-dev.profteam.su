describe('Отклик на вакансию студентом', ()=> {
    beforeEach(() => {
        cy.loginAs('student');
    });
    it('Отклик на интересующую вакансию студента', () => {
        cy.visit('/account/main');
        // cy.get('.page-nav__role-block > .button').click();
        // cy.get('.desktop-modal').should('be.visible');
        // cy.get('.select-role-form > :nth-child(3)').click();
        cy.wait(2000);
        cy.visit('/vacancies');
        cy.get('input[label-text="Поиск"]')
            .should('be.visible')
            .type('Разнорабочий');
        cy.wait(2000)
        cy.get('.search-input__button')
            .should('be.visible')
            .click();
        cy.wait(3000);
        cy.get('.vacancy-header__name').should('be.visible').and('not.be.empty')
        cy.get(':nth-child(2) > .vacancy-item__info-wrapper ' +
            '> .vacancy-item__footer-wrapper > ' +
            '.vacancy-footer > .vacancy-footer__button-wrapper > ' +
            '.button__background-color-green')
            .click();
        cy.log('Отклик на вакансию за студента успешно.')
        cy.wait(3000);
    })
});