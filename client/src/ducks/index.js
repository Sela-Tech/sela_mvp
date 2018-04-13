import { combineReducers } from 'redux'
import taskReducer, { actionTors as taskActionTors} from './task'
import milestoneReducer, { actionTors as milestoneActionTors} from './milestone'
import projectReducer, { actionTors as projectActionTors} from './project'
import userReducer, { actionTors as userActionTors } from './user'
import contractorReducer, { actionTors as contractorActionTors } from './contractor'

const rootReducer = combineReducers({
  tasks: taskReducer,
  milestones: milestoneReducer,
  projects: projectReducer,
  user: userReducer,
  contractor: contractorReducer
});

export default rootReducer;
export {
    taskActionTors,
    milestoneActionTors,
    projectActionTors,
    userActionTors,
    contractorActionTors
};