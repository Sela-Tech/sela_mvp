import authActions from "../actions/auth";
import { clearToken } from "../../helpers/TokenManager";

const initstate = {
  action: {
    type: "",
    message: ""
  },
  isAuthenticated: false,
  signUpType: "",
  credentials: {
    type: ""
  }
};


export default (state = initstate, payload) => {
  switch (payload.type) {
    case authActions.CHANGE_USER_DETAILS_FAILED:
      return {
        ...state,
        action: {
          type: authActions.CHANGE_USER_DETAILS_FAILED,
          message: payload.message
        }
      };

    case authActions.CHANGE_USER_DETAILS_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.CHANGE_USER_DETAILS_IN_PROGRESS
        }
      };

    case authActions.CHANGE_USER_DETAILS_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.CHANGE_USER_DETAILS_SUCCESSFUL
        },
        credentials: payload.data
      };

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
        credentials: payload.data
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
        credentials: payload.data
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
        },
        credentials: {
          dashboardType: payload.dashboardType
        }
      };

    case authActions.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_SUCCESSFUL,
          message: payload.message || "Logged in successfully"
        },
        signUpType: payload.signUpType,
        credentials: {
          ...state.credentials,
          ...payload.credentials
        }
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




      case authActions.UPDATE_PASSWORD_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.UPDATE_PASSWORD_IN_PROGRESS
        }
      };

    case authActions.UPDATE_PASSWORD_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.UPDATE_PASSWORD_SUCCESSFUL,
          message:
            payload.message || "Password updated successfully"
        }
      };

    case authActions.UPDATE_PASSWORD_FAILED:
      return {
        ...state,
        action: {
          type: authActions.UPDATE_PASSWORD_FAILED,
          message:
            payload.message || "Failed to update password."
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
        }
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

    case authActions.CLEAR:
      return initstate;

    case authActions.SIGNOUT:
      clearToken();
      return {
        ...state,
        isAuthenticated: false,
        action:{
          type: authActions.SIGNOUT
        }
      };

    default:
      return state;
  }
};
