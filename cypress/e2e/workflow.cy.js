
describe('Вариант 1: Модуль «Вакансии»', () => {

    context('5. Взаимодействие внутри рабочего пространства', () => {
        it('Позитивный сценарий: отправка сообщения', () => {
            cy.loginAs('employer')
            cy.visit('/workspace/1')
            cy.get('textarea[name="message"]').type('Просьба уточнить стек технологий.')
            cy.get('button[data-cy="send-message"]').click()
            cy.wait(1000)
            cy.get('.chat-message').last().should('contain.text', 'Просьба уточнить стек технологий.')
        })

        it('Негативный сценарий: отправка пустого сообщения', () => {
            cy.loginAs('employer')
            cy.visit('/workspace/1')
            cy.get('button[data-cy="send-message"]').click()
            cy.wait(500)
            cy.get('.error-message, [data-cy="empty-msg-error"]').should('be.visible')
        })
    })
})