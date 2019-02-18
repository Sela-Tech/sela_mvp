import proposal_actions from "../actions/proposal";

export const create_task = (taskData)=>{
    return dispatch=>{
        dispatch({ type: proposal_actions.CREATE_TASK, taskData });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Task Created Successfully."})
        dispatch({type: "CLOSE_MODAL_FORM"})
    }
}

export const create_milestone = (tasks_for_milestone)=>{
    return {type: proposal_actions.CREATE_MILESTONE, tasks_for_milestone }
}

export const set_milestone_name = (name, milestoneId)=>{
    return {type: proposal_actions.SET_MILESTONE_NAME, name, milestoneId}
}

export const switch_view = ()=>{
    return {type: proposal_actions.SWITCH_VIEW}
}

export const set_task_to_modify = id => {
    return { type: proposal_actions.TASK_TO_MODIFY, taskToModify: id}
}