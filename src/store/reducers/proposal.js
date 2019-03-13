import proposal_actions from "../actions/proposal";

const init = {
    tasks: [],
    contractor: "",
    milestones: [],
    proposals: [],
    proposal_name: '',
    comments: [],
    task_in_view:{

    },
    proposal_in_view: {
        milestones: []
    },
    type: "",
    message: "",
    view: "proposal"
}

export default (state = init, payload)=>{
    switch (payload.type) {

        case proposal_actions.SET_PROPOSAL_NAME:
        return {
            ...state,
            proposal_name: payload.text
        }
        case proposal_actions.VIEW_TASK:
        let task_in_view;
        
        state.proposal_in_view.milestones.forEach( milestone => {
            milestone.tasks.forEach( task  => {
                if( task.id === payload.id ){
                    return task_in_view = task
                }
            })
        })

        return {
            ...state,
            type: proposal_actions.VIEW_TASK,
            task_in_view
        }
        
        case proposal_actions.GET_ONE_PROPOSAL_R:
        return {
            ...state,
            type: proposal_actions.GET_ONE_PROPOSAL_R
        }

        case proposal_actions.GET_ONE_PROPOSAL_S:
        return {
            ...state,
            type: proposal_actions.GET_ONE_PROPOSAL_S,
            proposal_in_view: payload.proposal
        }

        case proposal_actions.GET_ONE_PROPOSAL_F:
        return {
            ...state,
            type: proposal_actions.GET_ONE_PROPOSAL_F
        }
        
        case proposal_actions.ATTACH_CONTRACTOR:
        return {
            ...state,
            contractor: payload.contractor_id
        }

        case proposal_actions.CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, payload.comment]
            }

        case proposal_actions.CLEAR_PROPOSAL:
            return {
                ...state,
                type: "",
                tasks: [],
                milestones: [],
                comments: [],
                contractor: ""
            }
            
        case proposal_actions.SWITCH_VIEW:
            return {
                ...state,
                view: state.view === "proposal" ? "comments":"proposal"
            }

        case proposal_actions.CREATE_TASK:
            payload.taskData.tempId = state.tasks.length + 1;
            return {
                ...state,
            tasks: [...state.tasks, payload.taskData ]
            }
            
        case proposal_actions.UPDATE_TASK:
            if(Boolean(payload.taskData.milestone)){
                payload.taskData.milestone = parseInt(payload.taskData.milestone,10)
            }
            let task_index;
            let get_task_and_get_index = state.tasks.filter((task,index)=>{
                if(task.tempId === payload.taskData.tempId){
                    task_index = index;
                }
                return true;
            });
            get_task_and_get_index[task_index] = payload.taskData;

            return {
                ...state,
                tasks: get_task_and_get_index
            }

        case proposal_actions.DELETE_TASK:
            return {
                ...state,
                tasks:  [...state.tasks.filter(task=>{
                    return task.tempId !== payload.taskId
                })]
            }

        case proposal_actions.SET_MILESTONE_NAME:   
            let milestone_index;
            let milestones = state.milestones;

            let milestone_needing_name = milestones.filter(
                (milestone,index)=>{
                    if(payload.milestoneId === milestone.milestoneId){
                        milestone_index = index;
                        return true;
                    }
                    return false;
                }
            )[0];

            milestone_needing_name.name = payload.name;
            milestones[milestone_index] = milestone_needing_name;

            return {
                ...state,
                milestones
            }

        case proposal_actions.CREATE_MILESTONE:
            const milestoneId = Math.floor(Math.random() * 1000000000000);

            let tasks =  state.tasks.map(task=>{
                let isMatch = payload.tasks_for_milestone.some(id=>{
                    return id === task.tempId
                })
                if(isMatch){
                    task.milestone = milestoneId;
                }
                return task;
            });

            let milestone = {
                milestoneId,
                name: `Milestone ${state.milestones.length + 1}`
            }

            return {
                ...state,
            tasks,
            milestones: [...state.milestones, milestone]
            }

        case proposal_actions.DELETE_MILESTONE:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if( task.milestone === payload.milestoneId ){
                        task.milestone = undefined;
                    }
                    return task;
                }),
                milestones: state.milestones.filter(milestone => {
                    return milestone.milestoneId !== payload.milestoneId
                })
            }

        case proposal_actions.GET_PROPOSALS_R:
        return {
            ...state,
            type: proposal_actions.GET_PROPOSALS_R
        }

        case proposal_actions.GET_PROPOSALS_F:
        return {
            ...state,
            type: proposal_actions.GET_PROPOSALS_F
        }
        
        case proposal_actions.GET_PROPOSALS_S:
        return {
            ...state,
            type: proposal_actions.GET_PROPOSALS_S,
            proposals: payload.proposals
        }

        case proposal_actions.SUBMIT_PROPOSAL_S:
        return {
            ...state,
            type: proposal_actions.SUBMIT_PROPOSAL_S
        }
        
        default:
            return state;
    }
}