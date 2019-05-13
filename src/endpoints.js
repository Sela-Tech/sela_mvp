let b = "https://sela-develop.herokuapp.com/";


const proposals = (type, data)=>{
  switch (type) {
    case "fetch_one_proposal":
    return  b + `proposal/${data.milestone_id}`; 
    case 'fetch':
    return b +  `project/${data.project_id}/proposals`;
    default:
      return  b + "proposals";
  }
}

const evidence = (type, obj)=>{
  switch (type) {
    case "retrieve-submission":
    return b + `project/${obj.projectId}/submissions?level=${obj.level}${obj.proposalId ? `&proposalId=${obj.proposalId}`:``}`;

    case "submit-evidence":
    return b + `evidence-request-submission`;

    case "get-kpis": 
    return b + `project/${obj.id}/evidence-requests`;

    default:
      return  b + "specify-kpi";
  }
}

const fake_wallet_endpoints = (type,projectId, userId)=>{
  let c = "https://obscure-depths-61467.herokuapp.com/";
  switch (type) {

    case 'c-transactions':
    return c + `wallet/${projectId}/c/${userId}`

    case 'transactions':
    return c + `wallet/${projectId}/${userId}`;

    default:
    return c + "wallet";
  }
}

const wallet_endpoints = (type, projectId) => {
  switch (type) {

    case "project-asset-balance":
      return b + `project/${projectId}/asset-balance`;

    case "project-transaction-history":
      return b + `project/${projectId}/transaction-history`; 

    case "self-acount-transaction-history":
      return b + `user/wallet-transaction-history`;

    case "self-account-balance":
      return b + `balances`

    case "transfer":
      return b + `fund/transfer`;
  
    default:
      return b;
  }
}

export default {
  b,
  wallet: fake_wallet_endpoints,
  r_wallet: wallet_endpoints,
  fetch_organizations: b + "organizations",
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
  evidence,
  public_updates: id =>  b + `project/${id}/updates/submissions`,
  public_transactions: id => b +  `projects/${id}/transaction-history/public`
  // fetch_proposals: (project_id) => proposals('fetch', { project_id }),
  // create_a_proposal: proposals
};

