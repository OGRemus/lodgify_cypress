
import { generateTestData } from '../fixtures/testData'
import { projectMenu } from '../page_objects/projectMenu'
import { projectDash } from '../page_objects/projectDashboard'
var testData = generateTestData()

context('Scenario 2', () => {
    describe('', () => {
        before(() => {
            cy.login()
        });

        after(() => {
            cy.projectsCleanup()
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

        it('Check if task was created via API', () => {
            cy.getProjectByName(testData.projectName).then((project => {
                cy.getTasksByProjectId(project.id).then((tasksArr) => {
                    let index
                    let obj
                    for (index in tasksArr) {
                        obj = tasksArr[index]
                        if(obj.content == testData.taskName) {
                            break
                        }
                        expect(resolution).to.be.true
                        expect(obj).to.have.property("description", "Just a description")
                    }
                })
            }))
        });
    });
});