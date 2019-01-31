import ax from "axios";
import hA from "../actions/home";
import e from "../../endpoints";
import { extractMessage } from "../../helpers/utils";

export const showMap = {
  type: hA.SHOW_MAP
};

export const toggleFullScreen = {
  type: hA.TOGGLE_FULLSCREEN
};

export const ignoreProjectId = id => {
  return {
    type: hA.IGNORE_PROJECT_ID,
    id
  };
};
export const fetchStakeholderInfo = id => {
  return dispatch => {
    dispatch({
      type: hA.FETCHING_CITIZEN_INFO_IN_PROGRESS
    });

    ax({
      url: e.fetch_stakeholder_info,
      method: "POST",
      data: {
        id
      }
    })
      .then(({ data }) => {
        dispatch({
          type: hA.FETCHING_CITIZEN_INFO_SUCCESSFUL,
          citizenData: data
        });
      })
      .catch(res => {
        dispatch({
          type: hA.FETCHING_CITIZEN_INFO_FAILED,
          message: extractMessage(res)
        });
      });
  };
};
export const fetchProjects = (query = "") => {
  let url = `${e.fetch_projects}${
    query !== "" ? "limit=12&" + query : "limit=12"
  }`;

  return dispatch => {
    dispatch({ type: hA.FETCHING_HOMEPAGE_PROJECTS_IN_PROGRESS });

    ax.get(url, { headers: { public: true } }).then(projects_response => {
      dispatch({
        type: hA.FETCHING_HOMEPAGE_PROJECTS_SUCCESSFUL,
        projects: projects_response.data.projects,
        centerize: query !== ""
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
        public: true
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
