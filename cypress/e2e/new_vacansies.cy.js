
describe('Вариант 1: Модуль «Вакансии»', () => {

    context('1. Создание новой вакансии работодателем', () => {
        it('Позитивный сценарий: успешное создание', () => {
            cy.loginAs('employer')
            cy.visit('/account/vacancies')
            cy.get('form .form-input').eq(0).type('Junior JavaScript Developer')
            cy.get('[value="По договорённости"]').check()
            cy.get('[value="5/2"]').check()
            cy.get('[placeholder="Ваши требования"]').type('Знание JS, Git, опыт от 1 года')
            cy.get('input[name="responsibilities"]').type('Знание JS, Git, опыт от 1 года')
            cy.contains('button', 'Обновить вакансию').should('be.visible').click()
        })

        it('Негативный сценарий: создание с незаполненными обязательными полями', () => {
            cy.loginAs('employer')
            cy.visit('/account/vacancies')
            cy.contains('button', 'Обновить вакансию').click()
            cy.wait(1000)
            cy.get('.error-message, [data-cy="validation-error"]').should('have.length.greaterThan', 0)
        })
    })
})