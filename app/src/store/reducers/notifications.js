import actions from "../actions/notifications";

const init = {
    type: '',
    message: '',
    notifications: [],
    unreadNIds:[],
    socket: {}
}

export default (state=init, payload)=>{
    switch (payload.type) {
        
        case actions.SAVE_SOCKET_DATA:
        return {
            ...state,
            socket: {
                ...state.socket,
                user: payload.data.user
            }
        }

        case actions.MARK_NOTIFICATIONS_SUCCESSFUL:
        return {
            ...state,
            unreadNIds: []
        }

        case actions.GET_INIT_NOTIFICATIONS_REQUEST:            
        return {
            ...state,
            type: actions.GET_INIT_NOTIFICATIONS_REQUEST,
        };
        
        case actions.GET_INIT_NOTIFICATIONS_SUCCESSFUL:            
        return {
            ...state,
          
            type: actions.GET_INIT_NOTIFICATIONS_SUCCESSFUL,
            notifications: payload.notifications,
            unreadNIds: payload.unreadNIds
        };

        case actions.GET_INIT_NOTIFICATIONS_FAILED:            
        return {
            ...state,
          
            type: actions.GET_INIT_NOTIFICATIONS_FAILED,
            message: payload.message
        };
    
        default:
            return state;
    }
}