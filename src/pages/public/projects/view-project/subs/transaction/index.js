import React, {Fragment, Component} from "react";
import styled from "styled-components";
// import Transactions from "../../../../../dashboards/shared/mini-views/dashboard/sub-components/transactions";
import {connect} from 'react-redux';
import { get_public_transactions } from "../../../../../../store/action-creators/homepage";
import TableWrapper from "../../../../../dashboards/shared/styling/table";
import moment from 'moment';
import { ResponsiveLine } from '@nivo/line';
import { SHOW_STAKEHOLDER_MODAL } from "../../../../../../store/actions/modal";
import { showModal } from "../../../../../../store/action-creators/modal";
import pilotData from "./pilot.data";

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
        }
    
    }

   
    padding: 3%;
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
`;


const Token = connect(()=>{return {}}, dispatch=>{
  return {
    showSH: id => {
    if(Boolean(id))
        dispatch(showModal( SHOW_STAKEHOLDER_MODAL, { stakeholder: id }))
    }
  }})(class extends Component {
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
        console.log(info)
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

        // use receivers to filter through transactions to get value and dates per receiver
        let amountVsDate = [];

        amountVsDate = receivers.map(receiverId=>{
            return {
                id:   receiversSimplified.filter(r=> r.id === receiverId)[0].name,
                color: `hsl(
                    ${ Math.round( Math.random() * 255 ) },
                    ${ Math.round( Math.random() * 100 ) }%,
                    ${ Math.round( Math.random() * 100 ) }%)`,
                data:  info.transactions.reverse().map(tran=>{
                    return  {
                        "x": moment(tran.createdAt).format("HH:mm DD MMMM YY")
                       ,"y": this.props.overwrite ? tran.value / 171: tran.value
                    }
                })
            }
        });
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
              <div className='text xs-12'>
                  <div className='xs-12'>
                  
                      <div className='xs-4 keys'>     
                          <label>Initial Balance</label>
                          <h4>
                          {window.moneyFormat(info.totalBudget,'')}
                          <br/><span style={{color: "skyblue", fontSize: "0.75em"}}> {window.moneyFormat(info.totalBudget,' ')} Dollars</span>
                          </h4>
                      </div>

                      <div className='xs-4 keys'>     
                          <label>Total Spent</label>
                          <h4>
                          { window.moneyFormat(amountSpent,'') }<br/>
                          <span style={{color: "skyblue", fontSize: "0.75em"}}> {window.moneyFormat(amountSpent,' ')} Dollars </span>
                          </h4>
                      </div>

                      <div className='xs-4 keys'>     
                          <label>Available Balance</label>
                          <h4>
                          {window.moneyFormat( info.totalBudget - amountSpent,'')}<br/>
                          <span style={{color: "skyblue", fontSize: "0.75em"}}> {window.moneyFormat( info.totalBudget - amountSpent,'')} Dollars</span>
                          </h4>


                      </div>

                    
                      <div className='xs-12 keys'>
                          <label>Public Key</label>
                          <h4><a target="_blank" rel="noopener noreferrer" href={`
                              ${
                                this.props.publicKey ? this.props.publicKey : info 
                                && process.env.REACT_APP_STELLAR_MODE === "testnet" 
                                && this.props.overwrite !== true ? 
                                  `https://testnet.steexp.com/account/${info.distributorPublicKey}`:
                                  `https://steexp.com/account/${info.distributorPublicKey}`
                              }`
                          }>{info.distributorPublicKey ? info.distributorPublicKey:  "-"}</a></h4>
                      </div>                              
                  </div>

                  {
                      info.createdToken && info.createdToken.distributor 
                      && info.createdToken.distributor.distributionAccountBalances.map((token,i)=>{
                          return <div className='xs-12' key={i}>
                              { token.type !== 'native' && 
                                  <Fragment>
                                      <div className='xs-4'>
                                          <label>PST Code</label>
                                          <h4>{token.token} | {info.projectName}</h4>
                                      </div>
                                      {/* <div className='xs-4'>
                                          <label>PST Balance</label>
                                          <h4>{token.balance ? token.balance: "-"}</h4>
                                      </div> */}
                                  </Fragment>
                              }

                              { token.type === 'native' &&
                                  <div className='xs-4'>
                                      <label>Lumens Available</label>
                                      <h4>{token.balance}</h4>
                                  </div>
                              }
                      </div>
                      })
                  }
                
              </div>
              {
                amountVsDate.length > 0 &&
                <div className='xs-12'>
                    <div className='xs-12 pad'>
                        <div className='inner xs-12 line'>
                            <ResponsiveLine
                                data={amountVsDate}
                                margin={{
                                    "top": 50,
                                    "right": 150,
                                    "bottom": 250,
                                    "left": 60
                                }}
                                xScale={{
                                    "type": "point",
                                    min: "0"
                                }}
                                yScale={{
                                    "type": "linear",
                                    "stacked": true,
                                    "min": "0",
                                    "max": "auto"
                                }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    "orient": "bottom",
                                    "tickSize": 5,
                                    "tickPadding": 5,
                                    "tickRotation": -60,
                                    "legend": "Date",
                                    "legendOffset": 36,
                                    "legendPosition": "middle"
                                }}
                                axisLeft={{
                                    "orient": "left",
                                    "tickSize": 5,
                                    "tickPadding": 5,
                                    "tickRotation": 0,
                                    "legend": "Token",
                                    "legendOffset": -40,
                                    "legendPosition": "middle"
                                }}
                                dotSize={10}
                                dotColor="inherit:darker(0.3)"
                                dotBorderWidth={2}
                                dotBorderColor="#ffffff"
                                enableDotLabel={true}
                                dotLabel="y"
                                dotLabelYOffset={-12}
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                legends={[
                                    {
                                        "anchor": "bottom-right",
                                        "direction": "column",
                                        "justify": false,
                                        "translateX": 100,
                                        "translateY": 0,
                                        "itemsSpacing": 0,
                                        "itemDirection": "left-to-right",
                                        "itemWidth": 80,
                                        "itemHeight": 20,
                                        "itemOpacity": 0.75,
                                        "symbolSize": 12,
                                        "symbolShape": "circle",
                                        "symbolBorderColor": "rgba(0, 0, 0, .5)",
                                        "effects": [
                                            {
                                                "on": "hover",
                                                "style": {
                                                    "itemBackground": "rgba(0, 0, 0, .03)",
                                                    "itemOpacity": 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </div>
              }
          
          </div>
              <TableWrapper className='xs-12'>

                    <div className='top xs-12'>
                        <div className='f-l'>
                            <h3>Transaction History</h3>
                            
                        </div>
                        
                        <div className='f-r t-options'>
                            <select className='form-control'>
                                <option value="no-filter">No Filter</option>
                                <option value="xlm">Lumens</option>
                                {info.transactions.length > 0 &&
                                    <option value="pst">{info.transactions[0].asset}</option>
                                }
                            </select>
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
                            </div>
                            <div className='xs-3'>
                            <h3>Proof</h3>
                            </div>
                        </div>
                    <div className='content xs-12'>
                        { 
                            info.transactions.map(t=>{
                                if(this.props.overwrite === true){
                                    const temp = {...t};
                                    temp.value = temp.value / 171;
                                    return temp;
                                }
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
                                        `${transaction.asset } `)}</p>
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
                        }
                    </div>
                </TableWrapper>
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
          <Token info={data || { transactions: []}} overwrite={overwrite}/>
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

