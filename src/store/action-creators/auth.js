import ax from "axios";
import authActions from "../actions/auth";
import e from "../../endpoints";
import Qs from "querystring";
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
      data: Qs.stringify({ token: retrieveToken() }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(({ data }) => {
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
  return dispatch => {
    dispatch({
      type: authActions.SIGNUP_IN_PROGRESS,
      dashboardType: obj["sign-up-type"]
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
