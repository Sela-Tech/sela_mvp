import ax from "axios";
import e from "../../endpoints";
import { extractMessage } from "../../helpers/utils";
import not_actions from "../actions/notifications";
import { retrieveToken } from "../../helpers/TokenManager";


export const store_socket_data = data => {
    return {
        type: not_actions.SAVE_SOCKET_DATA,
        data
    }
}

export const mark_viewed = unreadNIds =>{
    return dispatch=> {
        dispatch({type: not_actions.MARK_NOTIFICATIONS_R})
        ax({
            url: e.notifications.marked_viewed,
            method: "POST",
            data: {unreadNIds},
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({
                type: not_actions.MARK_NOTIFICATIONS_S
            })
        }).catch(res=>{
            dispatch({
                type: not_actions.MARK_NOTIFICATIONS_F,
                message: extractMessage(res)
            });

        })
    }
}

export const get_notifications = () => {
    return dispatch=>{
        dispatch({type: not_actions.GET_INIT_NOTIFICATIONS_R})
            ax({
                url: e.notifications.get,
                headers:{
                    authorization: retrieveToken()
                }
            }).then(res=>{
                dispatch({
                    type: not_actions.GET_INIT_NOTIFICATIONS_S,
                    notifications: res.data.notifications,
                    unreadNIds: res.data.unreadNIds
                })
            }).catch(res=>{
                
                dispatch({
                    type: not_actions.GET_INIT_NOTIFICATIONS_F,
                    message: extractMessage(res)
                });

            })
    }
}