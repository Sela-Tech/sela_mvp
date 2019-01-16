import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";

export const addTask = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_TASK_R });
    ax({
      url: e.tasks,
      method: "POST",
      data: obj,
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.ADD_TASK_S
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.ADD_TASK_F, message });
      });
  };
};

export const fetchTasks = projectId => {
  return dispatch => {
    dispatch({ type: dA.GET_TASKS_R });
    ax({
      url: e.tasks + "/" + projectId,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_TASKS_S,
          tasks: data
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.GET_TASKS_F, message });
      });
  };
};

export const fetchTaskInfo = taskId => {
  return dispatch => {
    dispatch({ type: dA.GET_TASK_R });
    ax({
      url: e.tasks + "/" + taskId,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.GET_TASK_S,
          info: data.info
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.GET_TASK_F, message });
      });
  };
};

export const watch_video = (src, playing) => {
  return {
    type: dA.WATCH_VIDEO,
    src,
    playing
  };
};

export const clear_video = () => {
  return { type: dA.CLEAR_VIDEO };
};
