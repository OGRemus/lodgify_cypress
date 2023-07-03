
import { generateTestData } from '../fixtures/testData'
import { login } from '../page_objects/login'
import { projectMenu } from '../page_objects/projectMenu'


context('Scenario 1', () => {
    var testData = generateTestData()
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

    // describe('Create project - reach project number limit', () => {
    //     it('', () => {
            
    //     });
    // });

    // describe('Create project - unhappy flows', () => {
    //     it('Exceed project limit then check the web application', () => {
            
    //     });
    // });
});
