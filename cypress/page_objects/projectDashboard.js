import selectors from '../fixtures/selectors.json'

export class projectDashboard {

    clickCreateTaskBtn() {
        cy.get(selectors.project.taskCreation.addTask)
            .should('be.visible')
            .click()
    }

    fillTaskName(name = 'Task name') {
        cy.get(selectors.project.taskCreation.taskNameField)
            .should('be.visible')
            .type(name)

    }

    fillTaskDescription() {
        cy.get(selectors.project.taskCreation.taskDescriptionField)
            .should('be.visible')
            .type('Just a description')
    }

    clickOnDueDate() {
        cy.get(selectors.project.taskCreation.dueDateButton)
            .should('be.visible')
            .click()
        cy.get(selectors.project.taskCreation.calendarModal)
            .should('be.visible')
    }

    quickSelectTodayDue() {
        cy.get(selectors.project.taskCreation.calendar.todayButton)
            .should('be.visible')
            .click()

        cy.get(selectors.project.taskCreation.dueDateButton)
            .should('contain', 'Today')
    }

    quickSelectTomorrowDue() {
        cy.get(selectors.project.taskCreation.calendar.tomorrowButton)
            .should('be.visible')
            .click()

        cy.get(selectors.project.taskCreation.dueDateButton)
            .should('contain', 'Tomorrow')
    }

    quickSelectWeekendDue() {
        cy.get(selectors.project.taskCreation.calendar.nextWkndButton)
            .should('be.visible')
            .click()

        cy.get(selectors.project.taskCreation.dueDateButton)
            .should('contain', 'Saturday')
    }

    quickSelectWeekDue() {
        cy.get(selectors.project.taskCreation.calendar.nextWeekButton)
            .should('be.visible')
            .click()
        const nextWeek = new Date()
        nextWeek.setDate(nextWeek.getDate() + 7)
        cy.get(selectors.project.taskCreation.dueDateButton)
            .should('contain', nextWeek.toLocaleString('en-US', { weekday: 'long' }))
    }

    clickOnPriorityButton() {
        cy.get(selectors.project.taskCreation.priority)
            .should('be.visible')
            .click()
        cy.get(selectors.project.taskCreation.priorityList)
            .should('be.visible')
    }
    setPriority(prio) {
        cy.get(selectors.project.taskCreation.priorityList)
            .should('be.visible')

        // cy.get(selectors.project.taskCreation.priorityListElement + prio)
        // .click()
        cy.contains(`Priority ${prio}`)
            .click()
        if (prio != 4 ) {
            cy.get(selectors.project.taskCreation.priority)
            .should('contain', `P${prio}`)
        } else {
            cy.get(selectors.project.taskCreation.priority)
            .should('contain', 'Priority')
        }
        
    }

    clickOnAddTaskButton() {
        cy.get(selectors.project.taskCreation.addTaskButton)
            .click()
    }

    checkIfTaskExists(taskName) {
        cy.contains(taskName)
        .should('be.visible')
    }
}

export const projectDash = new projectDashboard()