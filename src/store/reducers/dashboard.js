import dashboardActions from "../actions/dashboard";

const initstate = {
  modalToShow: "",
  image_to_show: ""
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case dashboardActions.SHOW_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name
      };

    case dashboardActions.SHOW_IMAGE_IN_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        image_to_show: payload.image
      };

    case dashboardActions.SHOW_TASK_MODAL:
      return {
        ...state,
        modalToShow: payload.name
      };

    case dashboardActions.CLOSE_MODAL_FORM:
      return {
        ...state,
        modalToShow: ""
      };

    default:
      return state;
  }
};
