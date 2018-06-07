import dashboardActions from "../actions/dashboard";

const initstate = {
  add: {
    action: {
      type: "",
      message: ""
    }
  },
  single: {
    action: {
      type: "",
      message: ""
    },
    info: {}
  },
  all: {
    action: {
      type: "",
      message: ""
    },
    collection: []
  }
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case dashboardActions.FETCHING_PROJECT_IN_PROGRESS:
      return {
        ...state,
        single: {
          action: {
            type: dashboardActions.FETCHING_PROJECT_IN_PROGRESS
          },
          info: []
        }
      };

    case dashboardActions.FETCHING_PROJECT_SUCCESSFUL:
      return {
        ...state,
        single: {
          action: {
            type: dashboardActions.FETCHING_PROJECT_SUCCESSFUL,
            message: payload.message
          },
          info: payload.info
        }
      };

    case dashboardActions.FETCHING_PROJECT_FAILED:
      return {
        ...state,
        single: {
          action: {
            type: dashboardActions.FETCHING_PROJECT_FAILED,
            message: payload.message || "Could Not Fetch Projects"
          },
          info: []
        }
      };

    case dashboardActions.FETCHING_PROJECTS_IN_PROGRESS:
      return {
        ...state,
        all: {
          action: {
            type: dashboardActions.FETCHING_PROJECTS_IN_PROGRESS
          },
          collection: []
        }
      };

    case dashboardActions.FETCHING_PROJECTS_SUCCESSFUL:
      return {
        ...state,
        all: {
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
        all: {
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
        add: {
          action: {
            type: dashboardActions.ADD_PROJECT_IN_PROGRESS
          }
        }
      };

    case dashboardActions.ADD_PROJECT_SUCCESSFUL:
      return {
        ...state,
        add: {
          action: {
            type: dashboardActions.ADD_PROJECT_SUCCESSFUL,
            message: payload.message || "Project Added Successfully"
          }
        }
      };

    case dashboardActions.ADD_PROJECT_FAILED:
      return {
        ...state,
        add: {
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
