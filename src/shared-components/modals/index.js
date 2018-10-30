import React from "react";
import AddProjectModal from "./add.project";
import AddTaskModal from "./add.task";
import ViewTaskModal from "./view.task";
import ViewImageModal from "./view.image";
import DeleteProjectModal from "./delete.project";
import ViewStakeholderModal from "./view.stakeholder";

import { connect } from "react-redux";
import { closeModal } from "../../store/action-creators/project-funder/modal";
import modalActions from "../../store/actions/project-funder/modals";
import modals from "../../store/actions/project-funder/modals";

import {
  SharedCloseButton,
  ModalWrapperStyler,
  ViewTaskMotherWrapper
} from "./styles.modals/main";
import AddStakeholderModal from "./add.stakeholder";

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

    case modalActions.delete_project:
      return <DeleteProjectModal />;

    case modalActions.view_stakeholder:
      return <ViewStakeholderModal />;

    case modalActions.add_stakeholder:
      return <AddStakeholderModal />;

    default:
      return null;
  }
};

class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  stop = e => {
    e.stopPropagation();
  };

  close = e => this.props.dispatch(closeModal());

  render() {
    const { name } = this.props;

    if (name !== "") {
      switch (name) {
        case modals.view_task:
          return (
            <ViewTaskMotherWrapper>
              <div className="center-wrapper">
                <div className="center" onClick={this.close}>
                  <div
                    id="form-container"
                    className={"xs-12 sm-10 sm-off-1"}
                    onClick={this.stop}
                  >
                    <div className={"fix"}>
                      <SharedCloseButton id="close-button" onClick={this.close}>
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
                <div className="center" onClick={this.close}>
                  <div
                    id="form-container"
                    className={"xs-12 sm-10 sm-off-1"}
                    onClick={this.stop}
                  >
                    <div className={"fix"}>
                      <SharedCloseButton
                        id="close-button"
                        style={{
                          background: "#2283d0",
                          fontSize: "1.5em"
                        }}
                        onClick={this.close}
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

        case modals.add_project:
          return (
            <ModalWrapperStyler>
              <div className="center-wrapper">
                <div className="center" onClick={this.close}>
                  <div
                    id="form-container"
                    className={"xs-12 sm-8 sm-off-2"}
                    onClick={this.stop}
                  >
                    <div className="xs-11">
                      <h1 id="form-heading">{name}</h1>
                    </div>

                    <div className={"xs-1"}>
                      <SharedCloseButton id="close-button" onClick={this.close}>
                        x
                      </SharedCloseButton>
                    </div>
                    <ModalSelector name={name} />
                  </div>
                </div>
              </div>
            </ModalWrapperStyler>
          );

        case modals.delete_project:
          return (
            <ModalWrapperStyler>
              <div className="center-wrapper">
                <div className="center" onClick={this.close}>
                  <div
                    id="form-container"
                    className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"}
                    onClick={this.stop}
                  >
                    <div className={"xs-1"}>
                      <SharedCloseButton id="close-button" onClick={this.close}>
                        x
                      </SharedCloseButton>
                    </div>
                    <ModalSelector name={name} />
                  </div>
                </div>
              </div>
            </ModalWrapperStyler>
          );

        case modals.add_stakeholder:
          return (
            <ModalWrapperStyler>
              <div className="center-wrapper">
                <div className="center" onClick={this.close}>
                  <div
                    className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"}
                    onClick={this.stop}
                  >
                    <ModalSelector name={name} />
                  </div>
                </div>
              </div>
            </ModalWrapperStyler>
          );

        case modals.view_stakeholder:
          return (
            <ModalWrapperStyler>
              <div className="center-wrapper">
                <div className="center" onClick={this.close}>
                  <div
                    className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"}
                    onClick={this.stop}
                  >
                    <ModalSelector name={name} />
                  </div>
                </div>
              </div>
            </ModalWrapperStyler>
          );

        default:
          return (
            <ModalWrapperStyler>
              <div className="center-wrapper">
                <div className="center" onClick={this.close}>
                  <div
                    id="form-container"
                    className={"xs-12 sm-6 sm-off-3 md-4 md-off-4"}
                    onClick={this.stop}
                  >
                    <div className="xs-11">
                      <h1 id="form-heading">{name}</h1>
                    </div>

                    <div className={"xs-1"}>
                      <SharedCloseButton id="close-button" onClick={this.close}>
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
