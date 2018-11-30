import ax from "axios";
import adminActions from "../actions/admin";
import e from "../../endpoints";
import { retrieveToken, setToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";

export const signin = obj => {
  return dispatch => {
    dispatch({ type: adminActions.SIGNIN_IN_PROGRESS });
    ax({
      url: e.a_signin,
      method: "POST",
      data: obj
    })
      .then(({ data }) => {
        setToken("ss", data.token);

        dispatch({ type: adminActions.SIGNIN_SUCCESSFUL, data });
      })
      .catch(res => {
        dispatch({
          type: adminActions.SIGNIN_FAILED,
          message: extractMessage(res)
        });
      });
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: adminActions.FETCH_USERS_IN_PROGRESS });
    ax({
      url: e.a_users,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({ type: adminActions.FETCH_USERS_SUCCESSFUL, users: data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "Connection Error";
        }
        dispatch({ type: adminActions.FETCH_USERS_FAILED, message });
      });
  };
};

export const revoke = id => {
  return dispatch => {
    dispatch({ type: adminActions.REVOKE_IN_PROGRESS, userId: id });
    ax({
      url: e.revoke,
      method: "POST",
      data: {
        id
      },
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: adminActions.REVOKE_SUCCESSFUL,
          activationResponse: data.activation
        });
      })
      .catch(res => {
        dispatch({
          type: adminActions.REVOKE_FAILED,
          message: extractMessage(res)
        });
      });
  };
};

export const approve = id => {
  return dispatch => {
    dispatch({ type: adminActions.APPROVE_IN_PROGRESS, userId: id });
    ax({
      url: e.approve,
      method: "POST",
      data: {
        id
      },
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: adminActions.APPROVE_SUCCESSFUL,
          activationResponse: data.activation
        });
      })
      .catch(res => {
        dispatch({
          type: adminActions.APPROVE_FAILED,
          message: extractMessage(res)
        });
      });
  };
};
