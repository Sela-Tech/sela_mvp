import ax from "axios";
import adminActions from "../actions/admin";
import e from "../../endpoints";
import { retrieveToken, setToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";

export const signin = obj => {
  return dispatch => {
    dispatch({ type: adminActions.SIGNIN_R });
    ax({
      url: e.a_signin,
      method: "POST",
      data: obj
    })
      .then(({ data }) => {
        setToken("ss", data.token);

        dispatch({ type: adminActions.SIGNIN_S, data });
      })
      .catch(res => {
        dispatch({
          type: adminActions.SIGNIN_F,
          message: extractMessage(res)
        });
      });
  };
};

export const fetchUsers = () => {
  return dispatch => {
    dispatch({ type: adminActions.GET_USERS_R });
    ax({
      url: e.a_users,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({ type: adminActions.GET_USERS_S, users: data });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "Connection Error";
        }
        dispatch({ type: adminActions.GET_USERS_F, message });
      });
  };
};

export const revoke = id => {
  return dispatch => {
    dispatch({ type: adminActions.REVOKE_R, userId: id });
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
          type: adminActions.REVOKE_S,
          activationResponse: data.activation
        });
      })
      .catch(res => {
        dispatch({
          type: adminActions.REVOKE_F,
          message: extractMessage(res)
        });
      });
  };
};

export const approve = id => {
  return dispatch => {
    dispatch({ type: adminActions.APPROVE_R, userId: id });
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
          type: adminActions.APPROVE_S,
          activationResponse: data.activation
        });
      })
      .catch(res => {
        dispatch({
          type: adminActions.APPROVE_F,
          message: extractMessage(res)
        });
      });
  };
};
