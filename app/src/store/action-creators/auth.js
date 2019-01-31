import ax from "axios";
import authActions from "../actions/auth";
import e from "../../endpoints";
import { retrieveToken, setToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";

export const signout = () => {
  return { type: authActions.SIGNOUT };
};

export const update_password = (obj,token)=>{
  return dispatch=>{
    dispatch({ type: authActions.UPDATE_PASSWORD_R });
    ax({
      url: e.update_password + token,
      method: "PUT",
      data: obj,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=>{
      dispatch({ type: authActions.UPDATE_PASSWORD_S, data: res.data });
    })
    .catch(({ response }) => {
      let message;
      if (response) {
        message = response.message || response.data.message;
      } else {
        message = "Connection Error";
      }
       dispatch({ type: authActions.UPDATE_PASSWORD_F, message });
    });
  }
}

export const email_verify = (token)=>{
  return dispatch => {
    dispatch({ type: authActions.EMAIL_VERIFICATION_R });
    ax({
      url: e.email_verification + token,
      method: "PUT",
      data: { token }
    }).then(res=>{
      dispatch({ type: authActions.EMAIL_VERIFICATION_S, message: "Email Verified Successfully" });
    }).catch(res=>{
      dispatch({ type: authActions.EMAIL_VERIFICATION_F, message: extractMessage(res) });
    })
  }  
}

export const resend_verification_mail = field => {
  return dispatch => {
    dispatch({ type: authActions.RESEND_VERIFICATION_R });
    ax({
      url: e.resend_verification,
      method: "PUT",
      data: { field }
    }).then(res=>{
      dispatch({ type: authActions.RESEND_VERIFICATION_S, message: extractMessage(res) });
    }).catch(res=>{
      dispatch({ type: authActions.RESEND_VERIFICATION_F, message: extractMessage(res) });
    })
  }
}

export const signin = obj => {
  return dispatch => {
    dispatch({ type: authActions.SIGNIN_R });
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

          dispatch({ type: authActions.SIGNIN_S, data, message: data.message });
        } else {
          let message = data.message;
          dispatch({ type: authActions.SIGNIN_F, message });
        }
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "Connection Error";
        }
        dispatch({ type: authActions.SIGNIN_F, message });
      });
  };
};

export const verify_user_token = () => {
  return dispatch => {
    dispatch({ type: authActions.TOKEN_VERIFICATION_R });
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

        dispatch({ type: authActions.TOKEN_VERIFICATION_S, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "Connection Error";
        }
        dispatch({ type: authActions.TOKEN_VERIFICATION_F, message });
      });
  };
};

export const signup = obj => {
  
  const signUpType = obj.signUpType;
 
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
      type: authActions.SIGNUP_R,
      dashboardType: obj["signUpType"]
    });
    ax({
      url: e.signup,
      method: "POST",
      data: obj
    })
      .then(({ data }) => {
        dispatch({ type: authActions.SIGNUP_S, data, signUpType,  message: data.message });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.SIGNUP_F, message });
      });
  };
};

export const send_recovery_mail = obj => {
  return dispatch => {
    dispatch({ type: authActions.SEND_RECOVERY_MAIL_R });
    ax({
      url: e.send_recovery_mail,
      method: "PUT",
      data: obj
    })
      .then(({ data }) => {
        dispatch({ type: authActions.SEND_RECOVERY_MAIL_S, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.SEND_RECOVERY_MAIL_F, message });
      });
  };
};

export const update = obj => {
  return dispatch => {
    dispatch({ type: authActions.CHANGE_USER_DETAILS_R });
    ax({
      method: "POST",
      data: obj,
      url: e.update,
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        if (localStorage.getItem("x-access-token") !== null) {
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

        dispatch({ type: authActions.CHANGE_USER_DETAILS_S, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.CHANGE_USER_DETAILS_F, message });
      });
  };
};

export const update_interests = obj =>{}
