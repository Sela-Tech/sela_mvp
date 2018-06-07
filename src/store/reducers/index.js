import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from "./dashboard";
import projects from "./projects";
import tasks from "./tasks";

export default combineReducers({
  auth,
  projects,
  dashboard,
  tasks
});
