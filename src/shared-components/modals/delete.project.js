import React from "react";
import { connect } from "react-redux";
import {
  deleteProject,
  fetchProjects
} from "../../store/action-creators/project";
import { closeModal } from "../../store/action-creators/modal";
import AsyncButton from "../unique/async-button";
import dA from "../../store/actions/project-funder/dashboard";
import { Form } from "./styles.modals/delete";

const mapStateToProps = state => {
  const { type, message } = state.projects.delete.action;
  const { id, activated } = state.dashboard;

  return {
    delete_project_in_progress: type === dA.DELETE_PROJ_R,
    message,
    type,
    id,
    activated
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
      let type = this.props.activated === undefined ? "delete" : "toggle";
      this.props.dispatch(deleteProject(this.props.id, type));
    };

    close = () => {
      this.props.dispatch(closeModal());
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        // pull fresh projects after adding

         if (nextProps.type === dA.DELETE_PROJ_S) {
           nextProps.dispatch(fetchProjects());
         }
     
        this.setState({
          type: nextProps.type,
          message: nextProps.message,
          activated: nextProps.activated
        });
      }
    }

    render() {
      const { type } = this.state;
      const { activated } = this.props;

      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          {type !== dA.DELETE_PROJ_S && (
            <React.Fragment>
              <p id="info">
                {activated !== undefined
                  ? `Are you sure you want to 
                  ${
                    activated === true ? "De-Activate" : "Activate"
                  } this project`
                  : "Are you sure you want to Delete this project ?"}
              </p>

              <div className="form-control xs-12">
                <div className="xs-6">
                  <AsyncButton
                    attempt={this.props.delete_project_in_progress}
                    type="submit"
                    id="create-project-btn"
                  >
                    {activated !== undefined
                      ? activated === true
                        ? "De-Activate"
                        : "Activate"
                      : "Delete Project "}
                  </AsyncButton>
                </div>

                <div className="xs-6">
                  <button onClick={this.close} id="delete-btn">
                    No
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
        
        </Form>
      );
    }
  }
);
