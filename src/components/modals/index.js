import React from "react";
import AddProjectModal from "./add.project";
import AddTaskModal from "./add.task";
import ViewTaskModal from "./view.task";
import ViewImageModal from "./view.image";

import { connect } from "react-redux";
import { closeModal } from "../../store/action-creators/modal";
import modalActions from "../../store/actions/modals";
import modals from "../../store/actions/modals";

import {
  SharedCloseButton,
  ModalWrapperStyler,
  ViewTaskMotherWrapper
} from "../../styles/dashboard/modals/main";

const ModalSelector = ({ name }) => {
  switch (name) {
    case modalActions.add_task:
      return <AddTaskModal />;

    case modalActions.add_project:
      return <AddProjectModal />;

    case modalActions.view_task:
      return <ViewTaskModal />;

    case modalActions.view_image:
      return <ViewImageModal />;
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
      switch (name) {
        case modals.view_task:
          return (
            <ViewTaskMotherWrapper>
              <div className="center-wrapper">
                <div className="center">
                  <div id="form-container" className={"xs-12 sm-10 sm-off-1"}>
                    <div className={"fix"}>
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
          );

        case modals.view_image:
          return (
            <ViewTaskMotherWrapper>
              <div className="center-wrapper">
                <div className="center">
                  <div id="form-container" className={"xs-12 sm-10 sm-off-1"}>
                    <div className={"fix"}>
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
          );

        default:
          return (
            <ModalWrapperStyler>
              <div className="center-wrapper">
                <div className="center">
                  <div id="form-container" className={"xs-12 sm-6 sm-off-3"}>
                    <div className="xs-11">
                      <h1 id="form-heading">{name}</h1>
                    </div>

                    <div className={"xs-1"}>
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
