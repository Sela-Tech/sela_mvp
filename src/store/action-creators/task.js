import ax from "axios";
import dashboardActions from "../actions/dashboard";
import e from "../../endpoints";
import Qs from "querystring";
import { retrieveToken } from "../../helpers/TokenManager";

export const addTask = obj => {
  return dispatch => {
    dispatch({ type: dashboardActions.ADD_TASK_IN_PROGRESS });
    ax({
      url: e.add_task,
      method: "POST",
      data: Qs.stringify(obj),
      headers: {
        token: retrieveToken()
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dashboardActions.ADD_TASK_SUCCESSFUL
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dashboardActions.ADD_TASK_FAILED, message });
      });
  };
};

export const watch_video = (src, playing) => {
  return {
    type: dashboardActions.WATCH_VIDEO,
    src,
    playing
  };
};

export const clear_video = () => {
  return { type: dashboardActions.CLEAR_VIDEO };
};
