import dashboardActions from "../actions/dashboard";
export const showModal = name => {
  return {
    type: dashboardActions.SHOW_MODAL_FORM,
    name
  };
};

export const closeModal = name => {
  return {
    type: dashboardActions.CLOSE_MODAL_FORM
  };
};

export const showImageInModal = (name, image) => {
  return {
    type: dashboardActions.SHOW_IMAGE_IN_MODAL_FORM,
    name,
    image
  };
};

export const showTaskModal = (name, data) => {
  return {
    type: dashboardActions.SHOW_TASK_MODAL,
    name,
    data
  };
};
