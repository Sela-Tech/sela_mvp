import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";

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
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.ADD_STAKEHOLDER_F, message });
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
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.GET_P_STAKEHOLDERS_F, message });
      });
  };
};
