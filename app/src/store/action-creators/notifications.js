import ax from "axios";
import e from "../../endpoints";
import { extractMessage } from "../../helpers/utils";
import not_actions from "../actions/notifications";
import { retrieveToken } from "../../helpers/TokenManager";


export const get_notifications = () => {
    return dispatch=>{
        dispatch({type: not_actions.GET_INIT_NOTIFICATIONS_REQUEST})
            ax({
                url: e.fetch_notifications,
                headers:{
                    authorization: retrieveToken()
                }
            }).then(res=>{
                dispatch({
                    type: not_actions.GET_INIT_NOTIFICATIONS_SUCCESSFUL,
                    notifications: res.data
                })
            }).catch(res=>{
                
                dispatch({
                    type: not_actions.GET_INIT_NOTIFICATIONS_FAILED,
                    message: extractMessage(res)
                });

            })
        
    }
}