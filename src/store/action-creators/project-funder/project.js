import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";
import { extractMessage } from "../../../helpers/utils";

export const fetchFunders = () => {
  return dispatch => {
    dispatch({ type: dA.FETCHING_FUNDERS_IN_PROGRESS });
    ax({
      url: e.fetch_users,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.FETCHING_FUNDERS_SUCCESSFUL,
          funders: data
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.FETCHING_FUNDERS_FAILED, message });
      });
  };
};

export const selectFunders = selected => {
  return {
    type: dA.SELECT_FUNDERS,
    selected
  };
};

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: dA.FETCHING_PROJECTS_IN_PROGRESS });
    ax({
      url: e.fetch_projects,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.FETCHING_PROJECTS_SUCCESSFUL,
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
        dispatch({ type: dA.FETCHING_PROJECTS_FAILED, message });
      });
  };
};

export const addProject = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_PROJECT_IN_PROGRESS });
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
          type: dA.ADD_PROJECT_SUCCESSFUL
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.ADD_PROJECT_FAILED, message });
      });
  };
};

export const fetchProject = id => {
  return dispatch => {
    dispatch({ type: dA.FETCHING_PROJECT_IN_PROGRESS });
    ax({
      url: e.fetch_project + id,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.FETCHING_PROJECT_SUCCESSFUL,
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
        dispatch({ type: dA.FETCHING_PROJECT_FAILED, message });
      });
  };
};

export const deleteProject = (id, type) => {
  return dispatch => {
    dispatch({ type: dA.DELETE_PROJECT_IN_PROGRESS });

    ax({
      url: e.fetch_project + id,
      method: "DELETE",
      headers: {
        "x-access-token": retrieveToken(),
        authorization: type === "delete"
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.DELETE_PROJECT_SUCCESSFUL,
          info: data
        });
      })
      .catch(res => {
        dispatch({
          type: dA.DELETE_PROJECT_FAILED,
          message: extractMessage(res)
        });
      });
  };
};
