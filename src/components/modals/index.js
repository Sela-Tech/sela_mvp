import React from "react";
import AddProjectModal from "./add.project";
import AddTaskModal from "./add.task";
import styled from "styled-components";
import { connect } from "react-redux";
import { closeModal } from "../../store/action-creators/modal";
import modalActions from "../../store/actions/modals";

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

  #close-button {
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
  }
`;

const ModalSelector = ({ name }) => {
  switch (name) {
    case modalActions.add_task:
      return <AddTaskModal />;

    case modalActions.add_project:
      return <AddProjectModal />;

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
      return (
        <ModalWrapperStyler>
          <div className="center-wrapper">
            <div className="center">
              <div id="form-container" className="xs-12 sm-6 sm-off-3">
                <div className="xs-11">
                  <h1 id="form-heading">{name}</h1>
                </div>

                <div className="xs-1">
                  <button
                    id="close-button"
                    onClick={() => dispatch(closeModal())}
                  >
                    x
                  </button>
                </div>
                <ModalSelector name={name} />
              </div>
            </div>
          </div>
        </ModalWrapperStyler>
      );
    }

    return null;
  }
}

export default connect()(ModalWrapper);
