import dA from "../../actions/dashboard";
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
    case dA.GET_TASK_R:
      return {
        ...state,
        single: {
          ...state.single,
          action: {
            type: dA.GET_TASK_R,
            message: ""
          }
        }
      };

    case dA.GET_TASK_S:
      return {
        ...state,
        single: {
          ...state.single,
          action: {
            type: dA.GET_TASK_S,
            message: payload.message || "Task Fetched Successfully"
          },
          info: payload.info
        }
      };

    case dA.GET_TASK_F:
      return {
        ...state,
        single: {
          ...state.single,
          action: {
            type: dA.GET_TASK_F,
            message: payload.message || "Could Not Fetch Task Info."
          }
        }
      };

    case dA.GET_TASKS_R:
      return {
        ...state,
        all: {
          action: {
            type: dA.GET_TASKS_R,
            message: ""
          }
        }
      };

    case dA.GET_TASKS_S:
      return {
        ...state,
        all: {
          action: {
            type: dA.GET_TASKS_S,
            message: payload.message || "Tasks Fetched Successfully"
          },
          collection: []
        }
      };

    case dA.GET_TASKS_F:
      return {
        ...state,
        all: {
          action: {
            type: dA.GET_TASKS_F,
            message: payload.message || "Could Not Fetch Tasks."
          }
        }
      };

    case dA.ADD_TASK_R:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_TASK_R,
            message: ""
          }
        }
      };

    case dA.ADD_TASK_S:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_TASK_S,
            message: payload.message || "Task Added Successfully"
          }
        }
      };

    case dA.ADD_TASK_F:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_TASK_F,
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

    default:
      return state;
  }
};
