import { generateTestData } from '../fixtures/testData'
import selectors from '../fixtures/selectors.json'
import userData from '../fixtures/userData.json'

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

    selectProject(testData) {
        cy.contains(testData.projectName)
            .should('be.visible')
            .click()

        cy.contains(selectors.project.title, testData.projectName)
            .should('be.visible')
    }
}

export const projectMenu = new ProjectMenu()