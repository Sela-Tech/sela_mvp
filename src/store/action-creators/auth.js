import ax from 'axios';
import authActions from "../actions/auth";
import e from "../../endpoints";

export const signin = obj => {
    return dispatch => {
        dispatch({type: authActions.LOGIN_IN_PROGRES});
        ax({
            url: e.signin,
            method: "POST",
            data: obj
        }).then( ({data}) => {
            dispatch({type: authActions.LOGIN_SUCCESSFUL, data });
        }).catch( ({response}) => {
            const message = response.message || response.data.message;
            dispatch({type: authActions.LOGIN_SUCCESSFUL, message });
        })
    }
}

export const signup = obj => {
    return dispatch => {
        dispatch({type: authActions.SIGNUP_IN_PROGRESS});
        ax({
            url: e.signup,
            method: "POST",
            data: obj
        }).then( ({data}) => {
            dispatch({type: authActions.SIGNUP_SUCCESSFUL, data });
        }).catch( ({response}) => {
            const message = response.message || response.data.message;
            dispatch({type: authActions.SIGNUP_FAILED, message });
        })
    }
}

export const send_recovery_mail = obj => {
    return dispatch => {
        dispatch({type: authActions.SEND_RECOVERY_MAIL_IN_PROGRESS});
        ax({
            url: e.send_recovery_mail,
            method: "POST",
            data: obj
        }).then( ({data}) => {
            dispatch({type: authActions.SEND_RECOVERY_MAIL_SUCCESSFUL, data });
        }).catch( ({response}) => {
            const message = response.message || response.data.message;
            dispatch({type: authActions.SEND_RECOVERY_MAIL_FAILED, message });
        })
    }
}