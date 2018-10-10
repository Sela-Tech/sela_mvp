import dA from "../../actions/project-funder/dashboard";
import modals from "../../actions/project-funder/modals";
export const showModal = (name, id) => {
  return {
    type: dA.SHOW_MODAL_FORM,
    name,
    id
  };
};

export const showDeleteModal = (id, activated) => {
  return {
    type: dA.SHOW_DELETE_MODAL_FORM,
    name: modals.delete_project,
    activated,
    id
  };
};

export const closeModal = name => {
  return {
    type: dA.CLOSE_MODAL_FORM
  };
};

export const showImageInModal = (name, image) => {
  return {
    type: dA.SHOW_IMAGE_IN_MODAL_FORM,
    name,
    image
  };
};

export const showTaskModal = (name, data) => {
  return {
    type: dA.SHOW_TASK_MODAL,
    name,
    data
  };
};
