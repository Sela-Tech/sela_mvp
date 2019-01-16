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

        case actions.MARK_NOTIFICATIONS_S:
        return {
            ...state,
            unreadNIds: []
        }

        case actions.GET_INIT_NOTIFICATIONS_R:            
        return {
            ...state,
            type: actions.GET_INIT_NOTIFICATIONS_R,
        };
      
        case actions.UPDATE_NOTIFICATIONS_S:            
        return {
            ...state, 
            type: actions.UPDATE_NOTIFICATIONS_S,
            notifications: payload.notifications,
            unreadNIds: payload.unreadNIds
        };

        case actions.GET_INIT_NOTIFICATIONS_S:            
        return {
            ...state,
          
            type: actions.GET_INIT_NOTIFICATIONS_S,
            notifications: payload.notifications,
            unreadNIds: payload.unreadNIds
        };

        case actions.GET_INIT_NOTIFICATIONS_F:            
        return {
            ...state,
          
            type: actions.GET_INIT_NOTIFICATIONS_F,
            message: payload.message
        };
    
        default:
            return state;
    }
}