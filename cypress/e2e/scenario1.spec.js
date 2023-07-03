
import { generateTestData } from '../fixtures/testData'
import { login } from '../page_objects/login'
import { projectMenu } from '../page_objects/projectMenu'
import endpoints from '../fixtures/endpoints.json'


context('Scenario 1', () => {
    let testData = generateTestData()
    before('Create a project via API call', () => {
        cy.createProjectApi(testData)
    });
    describe('Create a project - happy flow', () => {
        after(() => {
            cy.projectsCleanup()
        });
        it('Log in to web application', () => {
            cy.visit(Cypress.env('baseUrl'))
            login.login()
        });

        it('Check if the project was added', () => {
            projectMenu.checkIfProjectIsAdded(testData)
        });

    });

    
});

context('Scenario 1 - boundary and equivalence', () => {
    describe('Create project', () => {
        let testData = generateTestData()
        before(() => {
            cy.login()
        });

        after(() => {
            cy.projectsCleanup()
        });
        it('Reach project limit and check', () => {
            for(let index=0; index < 5; index ++) {
                cy.createProjectApi(testData)
            }
            projectMenu.checkNumberOfProjects(testData.projectLimit)
        });

        it('Check if lock button appeared', () => {
            projectMenu.checkIfLimitReached(testData.projectLimit)
        });

        it('Exceed limit through API and check web application', () => {
            cy.request({
                method: 'POST',
                failOnStatusCode: false,
                url: Cypress.env('baseUrlApi') + endpoints.projects,
                headers: {
                    'Authorization': 'Bearer ' + Cypress.env('apiToken'),
                },
                body: {
                    name: testData.projectName,
                    color: testData.projectColor
                }
            }).then((response) => {
                expect(response.status, "Created project even if limit was exceeded").to.not.eq(200)
            })
            projectMenu.checkIfLimitReached(testData.projectLimit)
        });
    });
});
