import dA from "../actions/dashboard";
// import { UPDATE_OBSERVATION_BUDGET } from "../actions/evidence";

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
    collection: {
      createdProjects: []
    }
  },
  stakeholders: {
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

    // case UPDATE_OBSERVATION_BUDGET:
    // return {
    //   ...state,
    //   single: {
    //     ...state.single,
    //     info: {
    //       ...state.single.info,
    //       observationBudget: state.single.info.observationBudget  - payload.amount
    //     }
    //   }
    // }

    case dA.CLEAR_ADD:
      return {
        ...state,
        add: initstate.add
      };
    case dA.ADD_STAKEHOLDER_F:
      return {
        ...state,
        stakeholder: {
          action: {
            type: dA.ADD_STAKEHOLDER_F,
            message: payload.message
          }
        }
      };

    case dA.ADD_STAKEHOLDER_R:
      return {
        ...state,
        stakeholder: {
          action: {
            type: dA.ADD_STAKEHOLDER_R,
            message: ""
          }
        }
      };

    case dA.ADD_STAKEHOLDER_S:
      return {
        ...state,
        stakeholder: {
          action: {
            type: dA.ADD_STAKEHOLDER_S,
            message: payload.message
          }
        }
      };
    case dA.GET_PROJ_R:
      return {
        ...state,
        single: {
          action: {
            type: dA.GET_PROJ_R,
            message: ""
          },
          info: state.single.info
        }
      };

    case dA.GET_PROJ_S:
      return {
        ...state,
        single: {
          action: {
            type: dA.GET_PROJ_S,
            message: payload.message
          },
          info:payload.info
          
        }
      };

    case dA.GET_PROJ_F:
      return {
        ...state,
        single: {
          action: {
            type: dA.GET_PROJ_F,
            message: payload.message || "Could Not Fetch Projects"
          },
          info: []
        }
      };

    case dA.GET_PROJS_R:
      return {
        ...state,
        all: {
          action: {
            type: dA.GET_PROJS_R,
            message: ""
          },
          collection: state.all.collection
        }
      };

    case dA.GET_PROJS_S:
    let collection = state.all.collection;

    if(payload.category === 'a'){
      collection = payload.projects
    }
    if(payload.category === "s"){
      collection = {
        ...collection,
        savedProjects: payload.projects.savedProjects
      }
    }
    if(payload.category === "c"){
      collection = {
        ...collection,
        createdProjects: payload.projects.createdProjects
      }
    }
    if(payload.category === "j"){
      collection = {
        ...collection,
        fundedProjects: payload.projects.fundedProjects,
        joinedProjects: payload.projects.joinedProjects
      }
    }

    if(payload.category === "i"){
      collection = {
        ...collection,
        areasOfInterest: payload.projects.areasOfInterest
      }
    }
    
      return {
        ...state,
        all: {
          action: {
            type: dA.GET_PROJS_S,
            message: payload.message
          },
          collection
        }
      };

    case dA.GET_PROJS_F:
      return {
        ...state,
        all: {
          action: {
            type: dA.GET_PROJS_F,
            message: payload.message || "Could Not Fetch Projects"
          },
          collection: []
        }
      };

    case dA.DELETE_PROJ_R:
      return {
        ...state,
        delete: {
          action: {
            type: dA.DELETE_PROJ_R,
            message: ""
          }
        }
      };

    case dA.DELETE_PROJ_S:
      return {
        ...state,
        delete: {
          action: {
            type: dA.DELETE_PROJ_S,
            message: payload.message || "Action Carried Out Successfully"
          }
        }
      };

    case dA.DELETE_PROJ_F:
      return {
        ...state,
        delete: {
          action: {
            type: dA.DELETE_PROJ_F,
            message: payload.message || "Could Not Carry Out Action"
          }
        }
      };

    case dA.ADD_PROJ_R:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_PROJ_R,
            message: ""
          }
        }
      };

    case dA.ADD_PROJ_S:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_PROJ_S,
            message: payload.message || "Project Added Successfully"
          }
        }
      };

    case dA.ADD_PROJ_F:
      return {
        ...state,
        add: {
          action: {
            type: dA.ADD_PROJ_F,
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

    case dA.GET_P_STAKEHOLDERS_R:
      return {
        ...state,
        stakeholders: {
          action: {
            type: dA.GET_P_STAKEHOLDERS_R,
            message: ""
          },
          options: []
        }
      };

    case dA.GET_P_STAKEHOLDERS_S:
  return {
        ...state,
        stakeholders: {
          action: {
            type: dA.GET_P_STAKEHOLDERS_S,
            message: payload.message || "Funders Fetched Successfully"
          },
          options: payload.pstakeholders.map(f => {
            return {
              name: `${f.firstName} ${f.lastName}`,
              type: `${(f.isFunder === true && "Project Funder") ||
                (f.isContractor === true && "Contractor") ||
                (f.isEvaluator === true && "Evaluation Agent")}`,
              img: Boolean(f.profilePhoto) ? f.profilePhoto: "",
              id: f._id,
              company: Boolean(f.organization) ? f.organization.name: ""
            };
          
          })
        }
      };

    case dA.GET_P_STAKEHOLDERS_F:
      return {
        ...state,
        stakeholders: {
          action: {
            type: dA.GET_P_STAKEHOLDERS_F,
            message: payload.message || "Could Not Fetch Possible Funders."
          }
        }
      };

    default:
      return state;
  }
};
