import React from "react";
import AddProjectModal from "./add.project";
import AddTaskModal from "./add.task";
import ViewTaskModal from "./view.task";

import styled from "styled-components";
import { connect } from "react-redux";
import { closeModal } from "../../store/action-creators/modal";
import modalActions from "../../store/actions/modals";
import modals from "../../store/actions/modals";


const SharedCloseButton = styled.button`
background: #e0e0e0;
border: 0;
font-weight: 400;
font-size: 1em;
border-radius: 50%;
color: white;
height: 1.6em;
width: 1.6em;
padding: 0;
line-height: 0;
float: right;
`

const ModalWrapperStyler = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(251, 251, 251, 0.66);
  backdrop-filter: blur(4px);
  overflow: auto;

  #form-container {
    background: #ffffff;
    border-radius: 17px;
    padding: 2em;
    position: relative;
  }

  #form-heading {
    text-align: left;
    color: #333;
    text-transform: capitalize;
    font-size: 1.2em;
    line-height: normal;
    font-size: 28px;
    margin: 0;
    font-weight: 500;
    color: #4f4f4f;
  }

`;

const ViewTaskMotherWrapper = styled.div`
position: fixed;
z-index: 2;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(251, 251, 251, 0.66);
backdrop-filter: blur(4px);
overflow: auto;

#form-container {
  background: #ffffff;
  border-radius: 17px;
  position: relative;
  overflow: hidden;
}

.fix{
  position: absolute;
  right: 1em;
  top: 1em;
}

`

const ModalSelector = ({ name }) => {
  switch (name) {
    case modalActions.add_task:
      return <AddTaskModal />;

    case modalActions.add_project:
      return <AddProjectModal />;

      case modalActions.view_task:
      return <ViewTaskModal/>

    default:
      return null;
  }
};


class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name, dispatch } = this.props;

    if (name !== "") {

      switch(name){
        case modals.view_task:
        return  <ViewTaskMotherWrapper>
        <div className="center-wrapper">
          <div className="center">
            <div id="form-container" className={"xs-12 sm-10 sm-off-1"}>
              <div className= {"fix"} >
                <SharedCloseButton
                  id="close-button"
                  onClick={() => dispatch(closeModal())}
                >
                  x
                </SharedCloseButton>
              </div>
              <ModalSelector name={name} />
            </div>
          </div>
        </div>
      </ViewTaskMotherWrapper>
  
        default: 
        return (
          <ModalWrapperStyler>
            <div className="center-wrapper">
              <div className="center">
                <div id="form-container" className={"xs-12 sm-6 sm-off-3"}>
                  <div className="xs-11">
                    <h1 id="form-heading">{name}</h1>
                  </div>
  
                  <div className= {"xs-1"}>
                    <SharedCloseButton
                      id="close-button"
                      onClick={() => dispatch(closeModal())}
                    >
                      x
                    </SharedCloseButton>
                  </div>
                  <ModalSelector name={name} />
                </div>
              </div>
            </div>
          </ModalWrapperStyler>
        );
      
      }
    }

    return null;
  }
}

export default connect()(ModalWrapper);
