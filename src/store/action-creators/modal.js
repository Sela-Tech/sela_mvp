import m from "../actions/modal";

export const clearAddModal = () => ({
  type: m.CLEAR_ADD
})

export const showModal = (name, id) => ({
  type: m.SHOW_MODAL_FORM,
  name,
  id
});

export const showStakeHolderModal = id => ({
  type: m.SHOW_STAKEHOLDER_MODAL,
  name: m.view_stakeholder,
  id
})

export const showDeleteModal = (id, activated) => ({
  type: m.SHOW_DELETE_MODAL_FORM,
  name: m.delete_project,
  activated,
  id
})

export const closeModal = name => ({
  type: m.CLOSE_MODAL_FORM
})

export const showImageInModal = image => ({
  type: m.SHOW_IMAGE_IN_MODAL_FORM,
  name: m.view_image,
  image
})

export const showTaskModal = () => ({
  type: m.SHOW_TASK_MODAL,
  name: m.view_task
})

export const showAddTaskModal = id => ({
  type: m.SHOW_ADD_TASK_MODAL,
  name: m.add_task,
  id
})

export const showModifyTaskModal = id => ({
  type: m.SHOW_MODIFY_TASK_MODAL,
  name: m.modify_task,
  id
})

export const showAddStakeholderModal = id => ({
  type: m.SHOW_ADD_STAKEHOLDER_MODAL,
  name: m.add_stakeholder,
  id
})

export const showAddTransactionModal = id => ({
  type: m.SHOW_ADD_TRANSACTION_MODAL,
  name: m.add_transaction,
  id
})

export const showAddDocumentModal = id => ({
  type: m.SHOW_ADD_DOCUMENT_MODAL,
  name: m.add_document,
  id
})

export const showSetInterestsModal = ()=>({
  type: m.SHOW_MODAL_FORM,
  name: m.set_interests
})