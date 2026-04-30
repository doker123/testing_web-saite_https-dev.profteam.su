import '../support/commands.js'
describe('Вариант 1: Модуль «Вакансии»', () => {

    context('4. Подтверждение отклика работодателем', () => {
        it('Позитивный сценарий: подтверждение заявки', () => {
            cy.loginAs('employer')
            cy.visit('/employer/applications')
            cy.get('.application-item').first().find('button[data-cy="confirm-btn"]').click()
            cy.wait(1000)
            cy.get('.status-badge').should('contain.text', 'Подтверждено')
        })

        it('Негативный сценарий: попытка подтвердить уже обработанный отклик', () => {
            cy.loginAs('employer')
            cy.visit('/employer/applications')
            cy.get('.application-item').first().find('button[data-cy="confirm-btn"]').should('not.exist')
        })
    })
})