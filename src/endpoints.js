const b = process.env.REACT_APP_BACKEND_SERVER_BASEURL;

export default {
  signin: b + "login",
  signup: b + "register",
  send_recovery_mail: "",
  verify_user_token: b + "verify-token",

  dashboard_fetch_projects: b + "projects",
  dashboard_add_project: b + "projects"
};
