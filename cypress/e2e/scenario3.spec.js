import { generateTestData } from '../fixtures/testData'
import { projectMenu } from '../page_objects/projectMenu'
import { projectDash } from '../page_objects/projectDashboard'

context('Scenario 3', () => {
    var testData = generateTestData()
    describe('', () => {
        before(() => {
            cy.login()
        });

        it('Create a project and a task via API ', () => {

            cy.createProjectApi(testData).then((project) => {
                cy.createTask(testData, project.id)
            })
        });

        it('Verify if task is created on web', () => {
            projectMenu.checkIfProjectIsAdded(testData)
            projectMenu.selectProject(testData)
            projectDash.checkIfTaskExists(testData.taskName)
        });
    });
});