import ax from "axios";
import dA from "../actions/dashboard";
import e from "../../endpoints";
import { retrieveToken } from "../../helpers/TokenManager";
import { extractMessage, storeManager } from "../../helpers/utils";
import auth from '../actions/auth';
import * as modals from "../actions/modal";
import {get_notifications} from "./notifications";

export const selectFunders = selected => {
  return {
    type: dA.SELECT_FUNDERS,
    selected
  };
};

export const fetchProjects = (category='a',limit=20,page=1) => {
  return dispatch => {
    dispatch({ type: dA.GET_PROJS_R });
    ax({
      url: e.fetch_projects_advanced  + `?cat=${category}&limit=${limit}&page=${page}`,
      method: "GET",
      headers: {
        "authorization": retrieveToken(),  
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_PROJS_S,
          projects: data.result,
          category
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
          type: dA.ADD_PROJ_S,
          added_project: data.project
        });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Project Added Successfully"})
        dispatch({type: modals.CLOSE_MODAL_FORM})
        dispatch(fetchProjects('c'));

      })
      .catch((res) => {
        dispatch({ type: dA.ADD_PROJ_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Add Project"})

      });
  };
};

export const updateProject = obj => {
  return dispatch => {
    dispatch({ type: dA.UPDATE_PROJ_R });
    ax({
      url: e.add_project +"/"+ obj.id,
      method: "PUT",
      data: obj,
      headers: {
        "x-access-token": retrieveToken(),
        contentType: "application/json; charset=UTF-8"
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.UPDATE_PROJ_S,
        });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Project Updated Successfully"})
        dispatch({type: modals.CLOSE_MODAL_FORM})
        dispatch(fetchProjects('c'));

      })
      .catch((res) => {
        dispatch({ type: dA.UPDATE_PROJ_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Update Project"})

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
        dispatch({type: modals.CLOSE_MODAL_FORM})

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

export const updateInterests = obj =>{
  return dispatch => {
    ax({
      url: e.update_interests,
      method: "PUT",
      data: obj,
      headers: {
        authorization: retrieveToken()
      }
    }).then(res=>{
      
      dispatch({type: auth.SET_INTERESTS, areasOfInterest: obj.areasOfInterest})
      dispatch({ type: "NEW_TOAST", status: "success", message: "Interests Updated Successfully."})
      dispatch({type: modals.CLOSE_MODAL_FORM });
      dispatch(fetchProjects("i"));
      storeManager.keep("areasOfInterest", obj.areasOfInterest)
    }).catch(res=>{
      dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Update Interests."})
    })
  }
}

export const join_or_reject_project = (agreed,id, notif_id)=>{
  return dispatch => {
      ax({
          url: e.contractor.join_or_reject_project + id + `/accept?notification=${notif_id}` ,
          method: "PUT",
          data: {
              agreed
          },
          headers: {
              authorization: retrieveToken()
          }
      }).then( res => {
        let message = res.data.message;       
        if( Boolean(message) === false ){
            message = agreed === true
            ? "You Successfully Joined The Project"
            : "You Rejected The Invitation"
        }
        dispatch({ type: "NEW_TOAST", status: "success", message })
        
        dispatch(get_notifications());

    }).catch( res => {
          let message = extractMessage(res);

          if( !Boolean(message)){
              message = agreed === true
              ? "You Could Not Accept The Project Invitation"
              : "You Could Not Reject The Invitation" 
          }
          
        dispatch({ type: "NEW_TOAST", status: "error",  message })

      })
  }
}