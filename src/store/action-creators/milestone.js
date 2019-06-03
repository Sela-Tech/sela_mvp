import proposal_actions from "../actions/milestone";
import Axios from "axios";
import { retrieveToken } from "../../helpers/TokenManager";
import endpoints from "../../endpoints";
import { extractMessage } from "../../helpers/utils";

export const create_task = taskData => {
    return dispatch=>{
        dispatch({ type: proposal_actions.CREATE_TASK, taskData });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Task Created Successfully."})
        dispatch({type: "CLOSE_MODAL_FORM"})
    }
}

export const update_task = taskData => {
    return dispatch=>{
        dispatch({ type: proposal_actions.UPDATE_TASK, taskData });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Task Updated Successfully."})
        dispatch({type: "CLOSE_MODAL_FORM"})
    }
}

export const delete_task = (taskData) => {
    return dispatch=>{
        dispatch({ type: proposal_actions.DELETE_TASK, taskId: taskData.taskId, taskData });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Task Deleted Successfully."})
        dispatch({type: "CLOSE_MODAL_FORM"})
    }
}

export const attach_contractor  = contractor_id => {
    return { type: proposal_actions.ATTACH_CONTRACTOR,  contractor_id }
}

export const create_milestone = (tasks_for_milestone)=>{
    return {type: proposal_actions.CREATE_MILESTONE, tasks_for_milestone }
}

export const set_milestone_name = (name, milestoneId)=>{
    return {type: proposal_actions.SET_MILESTONE_NAME, name, milestoneId}
}

export const delete_milestone = milestoneId => {
    return {type: proposal_actions.DELETE_MILESTONE, milestoneId}
}

export const switch_view = ()=>{
    return {type: proposal_actions.SWITCH_VIEW}
}

export const set_task_to_modify = id => {
    return { type: proposal_actions.TASK_TO_MODIFY, taskToModify: id}
}

export const clear = () => ({ type: proposal_actions.CLEAR_PROPOSAL})

export const get_proposals = project_id => {
    return dispatch => {
        dispatch({ type: proposal_actions.GET_PROPOSALS_R})
        Axios({
            url: endpoints.proposals("fetch", { project_id }),
            method: "GET",
            headers: {
                "authorization": retrieveToken()
            }
        }).then(res=>{
            dispatch({
                type: proposal_actions.GET_PROPOSALS_S,
                proposals: res.data.proposals
            })
        }).catch(res=>{
            dispatch({
                type: proposal_actions.GET_PROPOSALS_F
            });
            dispatch({ type: "NEW_TOAST", status: "error", message: "Could Not Fetch Proposals."})
        })
    }
}

export const create_proposal = obj =>{
    return dispatch => {
        dispatch({ type: proposal_actions.SUBMIT_PROPOSAL_R })
        Axios({
            url: endpoints.proposals(),
            method: "POST",
            data: obj,
            headers: {
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: proposal_actions.SUBMIT_PROPOSAL_S, response: res.data });
            dispatch({ type: "NEW_TOAST", status: "success", message: "Milestone Created Successfully."})
        }).catch(res=>{
            dispatch({ type: proposal_actions.SUBMIT_PROPOSAL_F, response: res.data });
            dispatch({ type: "NEW_TOAST", status: "error", message: "Could Not Create Milestone."})
        })
    }
}

export const get_proposal = milestone_id => {
    return dispatch =>{
        dispatch({ type: proposal_actions.GET_ONE_PROPOSAL_R });
        Axios({
            url: endpoints.proposals('fetch_one_proposal',{ milestone_id }),
            method: "GET",
            headers:{
                authorization: retrieveToken()
            }
        }).then(res=>{
            dispatch({ type: proposal_actions.GET_ONE_PROPOSAL_S, milestone: res.data.proposal })
        }).catch(res=>{
            dispatch({ type: proposal_actions.GET_ONE_PROPOSAL_F })
            dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) })
        })
    }
}

export const create_comment = text => {
    return  { type: proposal_actions.CREATE_COMMENT, comment: text }
}

export const set_proposal_name = text => {
    return {
        type: proposal_actions.SET_PROPOSAL_NAME, text
    }
}