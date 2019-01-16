import contractor_actions from "../../actions/contractor/project";
import contractor_dashboard_actions from "../../actions/contractor/dashboard";

const init = {
    type: "",
    message:"",
    projects_you_joined: [],
    projects_you_proposed: []
}

export default ( state = init,payload )=>{
    switch (payload.type) {

        // Start - Join A Project 
        case contractor_actions.JOIN_PROJ_AS_CONTRACTOR_S:
        return {
            ...state,
            type: contractor_actions.JOIN_PROJ_AS_CONTRACTOR_S,
            message:""
        };
        case contractor_actions.JOIN_PROJ_AS_CONTRACTOR_F:
        return {
            ...state,
            type: contractor_actions.JOIN_PROJ_AS_CONTRACTOR_F,
            message:""
        };
        // End - Join A Project 
    
        // Start - Reject A Project 
        case contractor_actions.REJECT_PROJ_AS_CONTRACTOR_S:
        return {
            ...state,
            type: contractor_actions.REJECT_PROJ_AS_CONTRACTOR_S,
            message:""
        };
        case contractor_actions.REJECT_PROJ_AS_CONTRACTOR_F:
        return {
            ...state,
            type: contractor_actions.REJECT_PROJ_AS_CONTRACTOR_F,
            message:""
        };
        // Start - Reject A Project 
    
        // Start - Get Projects You Joined && Proposed 
        case contractor_dashboard_actions.GET_PROJS_AS_CONTRACTOR_S:
        return {
            ...state,
            type: contractor_dashboard_actions.GET_PROJS_AS_CONTRACTOR_S,
            message: payload.message,
            projects_you_proposed: payload.proposed,
            projects_you_joined: payload.joined,
        };

        case contractor_dashboard_actions.GET_PROJS_AS_CONTRACTOR_F:
        return {
            ...state,
            type: contractor_dashboard_actions.GET_PROJS_AS_CONTRACTOR_F,
            message: payload.message
        };

        case contractor_dashboard_actions.GET_PROJS_AS_CONTRACTOR_R:
        return {
            ...state,
            type: contractor_dashboard_actions.GET_PROJS_AS_CONTRACTOR_R,
            message: payload.message
        };
        // End - Get Projects You Joined && Proposed 
    
        default:
        return state;
    }
}