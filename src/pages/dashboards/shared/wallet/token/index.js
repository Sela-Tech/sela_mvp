import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { fetch_projectAsset_transaction_history } from '../../../../../store/action-creators/wallet';
import { plain } from "../../styling/table";
import moment from 'moment';
import { showModal } from '../../../../../store/action-creators/modal';
import { SHOW_STAKEHOLDER_MODAL, SHOW_TOKEN_TRANSFER_MODAL } from '../../../../../store/actions/modal';

import { ResponsiveLine } from '@nivo/line';
import {Nav} from "../index";
import { NavLink } from 'react-router-dom';
import { FETCH_PROJECT_ASSET_TRANSACTIONS_S, FETCH_PROJECT_ASSET_TRANSACTIONS_F } from '../../../../../store/actions/wallet';
import { fetchProject } from '../../../../../store/action-creators/project';

const tokenPlain = `
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
            min-height: 40em !important;
            height: 45vh;
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


const TokenWrapper = styled.div`  
    ${tokenPlain}
    ${plain}
`;

class Token extends Component {
    constructor(props){
        super(props);
        if(props.match.params.id){
            props.fetch_transactions(props.match.params.id);
        }
        this.state = {
            info: props.info || {transactions: []},
            path: "overview"
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            const {info, type, match} = nextProps;

            if(match.params.id !== this.props.match.params.id){
                nextProps.fetch_transactions(match.params.id);
            }

            if(type === FETCH_PROJECT_ASSET_TRANSACTIONS_S){
                this.setState({
                    info
                })
            }else if (type === FETCH_PROJECT_ASSET_TRANSACTIONS_F){
                this.setState({
                    info:  {
                        transactions: [],
                        createdToken: {
                            distributor: {
                                distributionAccountBalances: []
                            }
                        }
                    }
                })
            }
        }
    }

    showSH = id => this.props.showSH(id)

    manualNavigator =(e, value)=>{
        e.preventDefault();
        this.setState({ path: value });
    }

    showTokenTransferModal = e => {
        if(this.props.match.params.id){
            let token = this.props.info.createdToken
            .distributor.distributionAccountBalances.filter(token => token.type !== "native")[0];

            let tokenModalSetupInfo = {
                projectId: this.props.match.params.id,
                pstCode: token.token,
                pstBalance: token.balance
            }

            this.props.showTokenTransferModal(tokenModalSetupInfo)
        }
    }

    render(){

        const {path,info} = this.state;

        // store only receivers
         let receivers = new Set([]);
         let receiversSimplified = [];
         
         info.transactions.forEach(tran => {
            if(receivers.has(tran.receiver._id)  === false ){
                 receiversSimplified.push({
                     id: tran.receiver._id,
                     name: tran.receiver.firstName + " " + tran.receiver.lastName
                 });
                 receivers.add(tran.receiver._id);
            }
         });
 
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
                 data: info.transactions.reverse().map(tran=>{
                     return  {
                         "x": moment(tran.createdAt).format("HH:mm:s DD MMMM YY")
                        ,"y": tran.value
                     }
                 })
             }
         });

        return (
            <div className='xs-12 i-h'>
                <Nav className='xs-12'>
                    <div className="xs-12" id="header">
                        <div className="xs-12"> 
                            <nav className="xs-12">
                                <NavLink
                                    className={`side-stack ${path === "overview" ? "active":""}`}
                                    activeClassName="active"
                                    name="overview"
                                    onClick={(e)=>this.manualNavigator(e,'overview')}
                                    exact to={'#'}>
                                    Overview
                                </NavLink>

                                <NavLink
                                    className={`side-stack ${path  === "transactions" ? "active":""}`}
                                    activeClassName="active"
                                    name="transactions"
                                    onClick={(e)=>this.manualNavigator(e,"transactions")}
                                    exact to={'#'}>
                                    Transactions
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                </Nav>
                
                <TokenWrapper className='xs-12'>
                    {
                        this.state.path === 'overview' && <div className='overview xs-12'>
                            <div className='text xs-12'>
                                    <div className='xs-12'>
                                    {
                                        info.projectName && 
                                        <div className='xs-12 keys'>     
                                            <label>Project Name</label>
                                            <h4>{info.projectName}</h4>
                                        </div>
                                    }
                    
                                        <div className='xs-12 keys'>
                                            <label>Public Key</label>
                                            <h4>
                                                <a target="_blank" rel="noopener noreferrer" href={`
                                                ${
                                                    this.props.publicKey ? this.props.publicKey : info && process.env.REACT_APP_STELLAR_MODE === "testnet" ? 
                                                    `https://testnet.steexp.com/account/${info.distributorPublicKey}`:
                                                    `https://steexp.com/account/${info.distributorPublicKey}`
                                                }`
                                            }>{info.distributorPublicKey}</a>
                                            </h4>
                                        </div> 

                                    </div>

                                    {
                                        info.createdToken && info.createdToken.distributor && 
                                        info.createdToken.distributor.distributionAccountBalances && 
                                        info.createdToken.distributor.distributionAccountBalances.map((token,i)=>{
                                            return <div className='xs-12' key={i}>
                                                { token.type !== 'native' && 
                                                    <Fragment>
                                                        <div className='xs-4'>
                                                            <label>PST Code</label>
                                                            <h4>{token.token} | {info.projectName}</h4>
                                                        </div>
                                                        <div className='xs-4'>
                                                            <label>PST Balance</label>
                                                            <h4>{token.balance ? token.balance: "-"}</h4>
                                                        </div>
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
                                    <div className='xs-12 options'>
                                        <button id='send' onClick={this.showTokenTransferModal}>Send</button>
                                    </div>
                                </div>
                                
                                {amountVsDate && amountVsDate.length > 0 && 
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
            
                    }

                    {/* { this.state.path  === "overview" && <div className='overview xs-12'>
                          
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
                        </div> 
                    } */}

                    { this.state.path === "transactions" &&  <div className='xs-12 transactions'>
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
                                info.transactions && info.transactions.length > 0 && info.transactions.map((transaction,i)=>{
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
                                        ${process.env.REACT_APP_STELLAR_MODE === 'testnet'?
                                        `https://testnet.steexp.com/tx/`:`https://steexp.com/tx/`}${transaction.hash}
                                        `} target="_blank" rel="noopener noreferrer">View On Explorer</a>
                                        </div>
            
                                    </div>
                                })
                            }
                        </div>
                            </div>
                    }

                </TokenWrapper>
                
            </div>
        )
    }
}

const mapStateToProps = state => {

    const { projectAssetTransactions,type } =state.wallet;
    const { id, publicKey } = state.auth.credentials;

    return {
        info: projectAssetTransactions,
        userId: id, publicKey,
        type,
        isContractor: state.auth.credentials.isContractor
    }

}

const mapDispatchToProps = dispatch => {
    return {
        fetch_transactions: (projectId) => dispatch(fetch_projectAsset_transaction_history(projectId)),
        showSH: id => {
            if(Boolean(id))
                dispatch(showModal( SHOW_STAKEHOLDER_MODAL, { stakeholder: id }))
        },
        showTokenTransferModal: tokenModalSetupInfo => {
            dispatch( fetchProject(tokenModalSetupInfo.projectId ))
            dispatch(showModal( SHOW_TOKEN_TRANSFER_MODAL, tokenModalSetupInfo ))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Token);