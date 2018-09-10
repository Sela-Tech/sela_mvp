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
    info: {}
  },
  all: {
    action: {
      type: "",
      message: ""
    },
    collection: []
  },
  funders: {
    action: {
      type: "",
      message: ""
    },
    list: [],
    selected: []
  }
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case dA.FETCHING_PROJECT_IN_PROGRESS:
      return {
        ...state,
        single: {
          action: {
            type: dA.FETCHING_PROJECT_IN_PROGRESS
          },
          info: []
        }
      };

    case dA.FETCHING_PROJECT_SUCCESSFUL:
      return {
        ...state,
        single: {
          action: {
            type: dA.FETCHING_PROJECT_SUCCESSFUL,
            message: payload.message
          },
          info: payload.info
        }
      };

    case dA.FETCHING_PROJECT_FAILED:
      return {
        ...state,
        single: {
          action: {
            type: dA.FETCHING_PROJECT_FAILED,
            message: payload.message || "Could Not Fetch Projects"
          },
          info: []
        }
      };

    case dA.FETCHING_PROJECTS_IN_PROGRESS:
      return {
        ...state,
        all: {
          action: {
            type: dA.FETCHING_PROJECTS_IN_PROGRESS
          },
          collection: []
        }
      };

    case dA.FETCHING_PROJECTS_SUCCESSFUL:
      return {
        ...state,
        all: {
          action: {
            type: dA.FETCHING_PROJECTS_SUCCESSFUL,
            message: payload.message
          },
          collection: payload.projects
        }
      };

    case dA.FETCHING_PROJECTS_FAILED:
      return {
        ...state,
        all: {
          action: {
            type: dA.FETCHING_PROJECTS_FAILED,
            message: payload.message || "Could Not Fetch Projects"
          },
          collection: []
        }
      };

    case dA.ADD_PROJECT_IN_PROGRESS:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_PROJECT_IN_PROGRESS
          }
        }
      };

    case dA.ADD_PROJECT_SUCCESSFUL:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_PROJECT_SUCCESSFUL,
            message: payload.message || "Project Added Successfully"
          }
        }
      };

    case dA.ADD_PROJECT_FAILED:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_PROJECT_FAILED,
            message: payload.message || "Could Not Add A Project."
          }
        }
      };

    case dA.FETCHING_FUNDERS_IN_PROGRESS:
      return {
        ...state,
        funders: {
          action: {
            type: dA.FETCHING_FUNDERS_IN_PROGRESS
          }
        }
      };

    case dA.SELECT_FUNDERS:
      return {
        ...state,
        funders: {
          ...state.funders,
          action: {
            type: dA.SELECT_FUNDERS
          },
          selected: []
        }
      };
    case dA.FETCHING_FUNDERS_SUCCESSFUL:
      return {
        ...state,
        funders: {
          action: {
            type: dA.FETCHING_FUNDERS_SUCCESSFUL,
            message: payload.message || "Funders Fetched Successfully"
          },
          list: payload.data
        }
      };

    case dA.FETCHING_FUNDERS_FAILED:
      return {
        ...state,
        funders: {
          action: {
            type: dA.FETCHING_FUNDERS_FAILED,
            message: payload.message || "Could Not Fetch Possible Funders."
          }
        }
      };

    default:
      return state;
  }
};
