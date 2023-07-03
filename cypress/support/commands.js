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
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property("id").to.not.be.null.and.not.be.undefined
        expect(response.body).to.have.property("name", testData.projectName)
        expect(response.body).to.have.property("color", testData.projectColor)
        expect(response.body).to.have.property("is_shared").to.not.be.null.and.not.be.undefined
        expect(response.body).to.have.property("comment_count", 0)
        expect(response.body).to.have.property("order").to.not.be.null.and.not.be.undefined
        expect(response.body).to.have.property("is_favorite").to.not.be.null.and.not.be.undefined
        expect(response.body).to.have.property("is_inbox_project").to.not.be.null.and.not.be.undefined
        expect(response.body).to.have.property("is_team_inbox").to.not.be.null.and.not.be.undefined
        expect(response.body).to.have.property("view_style").to.not.be.null.and.not.be.undefined
        expect(response.body).to.have.property("url").to.not.be.null.and.not.be.undefined
        return response.body
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
            .type(Cypress.env('userMail'))

        cy.get(selectors.login.password)
            .type(Cypress.env('userPass'))

        cy.get(selectors.login.loginButton)
            .should('be.visible')
            .should('contain', "Log in")
            .click()
        cy.get(selectors.application.dashboard)
            .should('be.visible')
    })
})

Cypress.Commands.add('getTasksByProjectId', (projId) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('baseUrlApi') + endpoints.tasks,
        headers: { 'Authorization': 'Bearer ' + Cypress.env('apiToken'), },
    }).then((response) => {
        let taskArr = []
        for (let index in response.body) {
            let obj = response.body[index]
            if (obj.project_id == projId)
                taskArr.push(obj)
        }
        return taskArr
    });
})

Cypress.Commands.add('getProjectByName', (name) => {
    cy.request({
        method: 'GET',
        url: Cypress.env('baseUrlApi') + endpoints.projects,
        headers: { 'Authorization': 'Bearer ' + Cypress.env('apiToken'), },
    }).then((response) => {
        for (let index in response.body) {
            let obj = response.body[index]
            if (obj.name == name) {
                return obj
            }
        }
    });
})

Cypress.Commands.add('createTask', (testData, projectId) => {
    cy.request({
        method: 'POST',
        url: Cypress.env('baseUrlApi') + endpoints.tasks,
        headers: { 'Authorization': 'Bearer ' + Cypress.env('apiToken'), },
        body: {
            content: testData.taskName,
            priority: testData.priority,
            project_id: projectId
        }
    }).then((response) => {
        console.log(response.body)
    });
})


