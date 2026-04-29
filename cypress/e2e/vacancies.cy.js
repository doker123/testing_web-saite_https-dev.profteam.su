

describe('Вариант 1: Модуль «Вакансии»', () => {
    const login = (role) => {
        cy.fixture('users.json').then((users) => {
            cy.visit('/login')
            cy.get('[autocomplete="username"]').type(users[role].username)
            cy.get('[autocomplete="current-password"]').type(users[role].password)
            cy.get('form').contains('button', ' Войти ').should('not.be.disabled').click();
            cy.get('button[type="submit"]').click()
            cy.url().should('include', '/dashboard')
        })
    }

    context('1. Создание новой вакансии работодателем', () => {
        it('Позитивный сценарий: успешное создание', () => {
            login('employer')
            cy.visit('/account/vacancies')
            cy.get('[placeholder="Кладовщик"]').type('Junior JavaScript Developer')
            cy.get('[value="По договорённости"]').check()
            cy.get('textarea[name="requirements"]').type('Знание JS, Git, опыт от 1 года')
            cy.get('button[type="submit"]').click()
            cy.contains('button', 'Создать вакансию').should('be.visible').click()
        })

        it('Негативный сценарий: создание с незаполненными обязательными полями', () => {
            login('employer')
            cy.visit('/vacancies/create')
            cy.get('button[type="submit"]').click()
            cy.wait(1000)
            cy.get('.error-message, [data-cy="validation-error"]').should('have.length.greaterThan', 0)
        })
    })

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

    context('3. Отклик на вакансию студентом', () => {
        it('Позитивный сценарий: успешная подача отклика', () => {
            login('student')
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

    context('4. Подтверждение отклика работодателем', () => {
        it('Позитивный сценарий: подтверждение заявки', () => {
            login('employer')
            cy.visit('/employer/applications')
            cy.get('.application-item').first().find('button[data-cy="confirm-btn"]').click()
            cy.wait(1000)
            cy.get('.status-badge').should('contain.text', 'Подтверждено')
        })

        it('Негативный сценарий: попытка подтвердить уже обработанный отклик', () => {
            login('employer')
            cy.visit('/employer/applications')
            cy.get('.application-item').first().find('button[data-cy="confirm-btn"]').should('not.exist')
        })
    })

    context('5. Взаимодействие внутри рабочего пространства', () => {
        it('Позитивный сценарий: отправка сообщения', () => {
            login('employer')
            cy.visit('/workspace/1')
            cy.get('textarea[name="message"]').type('Просьба уточнить стек технологий.')
            cy.get('button[data-cy="send-message"]').click()
            cy.wait(1000)
            cy.get('.chat-message').last().should('contain.text', 'Просьба уточнить стек технологий.')
        })

        it('Негативный сценарий: отправка пустого сообщения', () => {
            login('employer')
            cy.visit('/workspace/1')
            cy.get('button[data-cy="send-message"]').click()
            cy.wait(500)
            cy.get('.error-message, [data-cy="empty-msg-error"]').should('be.visible')
        })
    })

    context('6. Смена статуса рабочего пространства', () => {
        it('Позитивный сценарий: перевод статуса в «Завершено»', () => {
            login('employer')
            cy.visit('/workspace/1')
            cy.get('select[name="status"]').select('completed')
            cy.get('button[data-cy="save-status"]').click()
            cy.wait(1000)
            cy.get('[data-cy="current-status"]').should('contain.text', 'Завершено')
        })

        it('Негативный сценарий: изменение статуса студентом (отсутствие прав)', () => {
            login('student')
            cy.visit('/workspace/1')
            cy.get('select[name="status"]').should('not.exist')
            cy.get('[data-cy="read-only-status"]').should('be.visible')
        })
    })
})