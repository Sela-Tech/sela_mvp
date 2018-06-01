import dashboardActions from "../../actions/dashboard";
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
