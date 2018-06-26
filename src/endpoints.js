const b = process.env.REACT_APP_BACKEND_SERVER_BASEURL;

export default {
  signin: b + "login",
  signup: b + "register",
  send_recovery_mail: "",
  verify_user_token: b + "verifyToken",

  fetch_projects: b + "projects",
  fetch_project: b + "project/",
  add_project: b + "projects",
  add_task: b + "task",
  fetch_taks: b + "projects" //:id/tasks
};
