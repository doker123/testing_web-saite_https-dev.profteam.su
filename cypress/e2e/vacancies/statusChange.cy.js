describe('Тестирование смены статуса рабочего пространства', ()=>{
    beforeEach(() => {
        cy.loginAs('employer');
    })
    it('Смена статуса рабочего пространства с активного на Принят на вакансию.',() =>{
        cy.visit('/account/responses');
        cy.get(':nth-child(3) > .navigation-item__title').click();
        cy.wait(2000);
        cy.get('.infinite-loader > :nth-child(1) > .button').click();
        cy.get('.status-open__buttons > :nth-child(1)').click();
        cy.log('Статус пространства изменился и пространство заморожено.')
        cy.wait(2000);
    });
    it('Смена статуса рабочего пространства с активного на в Вакансии отказано.', () =>{
        cy.visit('/account/responses');
        cy.get(':nth-child(3) > .navigation-item__title').click();
        cy.wait(2000);
        cy.get('.infinite-loader > :nth-child(2) > .button').click();
        cy.get('.status-open__buttons > :nth-child(2)').click();
        cy.log('Статус пространства изменился и пространство заморожено.')
    })
})