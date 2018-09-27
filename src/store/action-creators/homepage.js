import ax from "axios";
import hA from "../actions/home";
import e from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";
import { extractMessage } from "../../helpers/utils";

export const fetchProjects = (query = "") => {
  let url = `${e.fetch_projects}${
    query !== "" ? "limit=12&" + query : "limit=12"
  }`;

  return dispatch => {
    dispatch({ type: hA.FETCHING_HOMEPAGE_PROJECTS_IN_PROGRESS });

    ax.get(url, { headers: { public: true } }).then(projects_response => {
      dispatch({
        type: hA.FETCHING_HOMEPAGE_PROJECTS_SUCCESSFUL,
        projects: projects_response.data.projects
      });
    });
  };
};

export const fetchLocations = () => {
  return dispatch => {
    ax.get(e.fetch_locations).then(locations_response => {
      dispatch({
        type: hA.FETCHING_LOCATIONS_SUCCESSFUL,
        locations: locations_response.data
      });
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
        dispatch({
          type: hA.FETCHING_HOMEPAGE_PROJECT_FAILED,
          message: extractMessage(response)
        });
      });
  };
};
