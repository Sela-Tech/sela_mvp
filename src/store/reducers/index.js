import { combineReducers } from "redux";
import auth from "./auth";
import modal from ".//project-funder/modal";
import projects from "./project-funder/projects";
import tasks from "./project-funder/tasks";
import home from "./homepage";
import organizations from "./organizations";
import admin from "./admin";
import transactions from "./project-funder/transactions";
import document from "./project-funder/document";
import app from "./app";
import notification_state from "./notifications";
import contractor from "./contractor/project";

export default combineReducers({
  auth,
  admin,
  projects,
  modal,
  tasks,
  transactions,
  home,
  organizations,
  document,
  app,
  contractor,
  notification_state
});
