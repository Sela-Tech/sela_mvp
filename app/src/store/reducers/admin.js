import admin from "../actions/admin";

const init = {
  type: "",
  isAdminLoggedIn: false,
  users: [],
  user: {
    id: "",
    userActivationResponse: ""
  }
};

export default (state = init, payload) => {
  switch (payload.type) {
    case admin.APPROVE_IN_PROGRESS:
      return {
        ...state,
        type: admin.APPROVE_IN_PROGRESS,
        user: {
          id: payload.userId,
          userActivationResponse: ""
        }
      };

    case admin.APPROVE_SUCCESSFUL:
      return {
        ...state,
        type: admin.APPROVE_SUCCESSFUL,
        user: {
          ...state.user,
          userActivationResponse: payload.activationResponse
        }
      };

    case admin.APPROVE_FAILED:
      return {
        ...state,
        type: admin.APPROVE_FAILED
      };

    case admin.REVOKE_IN_PROGRESS:
      return {
        ...state,
        type: admin.REVOKE_IN_PROGRESS,
        user: {
          id: payload.userId,
          userActivationResponse: ""
        }
      };

    case admin.REVOKE_SUCCESSFUL:
      return {
        ...state,
        type: admin.REVOKE_SUCCESSFUL,
        user: {
          ...state.user,
          userActivationResponse: payload.activationResponse
        }
      };

    case admin.REVOKE_FAILED:
      return {
        ...state,
        type: admin.REVOKE_FAILED
      };

    case admin.SIGNIN_IN_PROGRESS:
      return {
        ...state,
        type: admin.SIGNIN_IN_PROGRESS
      };

    case admin.SIGNIN_SUCCESSFUL:
      return {
        ...state,
        type: admin.SIGNIN_SUCCESSFUL,
        isAdminLoggedIn: true
      };

    case admin.SIGNIN_FAILED:
      return {
        ...state,
        type: admin.SIGNIN_FAILED
      };

    case admin.APPROVE_USER_IN_PROGRESS:
      return {
        ...state,
        type: admin.APPROVE_USER_IN_PROGRESS
      };

    case admin.APPROVE_USER_SUCCESSFUL:
      return {
        ...state,
        type: admin.APPROVE_USER_SUCCESSFUL
      };

    case admin.APPROVE_USER_FAILED:
      return {
        ...state,
        type: admin.APPROVE_USER_FAILED
      };

    case admin.FETCH_USERS_IN_PROGRESS:
      return {
        ...state,
        type: admin.FETCH_USERS_IN_PROGRESS
      };

    case admin.FETCH_USERS_SUCCESSFUL:
      return {
        ...state,
        type: admin.FETCH_USERS_SUCCESSFUL,
        users: payload.users
      };

    case admin.FETCH_USERS_FAILED:
      return {
        ...state,
        type: admin.FETCH_USERS_FAILED
      };

    default:
      return state;
  }
};
