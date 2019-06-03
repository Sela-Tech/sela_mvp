import ax from "axios";
import dA from "../../actions/dashboard";
import e from "../../../endpoints";
import { retrieveToken } from "../../../helpers/TokenManager";
import { extractMessage } from "../../../helpers/utils";
import { CLOSE_MODAL_FORM } from "../../actions/modal";
import { fetchProject } from "../project";

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
      .then(() => {
        dispatch({
          type: dA.ADD_TASK_S
        });
        dispatch({ type: "NEW_TOAST", status: "success", message: "Task Added Succesfully"})
        dispatch({type: CLOSE_MODAL_FORM})
        dispatch(fetchProject(obj.id));
      })
      .catch((res) => {
        dispatch({ type: dA.ADD_TASK_F });
        dispatch({ type: "NEW_TOAST", status: "error", message: extractMessage(res) || "Could Not Delete Task"})

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
      .catch((res) => {
        dispatch({ type: dA.GET_TASKS_F, message: extractMessage(res) });
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
      .catch((res) => {
        dispatch({ type: dA.GET_TASK_F, message: extractMessage(res) });
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
