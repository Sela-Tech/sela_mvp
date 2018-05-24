import authActions from "../actions/auth";
import { p, s, f } from "../actions/attempts";

const initstate = {
  action: {
    type: "",
    attempt: "",
    message: ""
  },
  credentials: {}
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case authActions.LOGIN_IN_PROGRES:
      return {
        ...state,
        action: {
          type: authActions.LOGIN_IN_PROGRES,
          attempt: p
        }
      };

    case authActions.LOGIN_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.LOGIN_SUCCESSFUL,
          attempt: s,
          message: payload.message || "Logged In Successfully"
        },
        credentials: payload.credentials
      };

    case authActions.LOGIN_FAILED:
      return {
        ...state,
        action: {
          type: authActions.LOGIN_FAILED,
          attempt: f,
          message: payload.message || "Log in Failed"
        }
      };

    case authActions.SIGNUP_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_IN_PROGRESS,
          attempt: p
        }
      };

    case authActions.SIGNUP_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_SUCCESSFUL,
          attempt: s,
          message: payload.message || "Logged in successfully"
        },
        credentials: payload.credentials
      };

    case authActions.SIGNUP_FAILED:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_FAILED,
          attempt: f,
          message: payload.message || "Sign up failed"
        }
      };

    case authActions.INIT_ACCOUNT_RECOVERY_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_IN_PROGRESS,
          attempt: p
        }
      };

    case authActions.INIT_ACCOUNT_RECOVERY_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_SUCCESSFUL,
          attempt: s,
          message: payload.message || "Initiated account recovery successfully"
        },
        credentials: payload.credentials
      };

    case authActions.INIT_ACCOUNT_RECOVERY_FAILED:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_FAILED,
          attempt: f,
          message: payload.message || "Initiate account recovery failed"
        }
      };

    case authActions.SEND_RECOVERY_MAIL_IN_PROGRESS:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_IN_PROGRESS,
          attempt: p
        }
      };

    case authActions.SEND_RECOVERY_MAIL_SUCCESSFUL:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_SUCCESSFUL,
          attempt: s,
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
          attempt: f,
          message:
            payload.message || "Failed to send email for account recovery email"
        }
      };

    default:
      return state;
  }
};
