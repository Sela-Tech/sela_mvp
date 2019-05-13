import React, {Fragment, Component} from "react";
import styled from "styled-components";
// import Transactions from "../../../../../dashboards/shared/mini-views/dashboard/sub-components/transactions";
import {connect} from 'react-redux';
import { get_public_transactions } from "../../../../../../store/action-creators/homepage";
import { SHOW_STAKEHOLDER_MODAL } from "../../../../../../store/actions/modal";
import { showModal } from "../../../../../../store/action-creators/modal";
import pilotData from "./pilot.data";
import { ShowDisclaimer } from "../../../../../../startupMode.config";
import TransactionTable from "../../../../../../shared-components/unique/transaction.table";

const TokenWrapper = styled.div`
    overflow: auto;

    .content{
        padding-bottom: 300px;
        height: 70vh;
        position: relative;
        overflow: auto;
    }
    .options{
        #send, #withdraw{
            height: 2.5em;
            line-height: 2.5em;
            padding: 0 1em;
            margin: 0.5em;
            color: white;
            font-size: 0.8em;
            border: 0;
            border-radius: 3px;
            float:left;
        }
        #send{
           background: #03a9f4;
        }
        #withdraw{
            background: #f2994a;
        }
    }
    .overview{

        label{
            font-size: 0.8em;
            color: #999;
        }
        h4{
            font-size: 0.9em;
            font-weight: 400;
            margin: 0.25em 0 1em;
        }
        .text{
            padding: 3% 3% 2%;
            background: white;
            border-radius: 3px;
            margin-bottom: 1em;
        }
    
    }
    
    .acc-no{
        font-size: 0.4em;
        color: skyblue;
    }

    .tokens .token-card .inner{
        min-height: auto !important;
    }
    .pad{
        .line, .pie{
            min-height: 20em !important;
            height: 50em;
            background: white;

        }
        margin: 1em 0;
        &.f-r{
            .inner{
                float: right;
            }
        }
        .inner{
            width: 98%;
            border-radius: 3px;
            padding: 1em;
        }
    }

    .headings h3{
        ont-size: 0.9em;
        font-weight: 500;
        padding: 0 1em;
        color: #3D4851;
        margin-bottom: 0em;
    }

    .headings label{
        display: block;
        font-size: 0.8em;
        margin: 0em 1em 1em;
        color: #999;
    }

    .content{
        padding-top: 1em !important;
    }
`;

const mapStateToPropsForTokenClass = state => {
    return {};
}

const mapDispatchToPropsForTokenClass = dispatch => {
    return {
        showSH: id => {
        if(Boolean(id))
            dispatch(showModal( SHOW_STAKEHOLDER_MODAL, { stakeholder: id }))
        }
    }
}

const Token = connect(mapStateToPropsForTokenClass, mapDispatchToPropsForTokenClass)(
    class extends Component {
    constructor(props){
        super(props);
        this.state = {
            info: props.info || {transactions: []},
            pathname: "overview"
        }
    }

    componentWillReceiveProps(nextProps){
      if(this.props !== nextProps){
        this.setState({
          info: nextProps.info
        })
      }
    }

    showSH = id => this.props.showSH(id)

    render(){
        const { info } = this.state;
       // store only receivers
        let receivers = new Set([]);
        let receiversSimplified = [];
        
        info.transactions.forEach(tran => {
           if(receivers.has(tran.receiver._id)  === false ){
                receiversSimplified.push({
                    id: tran.receiver._id, 
                    name: tran.receiver.firstName + " " + tran.receiver.lastName
                });
                receivers.add(tran.receiver._id)
           }
        });;

        receivers = [...receivers];
   
        let amountSpent = 0;

        if(info.transactions && info.transactions.length > 0){
          amountSpent = info.transactions.reduce((a = {}, b)=>{
            return { value: parseFloat(a.value) + parseFloat(b.value) }
          }).value;
        }

        return (
          <Fragment>
            <TokenWrapper className='xs-12'>
              <div className='overview xs-12'>
                { 
                ShowDisclaimer(this.props.id) && 
                    <div className='xs-12 disclaimer pad-white' style={{width: "100%"}}>
                        <h3 style={{color: "tomato"}} >Disclaimer</h3>
                        <p>This is a historical project backfilled with data from a previous version of the platform.</p>
                        <p>At the time of the project, we used tokens as a digital voucher for data received.</p><p> We had not yet adopted the convention that each project would have its token and that 1 token was equal to $1.</p>
                    </div>
                }
            
            {  ShowDisclaimer(this.props.id) === false && 
              <div className='text xs-12'>
                  <div className='xs-12 sm-8'>
                  
                      <div className='xs-4 keys t-l'>     
                          <label>Initial Balance</label>
                          <h4>
                          {window.moneyFormat(info.totalBudget,'')}
                          <br/><span style={{color: "skyblue", fontSize: "0.75em"}}> {window.moneyFormat(info.totalBudget,' ')} Dollars</span>
                          </h4>
                      </div>

                      <div className='xs-4 keys t-l'>     
                          <label>Total Spent</label>
                          <h4>
                          { window.moneyFormat(amountSpent,'') }<br/>
                          <span style={{color: "skyblue", fontSize: "0.75em"}}> {window.moneyFormat(amountSpent,' ')} Dollars </span>
                          </h4>
                      </div>

                      <div className='xs-4 keys t-l'>     
                          <label>Available Balance</label>
                          <h4>
                          {window.moneyFormat( info.totalBudget - amountSpent,'')}<br/>
                          <span style={{color: "skyblue", fontSize: "0.75em"}}> {window.moneyFormat( info.totalBudget - amountSpent,'')} Dollars</span>
                          </h4>
                      </div>

                  </div>                
              </div>
            }
       
          </div>

            <TransactionTable info = {info} />
            </TokenWrapper>
          </Fragment>
        )
    }
})

const TranWrapper = styled.div`
  padding-bottom: 2em;
`;

class TransactionsClass extends Component{
    constructor(props){
        super(props);
        if(props.id !== "5ca8a10d35b915002208c730"){
            props.dispatch(get_public_transactions(props.id))
        }
        this.state = {}
    }

    render(){

        let { info,id } = this.props;

        const data = id === "5ca8a10d35b915002208c730" ? {...pilotData} : info;

        let overwrite = false;
        if(id === "5ca8a10d35b915002208c730"){
            overwrite = true;
        }
        
        return (
        <TranWrapper className="xs-12">
            <div className="xs-10 xs-off-1">
            <Token info={data || { transactions: []}} overwrite={overwrite} id={this.props.id}/>
            </div>
        </TranWrapper>
        );
    }
    };

const mapStateToProps = state => {
  return {
    info: state.home.transactions
  }
}

export default connect(mapStateToProps)(TransactionsClass)

