
import { generateTestData } from '../fixtures/testData'
import selectors from '../fixtures/selectors.json'

export class Login {
    login() {
        cy.contains('Log in')
            .should('be.visible')
            .click()

        cy.url()
            .should('be.equal', Cypress.env('baseUrl') + 'auth/login')

        cy.get('h1').
            should('contain', "Log in")

        cy.get(selectors.login.email)
            .type(Cypress.env('userMail'))

        cy.get(selectors.login.password)
            .type(Cypress.env('userPass'))

        cy.get(selectors.login.loginButton)
            .should('be.visible')
            .should('contain', "Log in")
            .click()
        cy.get(selectors.application.dashboard)
            .should('be.visible')
    }
}


export const login = new Login()