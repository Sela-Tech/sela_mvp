import dA from "../../actions/project-funder/dashboard";

const initstate = {
  add: {
    action: {
      type: "",
      message: ""
    }
  },
  stakeholder: {
    action: {
      type: "",
      message: ""
    }
  },
  delete: {
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
    case dA.CLEAR_ADD:
      return {
        ...state,
        add: initstate.add
      };
    case dA.ADD_STAKEHOLDER_FAILED:
      return {
        ...state,
        stakeholder: {
          action: {
            type: dA.ADD_STAKEHOLDER_FAILED,
            message: payload.message
          }
        }
      };

    case dA.ADD_STAKEHOLDER_IN_PROGRESS:
      return {
        ...state,
        stakeholder: {
          action: {
            type: dA.ADD_STAKEHOLDER_IN_PROGRESS
          }
        }
      };

    case dA.ADD_STAKEHOLDER_SUCCESSFUL:
      return {
        ...state,
        stakeholder: {
          action: {
            type: dA.ADD_STAKEHOLDER_SUCCESSFUL,
            message: payload.message
          }
        }
      };
    case dA.FETCHING_PROJECT_IN_PROGRESS:
      return {
        ...state,
        single: {
          action: {
            type: dA.FETCHING_PROJECT_IN_PROGRESS
          }
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

    case dA.DELETE_PROJECT_IN_PROGRESS:
      return {
        ...state,
        delete: {
          action: {
            type: dA.DELETE_PROJECT_IN_PROGRESS
          }
        }
      };

    case dA.DELETE_PROJECT_SUCCESSFUL:
      return {
        ...state,
        delete: {
          action: {
            type: dA.DELETE_PROJECT_SUCCESSFUL,
            message: payload.message || "Action Carried Out Successfully"
          }
        }
      };

    case dA.DELETE_PROJECT_FAILED:
      return {
        ...state,
        delete: {
          action: {
            type: dA.DELETE_PROJECT_FAILED,
            message: payload.message || "Could Not Carry Out Action"
          }
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

    case dA.SELECT_FUNDERS:
      return {
        ...state,
        funders: {
          ...state.funders,
          action: {
            type: dA.SELECT_FUNDERS
          },
          selected: payload.selected
        }
      };

    case dA.FETCHING_P_STAKEHOLDERS_IN_PROGRESS:
      return {
        ...state,
        funders: {
          action: {
            type: dA.FETCHING_P_STAKEHOLDERS_IN_PROGRESS
          }
        }
      };

    case dA.FETCHING_P_STAKEHOLDERS_SUCCESSFUL:
      return {
        ...state,
        funders: {
          action: {
            type: dA.FETCHING_P_STAKEHOLDERS_SUCCESSFUL,
            message: payload.message || "Funders Fetched Successfully"
          },
          options: payload.pstakeholders.map(f => {
            return {
              value: f._id,
              label: `${f.lastName} ${f.firstName}, Org: ${
                f.organization.name
              }, ${(f.isFunder === true && "Funds Projects") ||
                (f.isContractor === true && "Contractor") ||
                (f.isEvaluator === true && "Evaluation Agent")}`,
              organization: f.organization.name
            };
          })
        }
      };

    case dA.FETCHING_P_STAKEHOLDERS_FAILED:
      return {
        ...state,
        funders: {
          action: {
            type: dA.FETCHING_P_STAKEHOLDERS_FAILED,
            message: payload.message || "Could Not Fetch Possible Funders."
          }
        }
      };

    default:
      return state;
  }
};
