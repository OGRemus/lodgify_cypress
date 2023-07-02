import colors from '../fixtures/colors.json'

export function generateTestData() {
    let data = {
        projectColor: colors[Math.floor(Math.random() * colors.length)],
        projectName: "Project " + Math.floor(Math.random() * 100)
    }
    return data
}