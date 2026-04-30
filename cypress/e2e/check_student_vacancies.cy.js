
describe('Вариант 1: Модуль «Вакансии»', () => {

    context('3. Отклик на вакансию студентом', () => {
        it('Позитивный сценарий: успешная подача отклика', () => {
            cy.loginAs('student')
            cy.visit('/vacancies')
            cy.get('.vacancy-card').first().click()
            cy.get('button[data-cy="apply-btn"]').click()
            cy.get('[data-cy="apply-success"]').should('be.visible')
        })

        it('Негативный сценарий: отклик без авторизации', () => {
            cy.visit('/vacancies')
            cy.get('.vacancy-card').first().click()
            cy.get('button[data-cy="apply-btn"]').should('be.disabled')
            cy.url().should('include', '/vacancies') // Убедиться, что перенаправления на логин не происходит, а функция заблокирована
        })
    })
})
