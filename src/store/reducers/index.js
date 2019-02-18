import { combineReducers } from "redux";
import auth from "./auth";
import modal from ".//project-funder/modal";
import projects from "./projects";
import tasks from "./project-funder/tasks";
import home from "./homepage";
import organizations from "./organizations";
import admin from "./admin";
import transactions from "./project-funder/transactions";
import document from "./project-funder/document";
import app from "./app";
import notification_state from "./notifications";
import contractor from "./contractor/project";
import proposal from "./proposal";
export default combineReducers({
  auth,
  admin,
  projects,
  modal,
  proposal,
  tasks,
  transactions,
  home,
  organizations,
  document,
  app,
  contractor,
  notification_state
});
