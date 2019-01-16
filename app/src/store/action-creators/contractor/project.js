import ax from "axios";
import e from "../../../endpoints";
import { extractMessage } from "../../../helpers/utils";
import contractor from "../../actions/contractor/project";
import contractor_dashboard from "../../actions/contractor/dashboard";

import { retrieveToken } from "../../../helpers/TokenManager";


export const join_or_reject_project = (agreed,project)=>{
  return dispatch => {
      ax({
          url: e.contractor.join_or_reject_project + project + "/accept",
          method: "PUT",
          data: {
              agreed
          },
          headers: {
              authorization: retrieveToken()
          }
      }).then( res => {
          dispatch({ type: agreed === true
              ? contractor.JOIN_PROJ_S
              : contractor.REJECT_PROJ_S, message: extractMessage(res) })
      }).catch( res => {
          dispatch({ type: agreed === true
              ? contractor.JOIN_PROJ_F
              : contractor.REJECT_PROJ_F, message: extractMessage(res) })
   
      })
  }
}

export const selectFunders = selected => {
  return {
    type: contractor_dashboard.SELECT_FUNDERS,
    selected
  };
};

const fetch_joined_projects = () => {
  return ax.get(e.contractor.fetch_projects_you_joined,{
      headers: {
        "authorization": retrieveToken()
      }
    })
};

const fetch_proposed_projects = () => {
  return ax.get(e.contractor.fetch_projects_you_proposed,{
      headers: {
        "authorization": retrieveToken()
      }
    })
};

export const fetch_projects_for_contractor = ()=>{
  return dispatch=>{
    dispatch({type: contractor_dashboard.GET_PROJS_AS_CONTRACTOR_R});

    ax.all([fetch_joined_projects(), fetch_proposed_projects()])
    .then(ax.spread(function (joined, proposed) {
      // Both requests are now complete
      joined = joined.data.projects;
      proposed = proposed.data.projects;

      dispatch({type: contractor_dashboard.GET_PROJS_AS_CONTRACTOR_S, joined, proposed});

    })).catch(res=>{
      dispatch({ type: contractor_dashboard.GET_PROJS_AS_CONTRACTOR_F, message: extractMessage(res)});

    })
  }
}

export const addProject = obj => {
  return dispatch => {
    dispatch({ type: contractor_dashboard.ADD_PROJ_R });
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
          type: contractor_dashboard.ADD_PROJ_S
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: contractor_dashboard.ADD_PROJ_F, message });
      });
  };
};

export const fetchProject = id => {
  return dispatch => {
    dispatch({ type: contractor_dashboard.GET_PROJ_R });
    ax({
      url: e.fetch_project + id,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: contractor_dashboard.GET_PROJ_S,
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
        dispatch({ type: contractor_dashboard.GET_PROJ_F, message });
      });
  };
};

export const deleteProject = (id, type) => {
  return dispatch => {
    dispatch({ type: contractor_dashboard.DELETE_PROJ_R });

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
          type: contractor_dashboard.DELETE_PROJ_S,
          info: data
        });
      })
      .catch(res => {
        dispatch({
          type: contractor_dashboard.DELETE_PROJ_F,
          message: extractMessage(res)
        });
      });
  };
};
