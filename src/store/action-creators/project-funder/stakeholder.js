import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";
import { extractMessage } from "../../../helpers/utils";
import modal from "../../actions/modal";
import { fetchProject } from "../project";

export const addStakeholder = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_STAKEHOLDER_R });

    ax({
      url: e.add_stakeholder,
      method: "POST",
      data: obj,
      headers: {
        "x-access-token": retrieveToken(),
        contentType: "application/json; charset=UTF-8"
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.ADD_STAKEHOLDER_S,
          message: data.message
        });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Stakeholder Added Succesfully"})
        dispatch({type: modal.CLOSE_MODAL_FORM});
        dispatch(fetchProject(obj.id));
      })
      .catch((res) => {
  
        dispatch({ type: dA.ADD_STAKEHOLDER_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Remove Stakeholder."})

      });
  };
};

export const fetchPossibleStakeholders = id => {
  return dispatch => {
    dispatch({ type: dA.GET_P_STAKEHOLDERS_R });
    ax({
      url: e.fetch_users,
      method: "GET",
      data: {
        // projectId: id
      },
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_P_STAKEHOLDERS_S,
          pstakeholders: data
        });
      })
      .catch((res) => {
     
        dispatch({ type: dA.GET_P_STAKEHOLDERS_F, message: extractMessage(res) });
      });
  };
};
