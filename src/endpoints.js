let b = "";

if (process.env.NODE_ENV === "development") {
  b = "http://localhost:3000/";
} else {
  b = "https://sela-labs.herokuapp.com/";
}
export default {
  b,
  fetch_stakeholder_info: b + "users/i",
  signin: b + "login",
  signup: b + "register",
  update: b + "update",
  send_recovery_mail: "",
  verify_user_token: b + "verifyToken",
  fetch_projects: b + "projects?",
  fetch_project: b + "project/",
  fetch_organizations: b + "organizations",
  add_project: b + "project",
  add_task: b + "task",
  get_tasks: b + "tasks",
  fetch_users: b + "users",
  fetch_locations: b + "locations",
  add_stakeholder: b + "project/stakeholder",
  fetch_tasks: b + "projects" //:id/tasks
};
