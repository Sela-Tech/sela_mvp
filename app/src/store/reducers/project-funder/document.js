import dA from "../../actions/project-funder/dashboard";
const initstate = {
  type: "",
  message: "",
  info: {},
  collection: []
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    // case dA.GET_TASKS_R:
    //   return {
    //     ...state,
    //     all: {
    //       action: {
    //         type: dA.GET_TASKS_R
    //       }
    //     }
    //   };

    // case dA.GET_TASKS_S:
    //   return {
    //     ...state,
    //     all: {
    //       action: {
    //         type: dA.GET_TASKS_S,
    //         message: payload.message || "Tasks Fetched Successfully"
    //       },
    //       collection: []
    //     }
    //   };

    // case dA.GET_TASKS_F:
    //   return {
    //     ...state,
    //     all: {
    //       action: {
    //         type: dA.GET_TASKS_F,
    //         message: payload.message || "Could Not Fetch Tasks."
    //       }
    //     }
    //   };

    case dA.ADD_DOCUMENT_R:
      return {
        ...state,
        type: dA.ADD_DOCUMENT_R,
        message: ""
      };

    case dA.ADD_DOCUMENT_S:
      return {
        ...state,
        type: dA.ADD_DOCUMENT_S,
        message: payload.message || "Document Added Successfully"
      };

    case dA.ADD_DOCUMENT_F:
      return {
        ...state,
        type: dA.ADD_DOCUMENT_F,
        message: payload.message || "Could Not Add Document."
      };

    // case dA.SHOW_TASK_MODAL:
    //   return {
    //     ...state,
    //     single: {
    //       ...state.single,
    //       info: payload.data
    //     }
    //   };

    default:
      return state;
  }
};
