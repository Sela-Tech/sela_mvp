const b = "https://sela-labs.herokuapp.com/";

export default {
  signin: b + "login",
  signup: b + "register",
  change_phone: b + "changePhone",
  change_pass: b + "changePassword",
  change_email: b + "changeEmail",
  send_recovery_mail: "",
  verify_user_token: b + "verifyToken",
  fetch_projects: b + "projects",
  fetch_project: b + "project/",
  add_project: b + "project",
  add_task: b + "task",
  get_tasks: b + "tasks",
  fetch_taks: b + "projects" //:id/tasks
};
