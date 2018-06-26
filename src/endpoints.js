const b = process.env.REACT_APP_BACKEND_SERVER_BASEURL,
  t = process.env.mREACT_APP_BACKEND_SERVER_BASEURL;

export default {
  signin: b + "login",
  signup: b + "register",
  send_recovery_mail: "",
  verify_user_token: b + "verifyToken",

  fetch_projects: t + "projects",
  fetch_project: t + "project/",
  add_project: t + "projects",
  add_task: t + "task",
  fetch_taks: t + "projects" //:id/tasks
};
