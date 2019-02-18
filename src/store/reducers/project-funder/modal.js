
import modal from "../../actions/modal";

const initstate = {
  modalToShow: "",
  image_to_show: "",
  stakeholder: "",
  projectId: "",
  taskId: ""
};

export default (state = initstate, payload) => {
  switch (payload.type) {
    case modal.SHOW_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        id: payload.id
      };

    case modal.SHOW_DELETE_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        id: payload.id,
        activated: payload.activated
      };

    case modal.SHOW_IMAGE_IN_MODAL_FORM:
      return {
        ...state,
        modalToShow: payload.name,
        image_to_show: payload.image
      };

    case modal.SHOW_STAKEHOLDER_MODAL:
      return {
        ...state,
        modalToShow: payload.name,
        stakeholder: payload.id
      };

    case modal.SHOW_ADD_STAKEHOLDER_MODAL:
      return {
        ...state,
        modalToShow: payload.name,
        projectId: payload.id
      };

    case modal.SHOW_ADD_TASK_MODAL:
      return {
        ...state,
        modalToShow: modal.add_task,
        projectId: payload.id
      };

      case modal.SHOW_MODIFY_TASK_MODAL:
      return {
        ...state,
        modalToShow: modal.modify_task
      };

    case modal.SHOW_ADD_DOCUMENT_MODAL:
      return {
        ...state,
        modalToShow: modal.add_document,
        projectId: payload.id
      };

    case modal.SHOW_TASK_MODAL:
      return {
        ...state,
        modalToShow: modal.view_task,
        taskId: payload.id
      };

    case modal.SHOW_ADD_TRANSACTION_MODAL:
      return {
        ...state,
        modalToShow: modal.add_transaction,
        projectId: payload.id
      };

    case modal.CLOSE_MODAL_FORM:
      return {
        ...state,
        modalToShow: ""
      };

    default:
      return state;
  }
};
