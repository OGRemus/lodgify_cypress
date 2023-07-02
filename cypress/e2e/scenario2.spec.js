
import { generateTestData } from '../fixtures/testData'
import selectors from '../fixtures/selectors.json'
import userData from '../fixtures/userData.json'

var testData = generateTestData()

context('Scenario 2', () => {
    describe('', () => {
        before(() => {
            cy.createProjectApi(testData)
            cy.login()
        });

        it('Select the created project', () => {
            cy.contains(testData.projectName)
            .should('be.visible')
            .click()
        });

        it('', () => {
            
        });
    });
});