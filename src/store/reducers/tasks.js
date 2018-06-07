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
    case dashboardActions.ADD_TASK_IN_PROGRESS:
      return {
        ...state,
        add: {
          action: {
            type: dashboardActions.ADD_TASK_IN_PROGRESS
          }
        }
      };

    case dashboardActions.ADD_TASK_SUCCESSFUL:
      return {
        ...state,
        add: {
          action: {
            type: dashboardActions.ADD_TASK_SUCCESSFUL,
            message: payload.message || "Task Added Successfully"
          }
        }
      };

    case dashboardActions.ADD_TASK_FAILED:
      return {
        ...state,
        add: {
          action: {
            type: dashboardActions.ADD_TASK_FAILED,
            message: payload.message || "Could Not Add A Task."
          }
        }
      };

    default:
      return state;
  }
};
