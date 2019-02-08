import React from "react";
import AddProjectModal from "./add.project";
import AddTaskModal from "./add.task";
import AddTransactionModal from "./add.transaction";

import ViewTaskModal from "./view.task";
import ViewImageModal from "./view.image";
import DeleteProjectModal from "./delete.project";
import ViewStakeholderModal from "./view.stakeholder";
import AddDocumentModal from "./add.document";
import SetInterestModal from "./set.interests";

import { connect } from "react-redux";
import { closeModal } from "../../store/action-creators/modal";
import modals from "../../store/actions/modal";

import {
  SharedCloseButton,
  GenericModalWrapperStyler
} from "./styles.modals/main";
import AddStakeholderModal from "./add.stakeholder";


const SimiliarModalSelector = ({ name }) => {
  switch (name) {
    case modals.add_document:
      return <AddDocumentModal />;

    case modals.add_task:
      return <AddTaskModal />;

    case modals.add_transaction:
      return <AddTransactionModal />;

    case modals.view_stakeholder:
      return <ViewStakeholderModal />;

    default:
      return null;
   }
 };

const GenericModalWrapper = ({ specific_type,close, name, stop, has_heading, className,close_button_styling = {}, children,show_close_button = true })=>{
  
  return  name ? <GenericModalWrapperStyler className={specific_type}>
  <div className="center-wrapper">
    <div className="center" onClick={close}>
        
      <div id="form-container"
        className={className}
        onClick={stop ? stop: ()=>{}}>
        <div className='xs-12 top-header'>
          { has_heading &&
            <div className="xs-11">
              <h1 id="form-heading">{name}</h1>
            </div>
          }
          { show_close_button && 
            <div className={"xs-1"}>
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
  </GenericModalWrapperStyler>: null

}

const  ModalWrapper = (props)=>{
  const stop = e => e.stopPropagation(),
  close = e => props.dispatch(closeModal()),
   { name } = props;

   switch (name) {
        case modals.view_task:
          return (
            <GenericModalWrapper 
            specific_type={'task'}
            name={name} stop={stop} 
            className={'xs-12 sm-10 sm-off-1'} 
            close={close}>
            <ViewTaskModal />
            </GenericModalWrapper>
          );

        case modals.view_image:
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

        case modals.add_project:
          return (
            <GenericModalWrapper 
            close={close} stop={stop} className={"xs-12 sm-8 sm-off-2"}
            has_heading={true} name={name} >
              <AddProjectModal/>
            </GenericModalWrapper>
          );

        case modals.delete_project:
          return (
            <GenericModalWrapper name={name} className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"}
            close={close} stop={stop} >
              <DeleteProjectModal/>
            </GenericModalWrapper>
          );

        case modals.add_stakeholder:
          return <GenericModalWrapper name={name} className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"}
          close={close} stop={stop} has_heading={true} >
            <AddStakeholderModal/>
          </GenericModalWrapper>
       
        case modals.view_stakeholder:
          return <GenericModalWrapper name={name}  
          className={"xs-12 sm-6 sm-off-3 md-4 md-off-4 no-padding"}            
          close={close} stop={stop} >
            <ViewStakeholderModal/>
          </GenericModalWrapper>
    
    case modals.set_interests:
        return <GenericModalWrapper 
        name={name}  
        specific_type={'interests'}
        className={"xs-12 sm-6 sm-off-3 no-padding"}            
        close={close} stop={stop} 
        has_heading={false} show_close_button={true} >
          <SetInterestModal/>
        </GenericModalWrapper>
        
        default:
          return <GenericModalWrapper name={name}  
          className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"} 
          has_heading={true} 
          close={close} stop={stop} >
            <SimiliarModalSelector name={name}/>
          </GenericModalWrapper>

      }
  }

  const mapStateToProps = state => {
    return {
      name: state.modal.modalToShow
    }
  }
export default connect(mapStateToProps)(ModalWrapper);
