const version = 'v1'
const productionUrl = "none"


const origin = process.env.NODE_ENV === 'development' ? 'http://localhost' : productionUrl
export const apiUrl = origin + '/api/' + version + '/'


export const backApiEndpoints = {
    auth: {
        login: 'login',
        logout: 'logout'
    },
    task: 'task',
    taskStatuses: 'task-statuses'
}