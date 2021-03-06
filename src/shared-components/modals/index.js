import React from "react";
import AddProjectModal from "./add.project";
import AddTaskModal from "./add.task";
import ModifyTaskModal from "./modify.task";
import JustViewTaskModal from "./plain.view.task";
import AddTransactionModal from "./add.transaction";
import TokenTransferModal from "./transfer.token";
import ViewTaskModal from "./view.task";
import ViewImageModal from "./view.image";
import DeleteProjectModal from "./delete.project";
import ViewStakeholderModal from "./view.stakeholder";
import AddDocumentModal from "./add.document";
import SetInterestModal from "./set.interests";
import ShowSdgModal from "./show.sdg";
import { connect } from "react-redux";
import { closeModal } from "../../store/action-creators/modal";
import * as modals from "../../store/actions/modal";

import { SharedCloseButton, GenericModalWrapperStyler } from "./styles.modals/main";
import AddStakeholderModal from "./add.stakeholder";
import AddRequest from "./add.request";
import SubmissionModal from "./submission.modal";
import Walkthrough from "./walkthrough.modal";

const GenericModalWrapper = ({ 
  specific_type, close, name,
  stop, has_heading, className,
  close_button_styling = {},
  children, show_close_button = true 
})=>{
  
  return <GenericModalWrapperStyler className={specific_type}>
  <div className="center-wrapper">
    <div className="center" onClick={close}>
        
      <div id="form-container"
        className={className}
        onClick={stop ? stop : ()=>{}}>
        <div className='xs-12 top-header'>
          { has_heading &&
            <div className="xs-10">
              <h1 id="form-heading">{name}</h1>
            </div>
          }
          { show_close_button && 
            <div className={ has_heading ?`xs-1`:`xs-off-1 xs-off-10`}>
              <SharedCloseButton id="close-button" onClick={close} style={close_button_styling}>
              &times;
              </SharedCloseButton>
            </div>
          }
        </div>
        <div className='padded xs-12'>
          {children}
        </div>
      </div>
      </div>
    </div>
  </GenericModalWrapperStyler>;

}

