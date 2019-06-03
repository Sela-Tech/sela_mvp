import React from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import UserLoader from "../unique/user-loader";
import { transfer_pst } from "../../store/action-creators/wallet";
import Icon from "react-fa/lib/Icon";
import { TRANSFER_ASSET_F } from "../../store/actions/wallet";

const TransferW = styled.div`
.grayed{
    background: #F5F5F8;
    p{
        padding: 0 6%;
    }
}
.white{
    background: white;
    padding: 1em 0;
}
.form-group{
    display: block;
    margin: 0.85em 0;

    label{
        display: block;
        font-size: 0.8em;
    }
    #f, label, .em-desc{
        text-align: left !important;
    }
    input, select,textarea{
        background: white;
        border: 1px solid #eee;
        border-radius: 4px;
        height: 3em;
        width: 100%;
        font-size: 1em;
        padding: 1em;
    }
    textarea {
        height: 10em;
        padding: 1em;
        font-size: 1em;
    }
}

#save{
    background: #F2994A;
    border-radius: 5px;
    padding: 1em 2.5em;
    border: 0;
    color: white;
    font-weight: 300;
    font-size: 13.5px;
    margin: auto;
    margin-bottom: 20px;
    display: inline-block;
    width: auto;
}

`;

const mapStateToProps = state => {
  return {
      projectId: state.modal.projectId,
      pstCode: state.modal.pstCode,
      pstBalance: parseFloat(state.modal.pstBalance),
      type: state.modal.type
  }
};


export default connect(mapStateToProps)(
  class TransferToken extends React.Component {
      constructor(props){
        super(props);
            this.state = {
                stakeholders: props.stakeholders,
                pstBalance: props.pstBalance,
                amount: 0
            };
    }

    componentWillMount() {
      this.setState({
      });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
            disabled: nextProps.type === TRANSFER_ASSET_F ? false: true,
            stakeholders: nextProps.stakeholders,
            pstBalance: nextProps.pstBalance
        });
      }
    }

    handleSubmit = e => {
        e.preventDefault();
        let obj = {
            receiver: this.state.stakeholders.length > 1
            ? this.state.stakeholders: this.state.stakeholders[0],
            pstCode: this.props.pstCode,
            projectId: this.props.projectId,
            amount: this.state.amount,
            remarks: Boolean(this.state.remarks) ? this.state.remarks : `Transferring ${this.state.amount}`
        }
        this.setState({disabled: true })
        this.props.dispatch( transfer_pst(obj) )
    }

    addStakeholders = values => {
        this.setState({
            stakeholders: values
        })
    }    

    handleChange = e => {
        e.persist();
        let obj = {};
  
        if( e.target.name === 'amount' && this.props.pstBalance >= e.target.value  ){
          obj.amount =e.target.value < 0 ? 1 : e.target.value;
          obj.pstBalance = this.props.pstBalance - e.target.value;
        }else if( e.target.name === 'amount' && this.state.pstBalance){
            obj.amount = e.target.value >= this.props.pstBalance ? this.props.pstBalance : e.target.value; 
            obj.pstBalance = 0; 
        }
  
        if(e.target.name !== "amount"){
            obj[e.target.name] = e.target.value
        }
        
          this.setState(obj)
      }

    render() {

      const { stakeholders } = this.state;

      return (
        <TransferW className="xs-12">
            <div className="xs-12 t-c grayed">
                <h3>Token Transfer</h3>
                <p>Tokens can only be transferred to other <strong>stakeholders</strong> of the platform</p>
            </div>
            <div className='white xs-10 xs-off-1'>
                <form onSubmit = { this.handleSubmit }>

                    <div className='form-group xs-12 t-l'>
                        <UserLoader single={true} stakeholders={stakeholders} addStakeholders= {this.addStakeholders} hideText={true}/>
                    </div>

                    <div className='form-group xs-12'>
                        <div className='xs-6'>
                            <div className='xs-12'>

                            <label htmlFor="amount">PST Budget </label>
                            <p name='implementationBudget' style={{
                            width: '97.5%',
                            height: '3em',
                            borderRadius: '4px',
                            margin: 0,
                            border: '1px solid #eee',
                            lineHeight: '3em'
                          }}>{ window.moneyFormat(this.state.pstBalance, "")} </p>
                            {/* <input name = 'amount' placeholder = ' 1 Project Token Equals 1 Dollar' onChange={this.handleChange} className='form-control'/> */}
                            </div>
                        </div>
                        <div className='xs-6'>
                            <div className='xs-12'>
                                <label htmlFor="amount">PST amount </label>
                                <input name = 'amount' placeholder = 'e.g. 450' onChange={this.handleChange} value={this.state.amount} className='form-control'/>
                            </div>
                        </div>
                        
                    </div>

                    <div className='form-group xs-12'>
                        <label htmlFor="remarks">Remarks (optional)</label>
                        <textarea name = 'remarks' 
                        placeholder = 'Why are you sending the token to this user ? '  onChange={this.handleChange} className='form-control'/>
                    </div>

                    <div className='form-group xs-12'>

                        <button id='save' type='submit' value='Initiate Transfer' disabled={this.state.disabled}>
                            {this.state.disabled ? <Icon name='spinner' spin/>: "Initiate Transfer"}
                        </button>
                    </div>

                </form>
            </div>
        </TransferW>
      );
    }
  }
);
