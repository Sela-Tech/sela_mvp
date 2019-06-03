import endpoints from "../../endpoints";
import Axios from "axios";
import { retrieveToken } from "../../helpers/TokenManager";
import * as evidence from "../actions/evidence";
import {CLOSE_MODAL_FORM} from "../actions/modal";

export const clearSub = () => {
    return {type: evidence.CLEAR_SUBMISSIONS_STORE }
}

export const retrieveSubmission = obj=>{
    return dispatch => {
        dispatch({ type:  evidence.RETRIEVE_SUBMISSION_R })        
        Axios({
            url: endpoints.evidence('retrieve-submission', obj ),
            method: 'GET',
            headers:{
                authorization: retrieveToken() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOnsibmFtZSI6Ik5vIE9yZ2FuaXphdGlvbiIsImlkIjoiIn0sInByb2ZpbGVQaG90byI6Imh0dHBzOi8vczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vc2VsYW12cC91c2VyLWF2YXRhcnMvNzg2YmFiZmUtMzZlZS00NGZmLTk1MTEtOTljZmQ3YmZlYTljX1NjcmVlblNob3QyMDE5LTA0LTA4YXQ2LjQ0LjQ5UE0ucG5nIiwiaWQiOiI1YzdlNWU0YjA1ZWRkYTAwMjJlNTA4OTIiLCJpc0Z1bmRlciI6dHJ1ZSwiaXNFdmFsdWF0b3IiOmZhbHNlLCJpc0NvbnRyYWN0b3IiOmZhbHNlLCJmaXJzdE5hbWUiOiJTdXN0YWluYWJpbGl0eSIsInBob25lIjoiMDgwMDAwMDAwIiwiZW1haWwiOiJzaUBzZWxhLWxhYnMuY28iLCJsYXN0TmFtZSI6IkludGVybmF0aW9uYWwiLCJhcmVhc09mSW50ZXJlc3QiOlsiTm8gUG92ZXJ0eSIsIlplcm8gSHVuZ2VyIiwiSGVhbHRoICYgV2VsbC1iZWluZyIsIlF1YWxpdHkgRWR1Y2F0aW9uIiwiTGlmZSBCZWxvdyBXYXRlciIsIkxpZmUgb24gTGFuZCIsIlJlc3BvbnNpYmxlIENvbnN1bXB0aW9uICYgUHJvZHVjdGlvbiIsIlBlYWNlLCBKdXN0aWNlIEFuZCBTdHJvbmcgSW5zdGl0dXRpb25zIiwiUGFydG5lcnNoaXAgRm9yIFRoZSBHb2FscyJdLCJpYXQiOjE1NTU0MTgxMzYsImV4cCI6MTU1NjAyMjkzNn0.zmZdfgaIIHDv8hEWcfCAgkTwMv-kArzPg-gpXruKIZ4'
            }
        }).then(res=>{
            dispatch({ type:  evidence.RETRIEVE_SUBMISSION_S, submissions: res.data })
        }).catch(res=>{
            dispatch({ type:  evidence.RETRIEVE_SUBMISSION_F })
        })
    }
}

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
            dispatch({type: evidence.UPDATE_OBSERVATION_BUDGET, amount: data.price })
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

export const selectTask = ( milestone, taskId ) => {
    return { type: evidence.SELECT_TASK_SUBMISSIONS, milestone, taskId }
}