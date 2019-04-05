import ax from "axios";
import hA from "../actions/home";
import e from "../../endpoints";
import { extractMessage } from "../../helpers/utils";
import endpoints from "../../endpoints";

export const showMap = {
  type: hA.SHOW_MAP
};
export const toggleFullScreen = {
  type: hA.TOGGLE_FULLSCREEN
};
export const ignoreProjectId = id => {
  return {
    type: hA.IGNORE_PROJ_ID,
    id
  };
};
export const fetchStakeholderInfo = id => {
  return dispatch => {
    dispatch({
      type: hA.GET_CITIZEN_INFO_R
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
          type: hA.GET_CITIZEN_INFO_S,
          citizenData: data
        });
      })
      .catch(res => {
        dispatch({
          type: hA.GET_CITIZEN_INFO_F,
          message: extractMessage(res)
        });
      });
  };
};
export const fetchProjects = (query = "") => {
  let url = `${e.fetch_projects}${query !== "" ? "limit=12&" + query : "limit=12"}`;

  return dispatch => {
    dispatch({ type: hA.GET_HOMEPAGE_PROJS_R });

    ax.get(url, { headers: { public: true } }).then(projects_response => {
      dispatch({
        type: hA.GET_HOMEPAGE_PROJS_S,
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
        type: hA.GET_LOCATIONS_S,
        locations: locations_response.data
      });
    });
  };
};
export const fetchProject = id => {
  return dispatch => {
    dispatch({ type: hA.GET_HOMEPAGE_PROJ_R });
    ax({
      url: e.fetch_project + id,
      method: "GET",
      headers: {
        public: true
      }
    })
      .then(({ data }) => {
        dispatch({
          type: hA.GET_HOMEPAGE_PROJ_S,
          info: data
        });
      })
      .catch(({ response }) => {
        dispatch({
          type: hA.GET_HOMEPAGE_PROJ_F,
          message: extractMessage(response)
        });
      });
  };
};
export const updates = () => {
  return dispatch => {
    dispatch({ type: hA.GET_PUBLIC_UPDATES_R })
    ax({
      method: "GET",
      url: endpoints.public_updates
    }).then(res=>{
      dispatch({ type: hA.GET_PUBLIC_UPDATES_S })

    }).catch(res=>{
      dispatch({ type: hA.GET_PUBLIC_UPDATES_F })

    })
  }
}

export const get_public_transactions = id => {
  return dispatch => {
    dispatch({ type: hA.GET_PUBLIC_TRANSACTIONS_R })
    ax({
      method: "GET",
      url: endpoints.public_transactions(id)
    }).then(res=>{
      dispatch({ type: hA.GET_PUBLIC_TRANSACTIONS_S, data: res.data })

    }).catch(res=>{
      dispatch({ type: hA.GET_PUBLIC_TRANSACTIONS_F })

    })
  }
}
