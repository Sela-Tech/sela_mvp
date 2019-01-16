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
    case authActions.CHANGE_USER_DETAILS_F:
      return {
        ...state,
        action: {
          type: authActions.CHANGE_USER_DETAILS_F,
          message: payload.message
        }
      };

    case authActions.CHANGE_USER_DETAILS_R:
      return {
        ...state,
        action: {
          type: authActions.CHANGE_USER_DETAILS_R
        }
      };

    case authActions.CHANGE_USER_DETAILS_S:
      return {
        ...state,
        action: {
          type: authActions.CHANGE_USER_DETAILS_S
        },
        credentials: payload.data
      };

    case authActions.TOKEN_VERIFICATION_R:
      return {
        ...state,
        action: {
          type: authActions.TOKEN_VERIFICATION_R
        }
      };

    case authActions.TOKEN_VERIFICATION_S:
      return {
        ...state,
        action: {
          type: authActions.TOKEN_VERIFICATION_S,
          message: payload.message || "Logged In Successfully"
        },
        isAuthenticated: true,
        credentials: payload.data
      };

    case authActions.TOKEN_VERIFICATION_F:
      return {
        ...state,
        action: {
          type: authActions.TOKEN_VERIFICATION_F,
          message: payload.message || "Log in Failed"
        }
      };

    case authActions.SIGNIN_R:
      return {
        ...state,
        action: {
          type: authActions.SIGNIN_R
        }
      };

    case authActions.SIGNIN_S:
      return {
        ...state,
        action: {
          type: authActions.SIGNIN_S,
          message: payload.message || "Logged In Successfully"
        },
        isAuthenticated: true,
        credentials: payload.data
      };

    case authActions.SIGNIN_F:
      return {
        ...state,
        action: {
          type: authActions.SIGNIN_F,
          message: payload.message || "Log in Failed"
        }
      };

    case authActions.SIGNUP_R:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_R
        },
        credentials: {
          dashboardType: payload.dashboardType
        }
      };

    case authActions.SIGNUP_S:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_S,
          message: payload.message || "Signed up successfully"
        },
        signUpType: payload.signUpType,
        credentials: {
          ...state.credentials,
          ...payload.credentials
        }
      };

    case authActions.SIGNUP_F:
      return {
        ...state,
        action: {
          type: authActions.SIGNUP_F,
          message: payload.message || "Sign up failed"
        }
      };

    case authActions.INIT_ACCOUNT_RECOVERY_R:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_R
        }
      };

    case authActions.INIT_ACCOUNT_RECOVERY_S:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_S,
          message: payload.message || "Initiated account recovery successfully"
        },
        credentials: payload.credentials
      };

    case authActions.INIT_ACCOUNT_RECOVERY_F:
      return {
        ...state,
        action: {
          type: authActions.INIT_ACCOUNT_RECOVERY_F,
          message: payload.message || "Initiate account recovery failed"
        }
      };

      case authActions.UPDATE_PASSWORD_R:
      return {
        ...state,
        action: {
          type: authActions.UPDATE_PASSWORD_R
        }
      };

    case authActions.UPDATE_PASSWORD_S:
      return {
        ...state,
        action: {
          type: authActions.UPDATE_PASSWORD_S,
          message:
            payload.message || "Password updated successfully"
        }
      };

    case authActions.UPDATE_PASSWORD_F:
      return {
        ...state,
        action: {
          type: authActions.UPDATE_PASSWORD_F,
          message:
            payload.message.msg || "Failed to update password."
        }
      };

      case authActions.EMAIL_VERIFICATION_R:
      return {
        ...state,
        action: {
          type: authActions.EMAIL_VERIFICATION_R,
          message: payload.message
     
        }
      }

      case authActions.EMAIL_VERIFICATION_S:
      return {
        ...state,
        action: {
          type: authActions.EMAIL_VERIFICATION_S,
          message: payload.message
     
        }
      }

      case authActions.EMAIL_VERIFICATION_F:
      return {
        ...state,
        action: {
          type: authActions.EMAIL_VERIFICATION_F,
          message: payload.message
     
        }
      }
      

    case authActions.RESEND_VERIFICATION_R:
    return {
      ...state,
      action: {
        type: authActions.RESEND_VERIFICATION_R,
        message: payload.message
     
      }
    }
    case authActions.RESEND_VERIFICATION_S:
    return {
      ...state,
      action: {
        type: authActions.RESEND_VERIFICATION_S,
        message: payload.message
      }
    }
    case authActions.RESEND_VERIFICATION_F:
    return {
      ...state,
      action: {
        type: authActions.RESEND_VERIFICATION_F,
        message: payload.message
     
      }
    }

    case authActions.SEND_RECOVERY_MAIL_R:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_R
        }
      };

    case authActions.SEND_RECOVERY_MAIL_S:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_S,
          message:
            payload.message || "Sent email for account recovery successfully"
        }
      };

    case authActions.SEND_RECOVERY_MAIL_F:
      return {
        ...state,
        action: {
          type: authActions.SEND_RECOVERY_MAIL_F,
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
