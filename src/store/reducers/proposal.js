import proposal_actions from "../actions/proposal";

const init = {
    tasks: [...[1,2,3,4,5].map(i=>{
        return {
            tempId: i,
            name: 'task',
            description:'This task will involve the quantity surveyor contractor going over the entire area for the proposed project and mapping out the places that will be covered in the course of the project',
            amount: 5000,
            deadline: new Date().toISOString(),
            milestone: undefined
            }
    })
    ],
    milestones: [],
    type: "",
    message: "",
    view: "proposal",
    taskToModify: ""
}

export default (state = init, payload)=>{
switch (payload.type) {

    case proposal_actions.TASK_TO_MODIFY:
    return {
        ...state,
        taskToModify: payload.taskToModify
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

    case proposal_actions.SET_MILESTONE_NAME:   
        let milestone_needing_name = state.milestones.filter(milestone=>{
            return payload.milestoneId === milestone.milestoneId
        })[0];

        milestone_needing_name.name = payload.name;

        let other_milestones = state.milestones.filter(milestone=>{
            return milestone.milestoneId !== payload.milestoneId
        })
        
        other_milestones.push(milestone_needing_name);

        return {
            ...state,
            milestones: other_milestones
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
            name: ''
        }
        return {
            ...state,
           tasks,
           milestones: [...state.milestones, milestone]
        }

    default:
        return state;
}
}