import React from "react";
import { connect } from "react-redux";
import { Form } from "./styles.modals/add.stakeholder";
import dashboard from "../../store/actions/dashboard";
import AsyncButton from "../unique/async-button";
import styled from 'styled-components';

const AddWrapper = styled.div`
background: rgba(0,0,0,0.5);
`;

const mapStateToProps = state => {
  return {
    projectId: state.modal.projectId,
    type: state.projects.stakeholder.action.type,
    message: state.projects.stakeholder.action.message,
    stakeholders: state.projects.single.info.stakeholders,
    selected: state.projects.stakeholders.selected,
    in_progress:
      state.projects.stakeholder.action.type ===
      dashboard.ADD_STAKEHOLDER_R
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
      let obj = { id: this.props.projectId, stakeholders: this.state.values };
      // this.props.dispatch(addStakeholder(obj));
    };

    render() {
      const { in_progress } = this.props;

      return (
        <AddWrapper className='xs-12'>
        
        </AddWrapper>
        // <Form onSubmit={this.handleSubmit} className="xs-12">
        //   <React.Fragment>
        //     <div className="form-control xs-12">
        //        <label>Add project stakeholders <em> funders, contractors etc. </em></label>
        //       {/* <ContractorLoader addStakeholders={this.obtainValues} /> */}
        //     </div>

        //     <div className="form-control xs-12">
        //       <AsyncButton
        //         attempt={in_progress}
        //         type="submit"
        //         id="create-project-btn"
        //         disabled={in_progress}
        //       >
        //         Add
        //       </AsyncButton>
        //     </div>

        //   </React.Fragment>
       
        // </Form>
     
     );
    }
  }
);
