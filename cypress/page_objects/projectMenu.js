import { generateTestData } from '../fixtures/testData'
import selectors from '../fixtures/selectors.json'

export class ProjectMenu {

    checkIfProjectIsAdded(testData) {
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
    }

    checkNumberOfProjects(length) {
        cy.get(selectors.application.projectList)
        .children()
        .should('have.length', length)
    }

    selectProject(testData) {
        cy.contains(testData.projectName)
            .should('be.visible')
            .click()

        cy.contains(selectors.project.title, testData.projectName)
            .should('be.visible')
    }

    checkIfLimitReached (limit) {
        // cy.find(selectors.application.lockButton)
        // .should('have.length.above', 0)
        cy.contains(`${limit}/${limit}`)
        .should('be.visible')
    }
}

export const projectMenu = new ProjectMenu()