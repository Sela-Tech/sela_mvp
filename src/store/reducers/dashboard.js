import dashboardActions from "../actions/dashboard";

const initstate = {
  modalToShow: "",
  addProject: {
    action: {
      type: "",
      message: ""
    }
  },
  projects: {
    action: {
      type: "",
      message: ""
    },
    collection: []
  }
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case dashboardActions.SHOW_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name
      };

    case dashboardActions.CLOSE_MODAL_FORM:
      return {
        ...state,
        modalToShow: ""
      };

    case dashboardActions.FETCHING_PROJECTS_IN_PROGRESS:
      return {
        ...state,
        projects: {
          action: {
            type: dashboardActions.FETCHING_PROJECTS_IN_PROGRESS
          },
          collection: []
        }
      };

    case dashboardActions.FETCHING_PROJECTS_SUCCESSFUL:
      return {
        ...state,
        projects: {
          action: {
            type: dashboardActions.FETCHING_PROJECTS_SUCCESSFUL,
            message: payload.message
          },
          collection: payload.projects
        }
      };

    case dashboardActions.FETCHING_PROJECTS_FAILED:
      return {
        ...state,
        projects: {
          action: {
            type: dashboardActions.FETCHING_PROJECTS_FAILED,
            message: payload.message || "Could Not Fetch Projects"
          },
          collection: []
        }
      };

    case dashboardActions.ADD_PROJECT_IN_PROGRESS:
      return {
        ...state,
        addProject: {
          action: {
            type: dashboardActions.ADD_PROJECT_IN_PROGRESS
          }
        }
      };

    case dashboardActions.ADD_PROJECT_SUCCESSFUL:
      return {
        ...state,
        addProject: {
          action: {
            type: dashboardActions.ADD_PROJECT_SUCCESSFUL,
            message: payload.message || "Project Added Successfully"
          }
        }
      };

    case dashboardActions.ADD_PROJECT_FAILED:
      return {
        ...state,
        addProject: {
          action: {
            type: dashboardActions.ADD_PROJECT_FAILED,
            message: payload.message || "Could Not Add A Project."
          }
        }
      };

    default:
      return state;
  }
};
