import React from "react";
import { connect } from "react-redux";
import ContractorLoader from "./sub-components/contractor-loader";
import { Form } from "./styles.modals/add.stakeholder";
import MessageToShow from "../errors/messageToShow";
import dA from "../../store/actions/project-funder/dashboard";
import { addStakeholder } from "../../store/action-creators/project-funder/project";
import dashboard from "../../store/actions/project-funder/dashboard";
import AsyncButton from "../unique/async-button";

const mapStateToProps = state => {
  return {
    projectId: state.dashboard.projectId,
    type: state.projects.stakeholder.action.type,
    message: state.projects.stakeholder.action.message,
    stakeholders: state.projects.single.info.stakeholders,
    selected: state.projects.funders.selected,
    in_progress:
      state.projects.stakeholder.action.type ===
      dashboard.ADD_STAKEHOLDER_IN_PROGRESS
  };
};

export default connect(mapStateToProps)(
  class AddStakeholderModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        type: "",
        message: ""
      };
    }

    obtainValues = values => {
      this.setState({ values });
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    handleSubmit = e => {
      e.preventDefault();
      let selected = this.props.selected;
      let stakeholders = [];

      if (selected && selected.length > 0) {
        stakeholders = selected.map(s => {
          return { user: { information: s } };
        });
      }

      let obj = { id: this.props.projectId, stakeholders };

      this.props.dispatch(addStakeholder(obj));
    };

    render() {
      const { in_progress } = this.props;
      const { type, message } = this.state;

      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <React.Fragment>
            <div className="form-control xs-12">
              <ContractorLoader obtainValues={this.obtainValues} />
            </div>

            <div className="form-control xs-12">
              <AsyncButton
                attempt={in_progress}
                type="submit"
                id="create-project-btn"
                disabled={in_progress}
              >
                Add
              </AsyncButton>
            </div>
          </React.Fragment>

          <MessageToShow
            type={type}
            message={message}
            match={dA.ADD_STAKEHOLDER_SUCCESSFUL}
          />
        </Form>
      );
    }
  }
);
