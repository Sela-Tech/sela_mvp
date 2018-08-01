import ax from "axios";
import authActions from "../actions/auth";
import e from "../../endpoints";
// import Qs from "querystring";
import { retrieveToken, setToken } from "../../helpers/TokenManager";

export const signout = () => {
  return { type: authActions.SIGNOUT };
};

export const signin = obj => {
  return dispatch => {
    dispatch({ type: authActions.SIGNIN_IN_PROGRESS });
    ax({
      url: e.signin,
      method: "POST",
      data: obj
    })
      .then(({ data }) => {
        if (data.token) {
          if (obj.rememberMe) {
            setToken("ls", data.token);
          } else {
            setToken("ss", data.token);
          }
          switch (true) {
            case data.isEvaluator:
              data.signUpType = "evaluation-agent";
              break;
            case data.isContractor:
              data.signUpType = "contractor";
              break;

            case data.isFunder:
              data.signUpType = "project-funder";
              break;
            default:
              data.signUpType = undefined;
          }

          dispatch({ type: authActions.SIGNIN_SUCCESSFUL, data });
        } else {
          let message = data.message;
          dispatch({ type: authActions.SIGNIN_FAILED, message });
        }
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "Connection Error";
        }
        dispatch({ type: authActions.SIGNIN_FAILED, message });
      });
  };
};

export const verify_user_token = () => {
  return dispatch => {
    dispatch({ type: authActions.TOKEN_VERIFICATION_IN_PROGRESS });
    ax({
      url: e.verify_user_token,
      method: "POST",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        switch (true) {
          case data.isEvaluator:
            data.signUpType = "evaluation-agent";
            break;
          case data.isContractor:
            data.signUpType = "contractor";
            break;

          case data.isFunder:
            data.signUpType = "project-funder";
            break;
          default:
            data.signUpType = undefined;
        }

        dispatch({ type: authActions.TOKEN_VERIFICATION_SUCCESSFUL, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "Connection Error";
        }
        dispatch({ type: authActions.TOKEN_VERIFICATION_FAILED, message });
      });
  };
};

export const signup = obj => {
  switch (obj.signUpType) {
    case "evaluation-agent":
      obj.isEvaluator = true;
      break;
    case "contractor":
      obj.isContractor = true;
      break;
    default:
      obj.isFunder = true;
  }

  delete obj.signUpType;

  return dispatch => {
    dispatch({
      type: authActions.SIGNUP_IN_PROGRESS,
      dashboardType: obj["signUpType"]
    });
    ax({
      url: e.signup,
      method: "POST",
      data: obj
    })
      .then(({ data }) => {
        dispatch({ type: authActions.SIGNUP_SUCCESSFUL, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.SIGNUP_FAILED, message });
      });
  };
};

export const send_recovery_mail = obj => {
  return dispatch => {
    dispatch({ type: authActions.SEND_RECOVERY_MAIL_IN_PROGRESS });
    ax({
      url: e.send_recovery_mail,
      method: "POST",
      data: obj
    })
      .then(({ data }) => {
        dispatch({ type: authActions.SEND_RECOVERY_MAIL_SUCCESSFUL, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.SEND_RECOVERY_MAIL_FAILED, message });
      });
  };
};

export const change_phone = obj => {
  return dispatch => {
    dispatch({ type: authActions.CHANGE_PHONE_NUMBER_IN_PROGRESS });
    ax({
      method: "POST",
      data: obj,
      url: e.change_phone,
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({ type: authActions.CHANGE_PHONE_NUMBER_SUCCESSFUL, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.CHANGE_PHONE_NUMBER_FAILED, message });
      });
  };
};

export const change_pass = obj => {
  return dispatch => {
    dispatch({ type: authActions.CHANGE_PASSWORD_IN_PROGRESS });
    ax({
      method: "POST",
      data: obj,
      url: e.change_pass,
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({ type: authActions.CHANGE_PASSWORD_SUCCESSFUL, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.CHANGE_PASSWORD_FAILED, message });
      });
  };
};

export const change_email = obj => {
  return dispatch => {
    dispatch({ type: authActions.CHANGE_EMAIL_IN_PROGRESS });
    ax({
      method: "POST",
      data: obj,
      url: e.change_email,
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({ type: authActions.CHANGE_EMAIL_SUCCESSFUL, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.CHANGE_EMAIL_FAILED, message });
      });
  };
};