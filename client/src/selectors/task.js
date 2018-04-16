/* Selectors to filter tasks from the Store */
export const filterByProject = (tasks, projectId) => {
    return projectId ? 
        Object.values(tasks)
        .reduce((filtered, t) => (t.project === projectId ? { ...filtered, t } : filtered), {}) :
        tasks
}
