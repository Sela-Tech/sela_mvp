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
                authorization: retrieveToken() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb24iOnsibmFtZSI6Ik5vIE9yZ2FuaXphdGlvbiIsImlkIjoiIn0sInByb2ZpbGVQaG90byI6Imh0dHBzOi8vczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vc2VsYW12cC91c2VyLWF2YXRhcnMvMmUzMmEyM2MtMjJmMy00NGVlLTk3NzMtZDE5ZWVjZTY1MmMwXzA3Nm5zWDFYXzQwMHg0MDAuanBnIiwiaWQiOiI1YzdlNWU0YjA1ZWRkYTAwMjJlNTA4OTIiLCJpc0Z1bmRlciI6dHJ1ZSwiaXNFdmFsdWF0b3IiOmZhbHNlLCJpc0NvbnRyYWN0b3IiOmZhbHNlLCJmaXJzdE5hbWUiOiJTdXN0YWluYWJpbGl0eSIsInBob25lIjoiMDgwMDAwMDAwIiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiSW50ZXJuYXRpb25hbCIsImFyZWFzT2ZJbnRlcmVzdCI6WyJObyBQb3ZlcnR5IiwiWmVybyBIdW5nZXIiLCJIZWFsdGggJiBXZWxsLWJlaW5nIiwiUXVhbGl0eSBFZHVjYXRpb24iLCJMaWZlIEJlbG93IFdhdGVyIiwiTGlmZSBvbiBMYW5kIiwiUmVzcG9uc2libGUgQ29uc3VtcHRpb24gJiBQcm9kdWN0aW9uIiwiUGVhY2UsIEp1c3RpY2UgQW5kIFN0cm9uZyBJbnN0aXR1dGlvbnMiLCJQYXJ0bmVyc2hpcCBGb3IgVGhlIEdvYWxzIl0sImlhdCI6MTU1NDUwMjc5OCwiZXhwIjoxNTU1MTA3NTk4fQ.rTw1NOt9yl9VeTl6IoBUafqxmZgdbUepSqWDzjStSCI'
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