import dA from "../../actions/project-funder/dashboard";
const initstate = {
  modalToShow: "",
  image_to_show: "",
  stakeholder: ""
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case dA.SHOW_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        id: payload.id
      };

    case dA.SHOW_DELETE_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        id: payload.id,
        activated: payload.activated
      };

    case dA.SHOW_IMAGE_IN_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        image_to_show: payload.image
      };

    case dA.SHOW_TASK_MODAL:
      return {
        ...state,
        modalToShow: payload.name
      };

    case dA.SHOW_STAKEHOLDER_MODAL:
      return {
        ...state,
        modalToShow: payload.name,
        stakeholder: payload.id
      };

    case dA.SHOW_ADD_STAKEHOLDER_MODAL:
      return {
        ...state,
        modalToShow: payload.name,
        projectId: payload.id
      };

    case dA.CLOSE_MODAL_FORM:
      return {
        ...state,
        modalToShow: ""
      };

    default:
      return state;
  }
};
