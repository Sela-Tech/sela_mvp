
export default {
    filterByProject: function (milestones, projectId) {
        return projectId ? 
            Object.values(milestones).reduce((filtered, m) => (m.project === projectId ? { ...filtered, m } : filtered), {}) :
            milestones
    }
}