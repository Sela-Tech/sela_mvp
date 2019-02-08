import dA from "../../actions/project-funder/dashboard";
const initstate = {
  type: "",
  message: "",
  info: {},
  collection: []
};

export default (state = initstate, payload) => {
  switch (payload.type) {

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

    default:
      return state;
  }
};
