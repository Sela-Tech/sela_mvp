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
    video_to_watch: {
      src: "",
      playing: false
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

    case dashboardActions.WATCH_VIDEO:
      return {
        ...state,
        single: {
          ...state.single,
          video_to_watch: {
            src: payload.src,
            playing: payload.playing
          }
        }
      };

    case dashboardActions.CLEAR_VIDEO:
      return {
        ...state,
        single: {
          ...state.single,
          video_to_watch: {}
        }
      };
    case dashboardActions.SHOW_TASK_MODAL:
      return {
        ...state,
        single: {
          ...state.single,
          info: payload.data
        }
      };

    default:
      return state;
  }
};
