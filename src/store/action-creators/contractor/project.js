import ax from "axios";
import e from "../../../endpoints";
import contractor from "../../actions/contractor/project";
import { retrieveToken } from "../../../helpers/TokenManager";

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