import actions from "../actions/notifications";

const init = {
    type: '',
    message: '',
    notifications: []
}

export default (state=init, payload)=>{
    switch (payload.type) {
        
        case actions.GET_INIT_NOTIFICATIONS_REQUEST:            
        return {
            type: actions.GET_INIT_NOTIFICATIONS_REQUEST,
        };
        
        case actions.GET_INIT_NOTIFICATIONS_SUCCESSFUL:            
        return {
            type: actions.GET_INIT_NOTIFICATIONS_SUCCESSFUL,
            notifications: payload.notifications
        };

        case actions.GET_INIT_NOTIFICATIONS_FAILED:            
        return {
            type: actions.GET_INIT_NOTIFICATIONS_FAILED,
            message: payload.message
        };
    
        default:
            return state;
    }
}