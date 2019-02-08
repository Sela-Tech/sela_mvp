import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";
import { extractMessage } from "../../../helpers/utils";
import modal from "../../actions/modal";
import { fetchProject } from "../project";

export const addTransaction = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_TRANSACTION_R });
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
            type: dA.ADD_TRANSACTION_S
          });
          dispatch({type: modal.CLOSE_MODAL_FORM})
          dispatch({ type: "NEW_TOAST", status: "success", message: "Transaction Added Succesfully"})
          dispatch(fetchProject(obj.id));

        } else {
          dispatch({ type: dA.ADD_TRANSACTION_F, message: data.message });

        }
      })
      .catch((res) => {
        dispatch({ type: dA.ADD_TRANSACTION_F });
        dispatch({ type: "NEW_TOAST", status: "success", message: extractMessage(res) || "Could Not Add Transaction."})

      });
  };
};

export const fetchTransaction = projectId => {
  return dispatch => {
    dispatch({ type: dA.GET_TRANSACTIONS_R });
    ax({
      url: e.trn + "/" + projectId,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_TRANSACTIONS_S,
          tasks: data
        });
      })
      .catch((res) => {
        dispatch({ type: dA.GET_TRANSACTIONS_F, message: extractMessage(res) });
      });
  };
};
