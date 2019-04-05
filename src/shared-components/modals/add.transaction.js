import React from "react";
import { connect } from "react-redux";
import dA from "../../store/actions/dashboard";
import { addTransaction } from "../../store/action-creators/project-funder/transaction";
import FormWrapper from "./styles.modals/new.standard";

const mapStateToProps = state => {
  const { type, message } = state.transactions;
  return {
    add_tran_in_progress: type === dA.ADD_TRANSACTION_R,
    projectId: state.modal.projectId,
    message,
    type
  };
};

export default connect(mapStateToProps)(
  class AddPTransactionModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      const data = this.state;
      data.projectId = this.props.projectId;
      this.props.dispatch(addTransaction(data));
    };

    handleChange = e => {
      const { value, name } = e.target;
      this.setState({
        [name]: value
      });
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
      // let { } = this.state;
      return (
        <FormWrapper className='xs-12'>
        <div className="xs-12 t-c grayed">
          <h3>Add New Transaction</h3>
        </div>

        <div className='xs-12 white'>
          <div className='xs-10 xs-off-1'>
            <form onSubmit={this.handleSubmit} className='xs-12'>
              
              <div className='form-group'>
                <label>Amount in USD</label>
                <input type='number' name='amount' placeholder='Amount' onChange={this.handleChange}/>
              </div>

              <div className='form-group'>
                <label>Specify Type Of Transaction</label>
                <select name='type' placeholder='Type Of Transaction' onChange={this.handleChange}>
                <option hidden>Click here to select</option>

                  <option value="Fiat">Fiat</option>
                  <option value="Ethereum">Ethereum</option>
                  <option value="Bitcoin">Bitcoin</option>
                </select>
              </div>

              <div className='form-group'>
                <label>Specify Proof Type</label>
                <select name='proof' onChange={this.handleChange}>
                  <option hidden>Click here to select</option>
                  <option value="link">Link</option>
                  <option value="upload">File Upload</option>
                </select>
              </div>


              {
                this.state.proof && <div className='form-group'>
                  {this.state.proof === 'link' 
                  ?
                  <React.Fragment>
                    <label>The link to the proof of this transaction</label>
                    <input type='text' name='link' placeholder='e.g. https://s3.amazon.com/3123901ad' onChange={this.handleChange}/>
                  </React.Fragment>
                  :
                  <React.Fragment>
                  <label>Upload a file as proof of your transaction</label>
                   <input type='file' name='file' id='transaction-proof' onChange={this.handleChange}/>
                  </React.Fragment>

                  }
                </div>
              }
            
              <div className='xs-12'>
                <button id='save' type='submit'> Add Transaction </button>
              </div>

            </form>
          </div>
        </div>
        </FormWrapper>
     );
    }
  }
);
