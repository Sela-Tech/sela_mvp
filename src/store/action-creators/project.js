import ax from "axios";
import dA from "../actions/project-funder/dashboard";
import e from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";
import modal from "../actions/modal"

export const selectFunders = selected => {
  return {
    type: dA.SELECT_FUNDERS,
    selected
  };
};

export const fetchProjects = (category='c',limit=20,page=1) => {
  return dispatch => {
    dispatch({ type: dA.GET_PROJS_R });
    ax({
      url: e.fetch_projects_advanced  + `?cat=${category}&limit=${limit}&page=${page}`,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken(),
        "authorization": retrieveToken(),
        
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_PROJS_S,
          projects: data.result
        });
      })
      .catch(res => {
        dispatch({ type: dA.GET_PROJS_F, message: extractMessage(res) });
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
        dispatch({ type: "NEW_TOAST", status: "success", message: "Project Added Successfully"})
        dispatch({type: modal.CLOSE_MODAL_FORM})
        dispatch(fetchProject(obj.id));

      })
      .catch((res) => {
        dispatch({ type: dA.ADD_PROJ_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Add Project"})

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
      .catch((res) => {
      
        dispatch({ type: dA.GET_PROJ_F, message: extractMessage(res) });
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
        dispatch({ type: "NEW_TOAST", status: "success", message: "Project Deleted Succesfully"})
        dispatch({type: modal.CLOSE_MODAL_FORM})

      })
      .catch(res => {
        dispatch({
          type: dA.DELETE_PROJ_F,
          message: extractMessage(res)
        });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Delete Project"})

      });
  };
};
