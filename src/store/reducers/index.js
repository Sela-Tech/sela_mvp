import { combineReducers } from "redux";
import auth from "./auth";
import dashboard from "./project-funder/dashboard";
import projects from "./project-funder/projects";
import tasks from "./project-funder/tasks";
import home from "./homepage";
import organizations from "./organizations";
import admin from "./admin";
import transactions from "./project-funder/transactions";
import document from "./project-funder/document";
import app from "./app";

export default combineReducers({
  auth,
  admin,
  projects,
  dashboard,
  tasks,
  transactions,
  home,
  organizations,
  document,
  app
});
