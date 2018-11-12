import dA from "../../actions/project-funder/dashboard";
const initstate = {
  type: "",
  message: "",
  info: {},
  collection: []
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    // case dA.FETCH_TASKS_IN_PROGRESS:
    //   return {
    //     ...state,
    //     all: {
    //       action: {
    //         type: dA.FETCH_TASKS_IN_PROGRESS
    //       }
    //     }
    //   };

    // case dA.FETCH_TASKS_SUCCESSFUL:
    //   return {
    //     ...state,
    //     all: {
    //       action: {
    //         type: dA.FETCH_TASKS_SUCCESSFUL,
    //         message: payload.message || "Tasks Fetched Successfully"
    //       },
    //       collection: []
    //     }
    //   };

    // case dA.FETCH_TASKS_FAILED:
    //   return {
    //     ...state,
    //     all: {
    //       action: {
    //         type: dA.FETCH_TASKS_FAILED,
    //         message: payload.message || "Could Not Fetch Tasks."
    //       }
    //     }
    //   };

    case dA.ADD_DOCUMENT_IN_PROGRESS:
      return {
        ...state,
        type: dA.ADD_DOCUMENT_IN_PROGRESS
      };

    case dA.ADD_DOCUMENT_SUCCESSFUL:
      return {
        ...state,
        type: dA.ADD_DOCUMENT_SUCCESSFUL,
        message: payload.message || "Document Added Successfully"
      };

    case dA.ADD_DOCUMENT_FAILED:
      return {
        ...state,
        type: dA.ADD_DOCUMENT_FAILED,
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
