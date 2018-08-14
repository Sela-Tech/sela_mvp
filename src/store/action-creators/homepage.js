import ax from "axios";
import hA from "../actions/home";
import e from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: hA.FETCHING_HOMEPAGE_PROJECTS_IN_PROGRESS });
    ax({
      url: e.fetch_projects + "/all",
      method: "GET",
      headers: {
        token: retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: hA.FETCHING_HOMEPAGE_PROJECTS_SUCCESSFUL,
          projects: {
            ongoing: data.filter(p => {
              return p.general_status === "ongoing";
            }),
            proposed: data.filter(p => {
              return p.general_status === "proposed";
            })
          }
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: hA.FETCHING_HOMEPAGE_PROJECTS_FAILED, message });
      });
  };
};

export const fetchProject = id => {
  return dispatch => {
    dispatch({ type: hA.FETCHING_HOMEPAGE_PROJECT_IN_PROGRESS });
    ax({
      url: e.fetch_project + id,
      method: "GET",
      headers: {
        token: retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: hA.FETCHING_HOMEPAGE_PROJECT_SUCCESSFUL,
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
        dispatch({ type: hA.FETCHING_HOMEPAGE_PROJECT_FAILED, message });
      });
  };
};
