import React from 'react';
import ax from "axios";
import authActions from "../actions/auth";
import e from "../../endpoints";
import { retrieveToken, setToken } from "../../helpers/TokenManager";
import { extractMessage, storeManager } from "../../helpers/utils";

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
      dispatch({ type: "NEW_TOAST", status: "success", message: "Password Updated Successfully"})
    })
    .catch(res => {
       dispatch({ type: authActions.UPDATE_PASSWORD_F });
       dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Update Password"})

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
      dispatch({ type: authActions.EMAIL_VERIFICATION_S });
      dispatch({ type: "NEW_TOAST", status: "success", message: "Email Verified Successfully"})

    }).catch(res=>{
      dispatch({ type: authActions.EMAIL_VERIFICATION_F });
      dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Email Verification Failed"})

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
      dispatch({ type: authActions.RESEND_VERIFICATION_S });
      dispatch({ type: "NEW_TOAST", status: "success", message: "New Verification Mail Sent"})

    }).catch(res=>{
      dispatch({ type: authActions.RESEND_VERIFICATION_F });
      dispatch({ type: "NEW_TOAST", status: "error", message: "Could Not Send New Verification Mail"})

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
          setToken("ls", data.token);
          
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

          dispatch({ type: authActions.SIGNIN_S, data });
          dispatch({ type: "NEW_TOAST", status: "success", message: "Logged In Successfully"});

          storeManager.keep("areasOfInterest", data.areasOfInterest)

        } else {
          let message = data.message;
          dispatch({ type: authActions.SIGNIN_F });
          dispatch({ type: "NEW_TOAST", status: "error", message: message || "Failed To Log in"})
      
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

        if(typeof message !== "string"){
          message.map(m=>{
            if(m.indexOf("verified") !== -1){
              return dispatch({ type: "NEW_TOAST", status: "error",
              message: m || "Failed To Log in", options: {
              autoClose: false }})
            }
            
            return dispatch({ type: "NEW_TOAST", status: "error",
              message: m || "Failed To Log in"})
            
          })
        } else {
          let m = message;
          if(m.indexOf("verified") !== -1){
            dispatch({ 
              type: "NEW_TOAST", status: "error",
              message: m || "Failed To Log in",
              element: <div className=''>
              <p style={{color: 'white'}}>{m}</p>
              <button style={{
                    padding: '.5em 1em',
                    marginBottom: ".5em",
                    fontSize: '15px',
                    background: '#982d4f',
                    color: 'white',
                    fontWeight: '300',
                    border: "0px solid white",
                    borderRadius: '5px'
              }} onClick={()=>dispatch(resend_verification_mail( obj[Object.keys(obj)[0]] ))}> Resend Verification Mail </button>
            </div>, options:{autoClose: false}
            })
          }else{
            dispatch({ type: "NEW_TOAST", status: "error", message: m || "Failed To Log in" })
          }
        }

      
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
        if (data.token) {
            setToken("ls", data.token);
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

        dispatch({ type: authActions.TOKEN_VERIFICATION_S, data });
      })
      .catch(res=>{
        dispatch({ type: authActions.TOKEN_VERIFICATION_F, message: extractMessage(res) });
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
        dispatch({ type: authActions.SIGNUP_S, data, signUpType });
        dispatch({ type: "NEW_TOAST", status: "success", message: data.message || "Signed Up Successfully"})

      })
      .catch(res => {
        dispatch({ type: authActions.SIGNUP_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Sign Up Failed."})
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
        dispatch({ type: "NEW_TOAST", status: "success", message: "Recovery Mail Sent Successfully"})
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: "NEW_TOAST", status: "error", message: message[0].msg || message ||  "Could Not Send Recovery Mail"})
        dispatch({ type: authActions.SEND_RECOVERY_MAIL_F });
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
        dispatch({ type: "NEW_TOAST", status: "success", message: "User Details Updated"})

      })
      .catch(res=>{
        dispatch({ type: authActions.CHANGE_USER_DETAILS_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Update User Details"})

      });
  };
};

