import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from "./project-funder/dashboard";
import projects from "./project-funder/projects";
import tasks from "./project-funder/tasks";

export default combineReducers({
  auth,
  projects,
  dashboard,
  tasks
});
