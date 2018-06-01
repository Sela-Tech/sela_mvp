import ax from "axios";
import dashboardActions from "../../actions/dashboard";
import e from "../../../endpoints";
// import Qs from "querystring";

export const fetchProjects = () => {
  return dispatch => {
    dispatch({ type: dashboardActions.FETCHING_PROJECTS_IN_PROGRESS });
    ax({
      url: e.dashboard_fetch_projects,
      method: "GET",
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        dispatch({
          type: dashboardActions.FETCHING_PROJECTS_SUCCESSFUL,
          projects: data.projects
        });
      })
      .catch(({ response }) => {
        let message;
        if (response) {
          message = response.message || response.data.message;
        } else {
          message = "connection error";
        }
        dispatch({ type: dashboardActions.FETCHING_PROJECTS_FAILED, message });
      });
  };
};
