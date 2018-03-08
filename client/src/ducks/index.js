import { combineReducers } from 'redux'
import taskReducer, { actionTors as taskActionTors} from './task'
import milestoneReducer, { actionTors as milestoneActionTors} from './milestone'
import projectReducer, { actionTors as projectActionTors} from './project'
import userReducer, { actionTors as userActionTors } from './user'

const rootReducer = combineReducers({
  tasks: taskReducer,
  milestones: milestoneReducer,
  projects: projectReducer,
  user: userReducer
});

export default rootReducer;
export {
    taskActionTors,
    milestoneActionTors,
    projectActionTors,
    userActionTors
};