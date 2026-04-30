
describe('Вариант 1: Модуль «Вакансии»', () => {
    context('6. Смена статуса рабочего пространства', () => {
        it('Позитивный сценарий: перевод статуса в «Завершено»', () => {
            cy.loginAs('employer')
            cy.visit('/workspace/1')
            cy.get('select[name="status"]').select('completed')
            cy.get('button[data-cy="save-status"]').click()
            cy.wait(1000)
            cy.get('[data-cy="current-status"]').should('contain.text', 'Завершено')
        })

        it('Негативный сценарий: изменение статуса студентом (отсутствие прав)', () => {
            cy.loginAs('student')
            cy.visit('/workspace/1')
            cy.get('select[name="status"]').should('not.exist')
            cy.get('[data-cy="read-only-status"]').should('be.visible')
        })
    })
})