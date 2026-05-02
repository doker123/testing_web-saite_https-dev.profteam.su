describe('Тестирование работы рабочих пространств в системе',() => {
    it('Тестирование рабочего пространства со стороны студента', ()=>{
        cy.loginAs('student');
        cy.visit('/account/responses');
        cy.get(':nth-child(3) > .navigation-item__title').click();
        cy.wait(2000);
        cy.get(':nth-child(1) > .responses-list-item__content-company > .button').click();
        cy.wait(2000);
        cy.get('.form-area').type('Привет');
        cy.get('#file-uploader')
            .selectFile('cypress/fixtures/Test.txt', { force: true });
        cy.get('.comment-textarea__buttons .icon-button')
            .eq(1)
            .should('not.be.disabled').and('be.visible')
            .click();
    })
    it('Тестирование рабочего пространства со стороны работодателя.', ()=>{
        cy.loginAs('employer');
        cy.visit('/account/responses');
        cy.get(':nth-child(3) > .navigation-item__title').click();
        cy.wait(2000);
        cy.get('.infinite-loader > :nth-child(1) > .button').click();
        cy.wait(2000);
        cy.get('.form-area').type('Привет');
        cy.get('#file-uploader')
            .selectFile('cypress/fixtures/Test.txt', { force: true });
        cy.get('.comment-textarea__buttons .icon-button')
            .eq(1)
            .should('not.be.disabled').and('be.visible')
            .click();
    })
})