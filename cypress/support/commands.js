// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import endpoints from '../fixtures/endpoints.json'
import { generateTestData } from '../fixtures/testData'
import selectors from '../fixtures/selectors.json'
import userData from '../fixtures/userData.json'


Cypress.Commands.add('createProjectApi', (testData) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrlApi') + endpoints.projects,
        headers: {
            'Authorization': 'Bearer ' + Cypress.env('apiToken'),
        },
        body: {
            name: testData.projectName,
            color: testData.projectColor
        }
    }).then((response) => {
        return response
    });
})

Cypress.Commands.add('getAllProjects', () => {
    cy.request({
        method: 'GET',
        url: Cypress.env('baseUrlApi') + endpoints.projects,
        headers: {
            'Authorization': 'Bearer ' + Cypress.env('apiToken'),
        },
    }).then((response) => {
        return response.body
    });
})

Cypress.Commands.add('projectsCleanup', () => {
    cy.getAllProjects().then((response) => {
        response.forEach(project => {
            cy.request({
                method: 'DELETE',
                url: Cypress.env('baseUrlApi') + endpoints.projects + `/${project.id}`,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('apiToken'),
                },
            });
        });
    })
})

Cypress.Commands.add('login', () => {
    cy.session('Logged in', () => {
        cy.visit(Cypress.env('baseUrl'))
        cy.contains('Log in')
        .should('be.visible')
        .click()

        cy.url()
        .should('be.equal', Cypress.env('baseUrl') + 'auth/login')

        cy.get('h1').
        should('contain', "Log in")

        cy.get(selectors.login.email)
        .type(userData.email)

        cy.get(selectors.login.password)
        .type(userData.pass)

        cy.get(selectors.login.loginButton)
        .should('be.visible')
        .should('contain', "Log in")
        .click()
        cy.get(selectors.application.dashboard)
        .should('be.visible')   
    })
})




