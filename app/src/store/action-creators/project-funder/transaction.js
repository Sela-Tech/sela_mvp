import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";

export const addTransaction = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_TRANSACTION_IN_PROGRESS });
    ax({
      url: e.trn,
      method: "POST",
      data: obj,
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        if (data.success === true) {
          dispatch({
            type: dA.ADD_TRANSACTION_SUCCESSFUL
          });
        } else {
          dispatch({ type: dA.ADD_TRANSACTION_FAILED, message: data.message });
        }
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.ADD_TRANSACTION_FAILED, message });
      });
  };
};

export const fetchTransaction = projectId => {
  return dispatch => {
    dispatch({ type: dA.FETCH_TRANSACTIONS_IN_PROGRESS });
    ax({
      url: e.trn + "/" + projectId,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.FETCH_TRANSACTIONS_SUCCESSFUL,
          tasks: data
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.FETCH_TRANSACTIONS_FAILED, message });
      });
  };
};
