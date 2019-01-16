import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";
import { extractMessage } from "../../../helpers/utils";

export const selectFunders = selected => {
  return {
    type: dA.SELECT_FUNDERS,
    selected
  };
};

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: dA.GET_PROJS_R });
    ax({
      url: e.fetch_projects,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_PROJS_S,
          projects: data
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.GET_PROJS_F, message });
      });
  };
};

export const addProject = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_PROJ_R });
    ax({
      url: e.add_project,
      method: "POST",
      data: obj,
      headers: {
        "x-access-token": retrieveToken(),
        contentType: "application/json; charset=UTF-8"
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.ADD_PROJ_S
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.ADD_PROJ_F, message });
      });
  };
};

export const fetchProject = id => {
  return dispatch => {
    dispatch({ type: dA.GET_PROJ_R });
    ax({
      url: e.fetch_project + id,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_PROJ_S,
          info: data
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.GET_PROJ_F, message });
      });
  };
};

export const deleteProject = (id, type) => {
  return dispatch => {
    dispatch({ type: dA.DELETE_PROJ_R });

    ax({
      url: e.fetch_project + id,
      method: "DELETE",
      headers: {
        "x-access-token": retrieveToken(),
        "permanent-delete": type === "delete"
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.DELETE_PROJ_S,
          info: data
        });
      })
      .catch(res => {
        dispatch({
          type: dA.DELETE_PROJ_F,
          message: extractMessage(res)
        });
      });
  };
};

// export const addStakeholder = obj => {
//   return dispatch => {
//     dispatch({ type: dA.ADD_STAKEHOLDER_R });

//     ax({
//       url: e.add_stakeholder,
//       method: "POST",
//       data: obj,
//       headers: {
//         "x-access-token": retrieveToken(),
//         contentType: "application/json; charset=UTF-8"
//       }
//     })
//       .then(({ data }) => {
//         dispatch({
//           type: dA.ADD_STAKEHOLDER_S,
//           message: data.message
//         });
//       })
//       .catch(({ response }) => {
//         let message;
//         if (response) {
//           message = response.message || response.data.message;
//         } else {
//           message = "connection error";
//         }
//         dispatch({ type: dA.ADD_STAKEHOLDER_F, message });
//       });
//   };
// };
