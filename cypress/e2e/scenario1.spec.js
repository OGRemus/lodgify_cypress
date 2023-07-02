
import { generateTestData } from '../fixtures/testData'
import selectors from '../fixtures/selectors.json'
import userData from '../fixtures/userData.json'

var testData = generateTestData()
context('Scenario 1', () => {
    before('Create a project via API call', () => {
        cy.createProjectApi(testData).then((response) => {
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
           })
    });
    describe('Create a project - happy flow', () => {
        after(() => {
            cy.projectsCleanup()
        });
        it('Log in to web application', () => {
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
        });

        it('Check if the project was added', () => {
            cy.get(selectors.application.leftMenu)
            .should('be.visible')

            cy.get(selectors.application.leftMenuInner)
            .should('be.visible')
            cy.get(selectors.application.projectMenu)
            .should('be.visible')
            .children(selectors.application.projectList)
            .should('be.visible')
            .children(selectors.application.projectItem)
            .contains(testData.projectName)
            .should('be.visible')
        });

       
    });
});
