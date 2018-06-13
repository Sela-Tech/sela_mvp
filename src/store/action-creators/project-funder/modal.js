import dA from "../../actions/project-funder/dashboard";
export const showModal = name => {
  return {
    type: dA.SHOW_MODAL_FORM,
    name
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
