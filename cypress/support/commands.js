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




