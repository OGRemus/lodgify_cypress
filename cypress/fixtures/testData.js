import colors from '../fixtures/colors.json'

export function generateTestData() {
    let data = {
        projectColor: colors[Math.floor(Math.random() * colors.length)],
        projectName: "Project " + Math.floor(Math.random() * 100),
        taskName: "Task" + Math.floor(Math.random() * 100),
        priority: Math.floor(Math.random() * 4) + 1,
        projectLimit: 5
    }
    return data
}