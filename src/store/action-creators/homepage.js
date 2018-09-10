import ax from "axios";
import hA from "../actions/home";
import e from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";

const statuses = ["DORMANT", "ACCEPTED", "STARTED", "TERMINATED", "COMPLETED"];

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: hA.FETCHING_HOMEPAGE_PROJECTS_IN_PROGRESS });
    ax({
      url: e.fetch_projects + "limit=12",
      method: "GET",
      headers: {
        public: true
      }
    })
      .then(({ data }) => {
        dispatch({
          type: hA.FETCHING_HOMEPAGE_PROJECTS_SUCCESSFUL,
          projects: {
            ongoing: data.projects.filter(p => {
              return p.status !== statuses[0] && p.status !== statuses[1];
            }),
            proposed: data.projects.filter(p => {
              return p.status === statuses[0] || p.status === statuses[1];
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
