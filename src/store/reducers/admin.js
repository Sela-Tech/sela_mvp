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
    case admin.APPROVE_R:
      return {
        ...state,
        type: admin.APPROVE_R,
        user: {
          id: payload.userId,
          userActivationResponse: ""
        }
      };

    case admin.APPROVE_S:
      return {
        ...state,
        type: admin.APPROVE_S,
        user: {
          ...state.user,
          userActivationResponse: payload.activationResponse
        }
      };

    case admin.APPROVE_F:
      return {
        ...state,
        type: admin.APPROVE_F
      };

    case admin.REVOKE_R:
      return {
        ...state,
        type: admin.REVOKE_R,
        user: {
          id: payload.userId,
          userActivationResponse: ""
        }
      };

    case admin.REVOKE_S:
      return {
        ...state,
        type: admin.REVOKE_S,
        user: {
          ...state.user,
          userActivationResponse: payload.activationResponse
        }
      };

    case admin.REVOKE_F:
      return {
        ...state,
        type: admin.REVOKE_F
      };

    case admin.SIGNIN_R:
      return {
        ...state,
        type: admin.SIGNIN_R
      };

    case admin.SIGNIN_S:
      return {
        ...state,
        type: admin.SIGNIN_S,
        isAdminLoggedIn: true
      };

    case admin.SIGNIN_F:
      return {
        ...state,
        type: admin.SIGNIN_F
      };

    case admin.APPROVE_USER_R:
      return {
        ...state,
        type: admin.APPROVE_USER_R
      };

    case admin.APPROVE_USER_S:
      return {
        ...state,
        type: admin.APPROVE_USER_S
      };

    case admin.APPROVE_USER_F:
      return {
        ...state,
        type: admin.APPROVE_USER_F
      };

    case admin.GET_USERS_R:
      return {
        ...state,
        type: admin.GET_USERS_R
      };

    case admin.GET_USERS_S:
      return {
        ...state,
        type: admin.GET_USERS_S,
        users: payload.users
      };

    case admin.GET_USERS_F:
      return {
        ...state,
        type: admin.GET_USERS_F
      };

    default:
      return state;
  }
};
