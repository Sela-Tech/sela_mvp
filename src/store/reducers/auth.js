import authActions from "../actions/auth";
import { clearToken } from "../../helpers/TokenManager";

const initstate = {
  action: {
    type: "",
    message: ""
  },
  isAuthenticated: false,
  credentials: {}
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case authActions.TOKEN_VERIFICATION_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.TOKEN_VERIFICATION_IN_PROGRESS
        }
      };

    case authActions.TOKEN_VERIFICATION_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.TOKEN_VERIFICATION_SUCCESSFUL,
          message: payload.message || "Logged In Successfully"
        },
        isAuthenticated: true,
        credentials: payload.credentials
      };

    case authActions.TOKEN_VERIFICATION_FAILED:
      return {
        ...state,
        action: {
          type: authActions.TOKEN_VERIFICATION_FAILED,
          message: payload.message || "Log in Failed"
        }
      };

    case authActions.SIGNIN_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.SIGNIN_IN_PROGRESS
        }
      };

    case authActions.SIGNIN_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.SIGNIN_SUCCESSFUL,
          message: payload.message || "Logged In Successfully"
        },
        isAuthenticated: true,
        credentials: payload.credentials
      };

    case authActions.SIGNIN_FAILED:
      return {
        ...state,
        action: {
          type: authActions.SIGNIN_FAILED,
          message: payload.message || "Log in Failed"
        }
      };

    case authActions.SIGNUP_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_IN_PROGRESS
        }
      };

    case authActions.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_SUCCESSFUL,
          message: payload.message || "Logged in successfully"
        },
        credentials: payload.credentials
      };

    case authActions.SIGNUP_FAILED:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_FAILED,
          message: payload.message || "Sign up failed"
        }
      };

    case authActions.INIT_ACCOUNT_RECOVERY_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_IN_PROGRESS
        }
      };

    case authActions.INIT_ACCOUNT_RECOVERY_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_SUCCESSFUL,
          message: payload.message || "Initiated account recovery successfully"
        },
        credentials: payload.credentials
      };

    case authActions.INIT_ACCOUNT_RECOVERY_FAILED:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_FAILED,
          message: payload.message || "Initiate account recovery failed"
        }
      };

    case authActions.SEND_RECOVERY_MAIL_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_IN_PROGRESS
        }
      };

    case authActions.SEND_RECOVERY_MAIL_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_SUCCESSFUL,
          message:
            payload.message || "Sent email for account recovery successfully"
        },
        credentials: payload.credentials
      };

    case authActions.SEND_RECOVERY_MAIL_FAILED:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_FAILED,
          message:
            payload.message || "Failed to send email for account recovery email"
        }
      };

    case authActions.SIGNOUT:
      clearToken();
      return {
        ...state,
        isAuthenticated: false
      };

    default:
      return state;
  }
};
