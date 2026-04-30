
describe('Вариант 1: Модуль «Вакансии»', () => {

    context('2. Просмотр страницы вакансий (поиск и фильтрация)', () => {
        it('Позитивный сценарий: поиск по ключевому слову', () => {
            cy.visit('/vacancies')
            cy.get('input[name="search"]').type('Developer').type('{enter}')
            cy.wait(1000)
            cy.get('.vacancy-card').should('not.be.empty')
        })

        it('Негативный сценарий: поиск по несуществующему запросу', () => {
            cy.visit('/vacancies')
            cy.get('input[name="search"]').type('НесуществующаяДолжность999').type('{enter}')
            cy.wait(1000)
            cy.get('.empty-state, [data-cy="no-results"]').should('be.visible')
        })
    })
})