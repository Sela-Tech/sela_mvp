import React from "react";
import { connect } from "react-redux";
import ContractorLoader from "./sub-components/contractor-loader";
import { Form } from "./styles.modals/add.stakeholder";
import dA from "../../store/actions/project-funder/dashboard";
import { addStakeholder } from "../../store/action-creators/project-funder/stakeholder";
import dashboard from "../../store/actions/project-funder/dashboard";
import AsyncButton from "../unique/async-button";

import { notify } from "../../store/action-creators/app";
import { closeModal } from "../../store/action-creators/project-funder/modal";

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


        if (nextProps.type === dA.ADD_STAKEHOLDER_SUCCESSFUL) {
          notify(<p style={{color: 'white'}}>Stakeholder(s) Added Successfully</p>,"success")
          nextProps.dispatch(closeModal());
        }else if(nextProps.type === dA.ADD_STAKEHOLDER_FAILED){
          notify(<p style={{color: 'white'}}>
          Could Not Add Stakeholder(s).
          <span style={{fontSize:"12px", display:"block", color:"#fdfdfd"}}> {nextProps.message} </span>
          </p>,"error")
        }

        this.setState({
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    handleSubmit = e => {
      e.preventDefault();
      // let selected = this.props.selected;
      // let stakeholders = [];

      // if (selected && selected.length > 0) {
      //   stakeholders = selected.map(s => {
      //     return { user: { information: s } };
      //   });
      // }

      let obj = { id: this.props.projectId, stakeholders: this.state.values };

      this.props.dispatch(addStakeholder(obj));
    };

    render() {
      const { in_progress } = this.props;

      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <React.Fragment>
            <div className="form-control xs-12">
              <ContractorLoader addStakeholders={this.obtainValues} />
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
       
        </Form>
      );
    }
  }
);
