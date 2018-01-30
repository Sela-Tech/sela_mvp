import { combineReducers } from 'redux'
import taskReducer, { actionTors as taskActionTors} from './task'
import milestoneReducer, { actionTors as milestoneActionTors} from './milestone'
import projectReducer, { actionTors as projectActionTors} from './project'

const rootReducer = combineReducers({
  tasks: taskReducer,
  milestones: milestoneReducer,
  projects: projectReducer
});

export default rootReducer;