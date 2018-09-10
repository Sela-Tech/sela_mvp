import ax from "axios";
import dA from "../../actions/project-funder/dashboard";
import e from "../../../endpoints";
import Qs from "querystring";
import { retrieveToken } from "../../../helpers/TokenManager";

export const addTask = obj => {
  return dispatch => {
    dispatch({ type: dA.ADD_TASK_IN_PROGRESS });
    ax({
      url: e.add_task,
      method: "POST",
      data: Qs.stringify(obj),
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.ADD_TASK_SUCCESSFUL
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dA.ADD_TASK_FAILED, message });
      });
  };
};

export const fetchTasks = () => {
  return dispatch => {
    dispatch({ type: dA.FETCH_TASKS_IN_PROGRESS });
    ax({
      url: e.get_tasks,
      method: "GET",
      headers: {
        "x-access-token": retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dA.FETCH_TASKS_SUCCESSFUL,
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
        dispatch({ type: dA.FETCH_TASKS_FAILED, message });
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
