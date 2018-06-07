import ax from "axios";
import dashboardActions from "../actions/dashboard";
import e from "../../endpoints";
import Qs from "querystring";
import { retrieveToken } from "../../helpers/TokenManager";
export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: dashboardActions.FETCHING_PROJECTS_IN_PROGRESS });
    ax({
      url: e.fetch_projects,
      method: "GET",
      headers: {
        token: retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dashboardActions.FETCHING_PROJECTS_SUCCESSFUL,
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
        dispatch({ type: dashboardActions.FETCHING_PROJECTS_FAILED, message });
      });
  };
};

export const addProject = obj => {
  return dispatch => {
    dispatch({ type: dashboardActions.ADD_PROJECT_IN_PROGRESS });
    ax({
      url: e.add_project,
      method: "POST",
      data: Qs.stringify(obj),
      headers: {
        token: retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dashboardActions.ADD_PROJECT_SUCCESSFUL
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dashboardActions.ADD_PROJECT_FAILED, message });
      });
  };
};

export const fetchProject = id => {
  return dispatch => {
    dispatch({ type: dashboardActions.FETCHING_PROJECT_IN_PROGRESS });
    ax({
      url: e.fetch_project + id,
      method: "GET",
      headers: {
        token: retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dashboardActions.FETCHING_PROJECT_SUCCESSFUL,
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
        dispatch({ type: dashboardActions.FETCHING_PROJECT_FAILED, message });
      });
  };
};
