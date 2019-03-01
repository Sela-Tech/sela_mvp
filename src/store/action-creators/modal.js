import { SHOW_MODAL_FORM, CLOSE_MODAL_FORM } from "../actions/modal";

export const showModal = (type_of_modal, extra) => ({
  type: SHOW_MODAL_FORM,
  type_of_modal,
  extra
});

export const closeModal = type_of_modal => ({
  type: CLOSE_MODAL_FORM,
  type_of_modal
})