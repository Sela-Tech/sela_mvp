import React, {Component} from 'react';
import TableWrapper from "../../pages/dashboards/shared/styling/table";
import { isLiveNet } from "../../startupMode.config";
import moment from 'moment';

class TransactionTable extends Component{
  render(){
    const {info} = this.props;

    return <TableWrapper className='xs-12'>

    <div className='top xs-12'>

        <div className='f-l'>
            <h3>Transaction History</h3>
        </div>
        
        <div className='f-r t-options'>
            <a href={`https://${ isLiveNet(info.distributorPublicKey) === false ? 'testnet.': ''}steexp.com/account/${info.distributorPublicKey}`} target="_blank" rel ='noopener noreferrer' className='view-on-block'>View All On Explorer</a>
        </div>

    </div>

    <div className='headings xs-12'>

        <div className='xs-3'>
            <h3>From</h3>
            </div>
            <div className='xs-3'>
            <h3> To</h3>
            </div>
            <div className='xs-3'>
            <h3> Amount</h3>
            <label>{
                info.createdToken && info.createdToken.distributor 
                && info.createdToken.distributor.distributionAccountBalances.map((token,i)=>{
                    return token.type !== 'native' && token.token
                })}</label>
            </div>
            <div className='xs-3'>
            <h3>Proof</h3>
            </div>
        </div>

    <div className='content xs-12'>
        { 
            Boolean(info.transactions.length) ? 
            info.transactions.map(t=>{
                return t;
            }).map((transaction,i)=>{
                return <div className='row xs-12' key={i}>
                    
                    <div className='xs-3 col-row'> 
                        <button className='stakeholder' key={i} 
                        onClick={()=>this.showSH(transaction.sender._id)}>
                            <img src={transaction.sender.profilePhoto} alt=""/>
                            {`${transaction.sender.firstName} ${transaction.sender.lastName}`}
                        </button>
                    </div>

                    <div className='xs-3 col-row'> 
                        <button className='stakeholder' key={i} 
                        onClick={()=>this.showSH(transaction.receiver._id)}>
                            <img src={transaction.receiver.profilePhoto} alt=""/>
                            {`${transaction.receiver.firstName} ${transaction.receiver.lastName}`}
                        </button>
                    </div>

                    <div className='xs-3 col-row'> 
                        <p>{ window.moneyFormat( parseFloat(transaction.value),
                        ``)}</p>
                        <label style = {{fontSize: "0.8em", color:"#999"}}>{moment(transaction.createdAt).format("DD MMMM YYYY, HH:mm")}</label>

                    </div>

                    <div className='xs-3 col-row'>
                    <a href={`
                    ${process.env.REACT_APP_STELLAR_MODE === 'testnet' && this.props.overwrite === false ?
                    `https://testnet.steexp.com/tx/`:`https://steexp.com/tx/`}${transaction.hash}
                    `} target="_blank" rel="noopener noreferrer">View On Explorer</a>
                    </div>

                </div>
            })
            :
            <div className='row  xs-12'>
              <p style={{padding: "1em"}}>No Transactions Yet.</p>
            </div>
        }
    </div>

</TableWrapper>
;
  }
}

export default TransactionTable;