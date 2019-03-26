import * as evidenceActions from "../actions/evidence";

const init = {
    type: "",
    kpis: [],
    selectedTaskSubmissions: {},
    submissions: {
        projectLevelSubmissions: {
            others: [],
            requested: []
        },
        taskLevelSubmissions: []
    }
}

export default (state=init, payload)=>{
    switch (payload.type) {

        case evidenceActions.SPECIFY_KPI_R:
        return {
            ...state,
            type: evidenceActions.SPECIFY_KPI_R
        };

        case evidenceActions.SPECIFY_KPI_S:
        return {
            ...state,
            type: evidenceActions.SPECIFY_KPI_S
        };

        case evidenceActions.SPECIFY_KPI_F:
        return {
            ...state,
            type: evidenceActions.SPECIFY_KPI_F
        };
        
        case evidenceActions.RETRIEVE_KPIS_R:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_KPIS_R
        };

        case evidenceActions.RETRIEVE_KPIS_S:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_KPIS_S,
            kpis: payload.kpis
        };

        case evidenceActions.RETRIEVE_KPIS_F:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_KPIS_F
        };

        case evidenceActions.SUBMIT_EVIDENCE_S:
        return {
            ...state,
            type: evidenceActions.SUBMIT_EVIDENCE_S
        };

        case evidenceActions.RETRIEVE_SUBMISSION_R:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_SUBMISSION_R
            };

        case evidenceActions.RETRIEVE_SUBMISSION_S:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_SUBMISSION_S,
            submissions: {...state.submissions, ...payload.submissions}
        };

        case evidenceActions.RETRIEVE_SUBMISSION_F:
        return {
            ...state,
            type: evidenceActions.RETRIEVE_SUBMISSION_F
        };
        
        case evidenceActions.SELECT_TASK_SUBMISSIONS:
        return {
            ...state,
            type: evidenceActions.SELECT_TASK_SUBMISSIONS,
            selectedTaskSubmissions: state
            .submissions
            .taskLevelSubmissions
            .filter( milestone => {
                return milestone.title === payload.milestone
            })[0]
            .tasks.filter( task => {
                return task._id === payload.taskId
            })[0]
        }
        default:
            return state;
    }
}