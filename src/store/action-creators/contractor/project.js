import ax from "axios";
import e from "../../../endpoints";
import { extractMessage } from "../../../helpers/utils";
import contractor from "../../actions/contractor/project";
import { retrieveToken } from "../../../helpers/TokenManager";

export const join_or_reject_project = (agreed,id, notif_id)=>{
  return dispatch => {
      ax({
          url: e.contractor.join_or_reject_project + id + `/accept?notification=${notif_id}` ,
          method: "PUT",
          data: {
              agreed
          },
          headers: {
              authorization: retrieveToken()
          }
      }).then( res => {
        let message = res.data.message;       
        if( Boolean(message) === false ){
            message = agreed === true
            ? "You Successfully Joined The Project"
            : "You Rejected The Invitation"
        }
        dispatch({ type: "NEW_TOAST", status: "success", message })
     
    }).catch( res => {
          let message = extractMessage(res);

          if( !Boolean(message)){
              message = agreed === true
              ? "You Could Not Accept The Project Invitation"
              : "You Could Not Reject The Invitation" 
          }
          
        dispatch({ type: "NEW_TOAST", status: "error",  message })

      })
  }
}

export const fetchPreviewInfo = id =>{
  return dispatch => {
    dispatch({ type: contractor.FETCH_P_P_R })
    ax({
      url: e.contractor.fetch_preview_info + id + "/contractor-preview",
      method: "GET",
      headers:{
        authorization: retrieveToken()
      }
    }).then(res=>{
      dispatch({ type: contractor.FETCH_P_P_S, data: res.data })
    }).catch(res=>{
      dispatch({ type: contractor.FETCH_P_P_F })
    })
  }
}