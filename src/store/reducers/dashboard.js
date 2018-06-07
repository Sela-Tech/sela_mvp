import dashboardActions from "../actions/dashboard";

const initstate = {
  modalToShow: ""
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case dashboardActions.SHOW_MODAL_FORM:
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
