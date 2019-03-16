let b = "https://sela-develop.herokuapp.com/";


const proposals = (type, data)=>{
  switch (type) {
    case "fetch_one_proposal":
    return  b + `proposal/${data.proposal_id}`; 
    case 'fetch':
    return b +  `project/${data.project_id}/proposals`;
    default:
      return  b + "proposals";
  }
}


const evidence = (type, data)=>{
  switch (type) {
    case "submit-evidence":
    return b + `evidence-request-submission`;
    case "get-kpis": 
    return b + `project/${data.id}/evidence-requests`;
    default:
      return  b + "specify-kpi";
  }
}

export default {
  b,
  update_interests: b + "user/area-of-interest",
  email_verification: b + "account/verify?token=",
  resend_verification: b + "verify/account/resend",
  approve: b + "a/approve",
  revoke: b + "a/revoke",
  update_password: b + "password/reset?token=", // ?token=
  fetch_stakeholder_info: b + "users/i",
  notifications:{
    get: b + "notifications",
    marked_viewed: b + "notifications/mark-as-read"
  },
  contractor: {
    fetch_preview_info: b + "project/", //:id/contractor-preview
    fetch_projects_you_proposed: b + "projects/",
    join_or_reject_project: b + "project/" //5c0f90284e5aae025ca8d233/accept
  },
  signin: b + "login",
  a_signin: b + "a/login",
  a_users: b + "a/users",
  signup: b + "register",
  update: b + "update",
  send_recovery_mail: b+ "forgot-password",
  verify_user_token: b + "verifyToken",
  fetch_projects: b + "projects?",
  fetch_project: b + "project/",
  fetch_projects_advanced: b + "user/dashboard-request",
  add_project: b + "project",
  add_document: b + "documents",

  tasks: b + "tasks",
  trn: b + "trn",

  fetch_users: b + "users",
  fetch_locations: b + "locations",
  add_stakeholder: b + "project/stakeholder",
  fetch_tasks: b + "projects", //:id/tasks
  proposals,
  evidence
  // fetch_proposals: (project_id) => proposals('fetch', { project_id }),
  // create_a_proposal: proposals
};

