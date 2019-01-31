import dA from "../actions/project-funder/dashboard";
import modals from "../actions/modals";

export const clearAddModal = () => ({
  type: dA.CLEAR_ADD
})

export const showModal = (name, id) => ({
  type: dA.SHOW_MODAL_FORM,
  name,
  id
});

export const showStakeHolderModal = id => ({
  type: dA.SHOW_STAKEHOLDER_MODAL,
  name: modals.view_stakeholder,
  id
})

export const showDeleteModal = (id, activated) => ({
  type: dA.SHOW_DELETE_MODAL_FORM,
  name: modals.delete_project,
  activated,
  id
})

export const closeModal = name => ({
  type: dA.CLOSE_MODAL_FORM
})

export const showImageInModal = image => ({
  type: dA.SHOW_IMAGE_IN_MODAL_FORM,
  name: modals.view_image,
  image
})

export const showTaskModal = id => ({
  type: dA.SHOW_TASK_MODAL,
  name: modals.view_task,
  id
})

export const showAddTaskModal = id => ({
  type: dA.SHOW_ADD_TASK_MODAL,
  name: modals.add_task,
  id
})

export const showAddStakeholderModal = id => ({
  type: dA.SHOW_ADD_STAKEHOLDER_MODAL,
  name: modals.add_stakeholder,
  id
})

export const showAddTransactionModal = id => ({
  type: dA.SHOW_ADD_TRANSACTION_MODAL,
  name: modals.add_transaction,
  id
})

export const showAddDocumentModal = id => ({
  type: dA.SHOW_ADD_DOCUMENT_MODAL,
  name: modals.add_document,
  id
})

export const showSetInterestsModal = ()=>({
  type: dA.SHOW_MODAL_FORM,
  name: modals.set_interests
})