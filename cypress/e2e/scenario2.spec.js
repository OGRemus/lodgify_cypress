
import { generateTestData } from '../fixtures/testData'
import { projectMenu } from '../page_objects/projectMenu'
import { projectDash } from '../page_objects/projectDashboard'
var testData = generateTestData()

context('Scenario 2', () => {
    describe('', () => {
        before(() => {
            cy.login()
        });

        it('Select the created project', () => {
            cy.createProjectApi(testData)
            projectMenu.selectProject(testData)
        });

        it('Create a new task with name, description, due date today and priority', () => {
            projectDash.clickCreateTaskBtn()
            projectDash.fillTaskName(testData.taskName)
            projectDash.fillTaskDescription()
            projectDash.clickOnDueDate()
            projectDash.quickSelectTodayDue()
            let priority = Math.floor(Math.random() * 4) + 1
            projectDash.clickOnPriorityButton()
            projectDash.setPriority(priority)
            projectDash.clickOnAddTaskButton()
            projectDash.checkIfTaskExists(testData.taskName)
        });
    });
});