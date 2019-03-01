import  * as modals from "../../actions/modal";


const initstate = {
  type_of_modal: ""
};

export default (state = initstate, payload) => {
  switch (payload.type) {

    case modals.SHOW_MODAL_FORM:
      return {
        ...state,
        type_of_modal: payload.type_of_modal,
        ...payload.extra
      };

    case modals.CLOSE_MODAL_FORM:
      return {
        ...state,
        type_of_modal: ""
      };

    default:
      return state;
  }
};
