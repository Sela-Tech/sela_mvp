import React from "react";
import { connect } from "react-redux";
import { deleteProject } from "../../store/action-creators/project-funder/project";
import { closeModal } from "../../store/action-creators/project-funder/modal";
import AsyncButton from "../unique/async-button";
import dA from "../../store/actions/project-funder/dashboard";
import MessageToShow from "../errors/messageToShow";
import { Form } from "../../styles/dashboards/project-funder/modals/delete";

const mapStateToProps = state => {
  const { type, message } = state.projects.delete.action;
  return {
    delete_project_in_progress: type === dA.DELETE_PROJECT_IN_PROGRESS,
    message,
    type
  };
};

export default connect(mapStateToProps)(
  class AddPTaskModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.dispatch(deleteProject(this.state.projectID));
    };

    close = () => {
      this.props.dispatch(closeModal());
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    render() {
      const { type, message } = this.state;
      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <p id="info">Are you sure you want to delete this project ?</p>

          <div className="form-control xs-12">
            <div className="xs-6">
              <AsyncButton
                attempt={this.props.delete_project_in_progress}
                type="submit"
                id="create-project-btn"
              >
                Delete Project
              </AsyncButton>
            </div>

            <div className="xs-6">
              <button onClick={this.close} id="delete-btn">
                No
              </button>
            </div>
          </div>

          <MessageToShow
            type={type}
            message={message}
            match={dA.ADD_TASK_SUCCESSFUL}
          />
        </Form>
      );
    }
  }
);