const  ModalWrapper = (props)=>{
  const stop = e => e.stopPropagation(),
  close = e => props.dispatch(closeModal()),
  { type } = props;
  let name ="";
  
  switch (type) {
    case modals.SHOW_TOKEN_TRANSFER_MODAL:
      return (
        <GenericModalWrapper
        name={name}  
        specific_type={'interests'}
        className={"xs-12 sm-8 sm-off-2 md-4 md-off-4 no-padding"}            
        close={close} stop={stop} 
        has_heading={false} show_close_button={true} >
       
      <TokenTransferModal/>
      </GenericModalWrapper>
      );

    case modals.SHOW_TASK_MODAL:
      return (
        <GenericModalWrapper 
        specific_type={'task'}
        name={name} stop={stop} 
        className={'xs-12 sm-10 sm-off-1'} 
        close={close}>
        <ViewTaskModal />
        </GenericModalWrapper>
      );

  case modals.SHOW_IMAGE_IN_MODAL_FORM:
    return (
      <GenericModalWrapper 
      specific_type={'view-image'}
      name={name} stop={stop} 
      className={'xs-12 sm-10 sm-off-1'} 
      close={close} 
      close_button_styling={{
        background: "#2283d0",
        fontSize: "1.5em"
      }}>
      <ViewImageModal/>
      </GenericModalWrapper>
    );

    case modals.SHOW_ADD_PROJECT_MODAL:
      return <GenericModalWrapper 
        name={name}  
        specific_type={'interests'}
        className={"xs-12 sm-8 sm-off-2 no-padding"}            
        close={close} stop={stop} 
        has_heading={false} show_close_button={true} >
            <AddProjectModal/>
      </GenericModalWrapper>

      case modals.SHOW_ADD_REQUEST_MODAL:
      return <GenericModalWrapper 
        name={name}  
        specific_type={'interests'}
        className={"xs-12 sm-8 sm-off-2 no-padding"}            
        close={close} stop={stop} 
        has_heading={false} show_close_button={true} >
            <AddRequest/>
      </GenericModalWrapper>


    case modals.SHOW_DELETE_MODAL_FORM:
      return (
        <GenericModalWrapper name={name} className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"}
        close={close} stop={stop} >
          <DeleteProjectModal/>
        </GenericModalWrapper>
      );

    case modals.SHOW_ADD_STAKEHOLDER_MODAL:
      return <AddStakeholderModal close={close} stop={stop}/>
    
    case modals.SHOW_STAKEHOLDER_MODAL:
      return <GenericModalWrapper name={name}  
      className={"xs-12 sm-6 sm-off-3 md-4 md-off-4 no-padding"}            
      close={close} stop={stop} >
        <ViewStakeholderModal/>
      </GenericModalWrapper>
      
    case modals.SHOW_INTERESTS_MODAL:
      return <GenericModalWrapper 
      name={name}  
      specific_type={'interests'}
      className={"xs-12 sm-8 sm-off-2 md-6 md-off-3 no-padding"}            
      close={close} stop={stop} 
      has_heading={false} show_close_button={true} >
        <SetInterestModal/>
      </GenericModalWrapper>

    case modals.SHOW_ADD_TASK_MODAL:
      return <GenericModalWrapper 
      name={name}  
      specific_type={'interests'}
      className={"xs-12 sm-8 sm-off-2 md-6 md-off-3 no-padding"}            
      close={close} stop={stop} 
      has_heading={false} show_close_button={true} >
        <AddTaskModal/>
      </GenericModalWrapper>

    case modals.SHOW_EDIT_TASK_MODAL:
      return <GenericModalWrapper 
      name={name}  
      specific_type={'interests'}
      className={"xs-12 sm-8 sm-off-2 md-6 md-off-3 no-padding"}            
      close={close} stop={stop} 
      has_heading={false} show_close_button={true} >
      <ModifyTaskModal/>
      </GenericModalWrapper>

    case modals.SHOW_VIEW_TASK_MODAL:
      return <GenericModalWrapper 
      name={name}  
      specific_type={'interests'}
      className={"xs-12 sm-8 sm-off-2 md-6 md-off-3 no-padding"}            
      close={close} stop={stop} 
      has_heading={false} show_close_button={true} >
      <JustViewTaskModal/>
      </GenericModalWrapper>

    case modals.SHOW_ADD_DOCUMENT_MODAL:
      return <GenericModalWrapper 
        name={name}  
        specific_type={'interests'}
        className={"xs-12 sm-6 sm-off-3 md-4 md-off-4 no-padding"}            
        close={close} stop={stop} 
        has_heading={false} show_close_button={true} >
            <AddDocumentModal/>
      </GenericModalWrapper>

    case modals.SHOW_ADD_TRANSACTION_MODAL:
      return <GenericModalWrapper 
      name={name}  
      specific_type={'interests'}
      className={"xs-12 sm-8 sm-off-2 md-6 md-off-3 no-padding"}            
      close={close} stop={stop} 
      has_heading={false} show_close_button={true} >
        <AddTransactionModal />
      </GenericModalWrapper>
    
    case modals.SHOW_WALKTHROUGH_MODAL:
      return <GenericModalWrapper 
      name={name}  
      specific_type={'interests'}
      className={"xs-12 sm-8 sm-off-2 md-6 md-off-3 no-padding"}            
      close={close} stop={stop} 
      has_heading={false} show_close_button={true} >
        <Walkthrough />
      </GenericModalWrapper>
      

    case modals.SHOW_SUBMISSION_BY_TYPE_MODAL:
      return props.submissionModalType === 'table' ?
      <GenericModalWrapper
        name={name}  
        specific_type={'interests'}
        className={"xs-12 no-padding"}            
        close={close} stop={stop} 
        has_heading={false} show_close_button={true} >
          <SubmissionModal />
      </GenericModalWrapper>
      :
      <GenericModalWrapper
      name={name}  
      specific_type={'interests'}
      className={"xs-12 no-padding"}            
      close={close} stop={stop} 
      has_heading={false} show_close_button={true} >
        <SubmissionModal />
      </GenericModalWrapper>
      
    case modals.LAUNCH_SDG:
      return <ShowSdgModal close={close} stop={stop}/>;

    default: 
      return null;

    }
  }

  const mapStateToProps = state => {
    return {
      type: state.modal.type_of_modal,
      submissionModalType: state.modal.submissionModalType
    }
  }
export default connect(mapStateToProps)(ModalWrapper);
