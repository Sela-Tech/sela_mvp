import dA from "../../actions/project-funder/dashboard";
const initstate = {
  modalToShow: "",
  image_to_show: ""
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case dA.SHOW_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        id: payload.id
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

    case dA.CLOSE_MODAL_FORM:
      return {
        ...state,
        modalToShow: ""
      };

    default:
      return state;
  }
};
