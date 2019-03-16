import endpoints from "../../endpoints";
import Axios from "axios";
import { retrieveToken } from "../../helpers/TokenManager";
import * as evidence from "../actions/evidence";
import {CLOSE_MODAL_FORM} from "../actions/modal";

export const specifyKPI = data=>{
    return dispatch => {
        dispatch({ type:  evidence.SPECIFY_KPI_R})
        Axios({
            url: endpoints.evidence(),
            method: 'POST',
            data,
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type:  evidence.SPECIFY_KPI_S });
            dispatch({ type: "NEW_TOAST", status: "success", message: "New KPI Created" });
            dispatch({ type: CLOSE_MODAL_FORM });
            dispatch(getKPIs(data.project))
        }).catch(res=>{
            dispatch({ type:  evidence.SPECIFY_KPI_F })
            dispatch({ type: "NEW_TOAST", status: "error", message: "Could Not Create KPI."})
        })
    }
}

export const getKPIs = id => {
    return dispatch => {
        dispatch({ type:  evidence.RETRIEVE_KPIS_R})
        Axios({
            url: endpoints.evidence("get-kpis", { id }),
            method: 'GET',
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type:  evidence.RETRIEVE_KPIS_S, kpis: res.data.evidenceRequests })
        }).catch(res=>{
            dispatch({ type:  evidence.RETRIEVE_KPIS_F })
        })
    }
}

export const submitEvidence = data => {
    return dispatch => {
        dispatch({type: evidence.SUBMIT_EVIDENCE_R})
        Axios({
            url: endpoints.evidence("submit-evidence"),
            method: "PUT",
            data,
            headers: {
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({type: evidence.SUBMIT_EVIDENCE_S})
            dispatch({ type: "NEW_TOAST", status: "success", message: "Evidence Submitted Successfully" });
            dispatch({ type: CLOSE_MODAL_FORM });
        }).catch(res=>{
            dispatch({type: evidence.SUBMIT_EVIDENCE_F})

        })
    }
}
