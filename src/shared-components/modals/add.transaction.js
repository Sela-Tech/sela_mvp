import React from "react";
import { connect } from "react-redux";
import AsyncButton from "../unique/async-button";
import dA from "../../store/actions/project-funder/dashboard";
import { Form } from "./styles.modals/task";
import { addTransaction } from "../../store/action-creators/project-funder/transaction";

import { notify } from "../../store/action-creators/app";
import { closeModal } from "../../store/action-creators/project-funder/modal";

const mapStateToProps = state => {
  const { type, message } = state.transactions;
  return {
    add_tran_in_progress: type === dA.ADD_TRANSACTION_IN_PROGRESS,
    projectId: state.dashboard.projectId,
    message,
    type
  };
};

export default connect(mapStateToProps)(
  class AddPTransactionModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hash: "",
        networkName: "Ethereum"
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      const data = this.state;
      data.projectId = this.props.projectId;
      console.log(data, this.props.projectId);

      this.props.dispatch(addTransaction(data));
    };

    handleChange = e => {
      const { value, name } = e.target;
      this.setState({
        message: undefined,
        [name]: value
      });
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {

        if (nextProps.type === dA.ADD_TRANSACTION_SUCCESSFUL) {
          notify(<p style={{color: 'white'}}>Transaction Added Successfully</p>,"success")
          nextProps.dispatch(closeModal());
        }else if(nextProps.type === dA.ADD_TRANSACTION_FAILED){
          notify(<p style={{color: 'white'}}>Could Not Add Transaction.</p>,"error")
        }
      
        this.setState({
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    render() {
      let {  networkName, hash } = this.state;
      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <p>Only Ethereum is currently supported. </p>
          <div className="form-control">
            <label>Network Name</label>
            <input
              type="text"
              name="networkName"
              placeholder="Network Name"
              value={networkName}
              disabled
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label>Transaction Hash</label>
            <textarea
              type="text"
              name="hash"
              placeholder="Transaction Hash"
              value={hash}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-control xs-12">
            <AsyncButton
              attempt={this.props.add_tran_in_progress}
              type="submit"
              id="create-project-btn"
            >
              Confirm Transaction
            </AsyncButton>
          </div>
        
        </Form>
      );
    }
  }
);
