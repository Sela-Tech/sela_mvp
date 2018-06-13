import dA from "../../actions/project-funder/dashboard";
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
    case dA.ADD_TASK_IN_PROGRESS:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_TASK_IN_PROGRESS
          }
        }
      };

    case dA.ADD_TASK_SUCCESSFUL:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_TASK_SUCCESSFUL,
            message: payload.message || "Task Added Successfully"
          }
        }
      };

    case dA.ADD_TASK_FAILED:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_TASK_FAILED,
            message: payload.message || "Could Not Add A Task."
          }
        }
      };

    case dA.WATCH_VIDEO:
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

    case dA.CLEAR_VIDEO:
      return {
        ...state,
        single: {
          ...state.single,
          video_to_watch: {}
        }
      };
    case dA.SHOW_TASK_MODAL:
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
