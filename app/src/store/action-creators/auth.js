import ax from "axios";
import authActions from "../actions/auth";
import e from "../../endpoints";
import { retrieveToken, setToken } from "../../helpers/TokenManager";

export const signout = () => {
  return { type: authActions.SIGNOUT };
};

export const update_password = (obj,token)=>{
  return dispatch=>{
    dispatch({ type: authActions.UPDATE_PASSWORD_IN_PROGRESS });
    ax({
      url: e.update_password + token,
      method: "PUT",
      data: obj,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res=>{
      
      dispatch({ type: authActions.UPDATE_PASSWORD_SUCCESSFUL, data: res.data });
    })
    .catch(({ response }) => {
      let message;
      if (response) {
        message = response.message || response.data.message;
      } else {
        message = "Connection Error";
      }
       dispatch({ type: authActions.UPDATE_PASSWORD_FAILED, message });
    });
  }
}

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

          dispatch({ type: authActions.SIGNIN_SUCCESSFUL, data, message: data.message });
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
      type: authActions.SIGNUP_IN_PROGRESS,
      dashboardType: obj["signUpType"]
    });
    ax({
      url: e.signup,
      method: "POST",
      data: obj
    })
      .then(({ data }) => {
        dispatch({ type: authActions.SIGNUP_SUCCESSFUL, data, signUpType,  message: data.message });
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
      method: "PUT",
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

export const update = obj => {
  return dispatch => {
    dispatch({ type: authActions.CHANGE_USER_DETAILS_IN_PROGRESS });
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

        dispatch({ type: authActions.CHANGE_USER_DETAILS_SUCCESSFUL, data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: authActions.CHANGE_USER_DETAILS_FAILED, message });
      });
  };
};
