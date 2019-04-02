import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
// import Navbar from "../../navbar";
import styled from 'styled-components';
import { fetch_projectAsset_transaction_history } from '../../../../../store/action-creators/wallet';
import TableWrapper from "../../styling/table";
// import {WalletWrapper} from "../index";
// import SharedViewWrapper from "../../styling/projects.view";
import moment from 'moment';
import { showModal } from '../../../../../store/action-creators/modal';
import { SHOW_STAKEHOLDER_MODAL } from '../../../../../store/actions/modal';
// import Link from 'react-router-dom/Link';

// import { ResponsivePie } from '@nivo/pie';

import { ResponsiveLine } from '@nivo/line';
import {Nav} from "../index";
import { NavLink, withRouter } from 'react-router-dom';
import { FETCH_PROJECT_ASSET_TRANSACTIONS_S, FETCH_PROJECT_ASSET_TRANSACTIONS_F } from '../../../../../store/actions/wallet';

// const pie = [
//     {
//       "id": "python",
//       "label": "python",
//       "value": 362,
//       "color": "hsl(335, 70%, 50%)"
//     },
//     {
//       "id": "go",
//       "label": "go",
//       "value": 369,
//       "color": "hsl(281, 70%, 50%)"
//     },
//     {
//       "id": "lisp",
//       "label": "lisp",
//       "value": 272,
//       "color": "hsl(90, 70%, 50%)"
//     }
//   ]

const TokenWrapper = styled.div`
    overflow: auto;
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
            height: 20em;
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

class Token extends Component {
    constructor(props){
        super(props);
        if(props.match.params.id){
            props.fetch_transactions(props.match.params.id);
        }
        this.state = {
            info: props.info || {transactions: []},
            pathname: "overview"
        }
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

    manualNavigator = e=>{
        e.preventDefault();
        this.setState({
            pathname: e.target.name
        })
    }

    render(){
        
        const { info,pathname } = this.state;
       // store only receivers
        let receivers = new Set([]);
        let receiversSimplified = [];
        
        info.transactions.forEach(tran => {
           if(receivers.has(tran.receiver._id)  === false ){
                receiversSimplified.push({
                    id: tran.receiver._id, name: tran.receiver.firstName + " " + tran.receiver.lastName
                });
                receivers.add(tran.receiver._id)
           }
        });;

        receivers = [...receivers];

        // use receivers to filter through transactions to get value and dates per receiver
        let amountVsDate = receivers.map(receiverId=>{
            return {
                id:   receiversSimplified.filter(r=> r.id === receiverId)[0].name,
                color: `hsl(
                    ${ Math.round( Math.random() * 255 ) },
                    ${ Math.round( Math.random() * 100 ) }%,
                    ${ Math.round( Math.random() * 100 ) }%)`,
                data: info.transactions.map(tran=>{
                    return  {
                        "x": moment(tran.createdAt).format("DD/MM/YY HH:mm"),
                        "y": tran.value
                    }
                })
            }
        })

        return (
            <Fragment>
     
                    <Nav className='xs-12'>
                        <div className="xs-12" id="header">
                        <div className="xs-12"> 
                        <nav className="xs-12">

                        <NavLink
                            className={`side-stack ${pathname === "overview" ? "active":""}`}
                            activeClassName="active"
                            name="overview"
                            onClick={this.manualNavigator}
                            exact to={'#'}>
                            Overview
                        </NavLink>

                        <NavLink
                            className={`side-stack ${pathname  === "transactions" ? "active":""}`}
                            activeClassName="active"
                            name="transactions"
                            onClick={this.manualNavigator}
                            exact to={'#'}>
                            Transactions
                        </NavLink>

                        </nav>
                    </div>
                    </div>
                    </Nav>

                    <TokenWrapper className='xs-12'>

                    {pathname === "overview" && 
                        <div className='overview xs-12'>
                        <div className='text xs-12'>
                            <div className='xs-12'>
                                <div className='xs-12 keys'>
                                    <label>Public Key</label>
                                    <h4><a target="_blank" href={`
                                        ${
                                            process.env.REACT_APP_STELLAR_MODE === "testnet" ? 
                                            `https://testnet.steexp.com/account/${info.distributorPublicKey}`:
                                            `https://steexp.com/account/${info.distributorPublicKey}`
                                        }`
                                    }>{info.distributorPublicKey}</a></h4>
                                </div>

                              
                            </div>

                            {
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
                                {/* <button id='withdraw'>Withdraw</button> */}
                                <button id='send'>Send</button>
                            </div>

                          
                        </div>
                        
                        <div className='xs-12'>
                        <div className='xs-12 pad'>
                            <div className='inner xs-12 line'>
                                <ResponsiveLine
                                    data={amountVsDate}
                                    margin={{
                                        "top": 50,
                                        "right": 150,
                                        "bottom": 50,
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
                                        "tickRotation": 0,
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
                        {/* <div className='xs-4 pad f-r'>
                            <div className='inner xs-12 pie'>
                                <ResponsivePie
                                    data={pie}
                                    margin={{
                                        "top": 40,
                                        "right": 80,
                                        "bottom": 80,
                                        "left": 80
                                    }}
                                    innerRadius={0.5}
                                    padAngle={0.7}
                                    cornerRadius={3}
                                    colors="nivo"
                                    colorBy="id"
                                    borderWidth={1}
                                    borderColor="inherit:darker(0.2)"
                                    radialLabelsSkipAngle={10}
                                    radialLabelsTextXOffset={6}
                                    radialLabelsTextColor="#333333"
                                    radialLabelsLinkOffset={0}
                                    radialLabelsLinkDiagonalLength={16}
                                    radialLabelsLinkHorizontalLength={24}
                                    radialLabelsLinkStrokeWidth={1}
                                    radialLabelsLinkColor="inherit"
                                    slicesLabelsSkipAngle={10}
                                    slicesLabelsTextColor="#333333"
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                    defs={[
                                        {
                                            "id": "dots",
                                            "type": "patternDots",
                                            "background": "inherit",
                                            "color": "rgba(255, 255, 255, 0.3)",
                                            "size": 4,
                                            "padding": 1,
                                            "stagger": true
                                        },
                                        {
                                            "id": "lines",
                                            "type": "patternLines",
                                            "background": "inherit",
                                            "color": "rgba(255, 255, 255, 0.3)",
                                            "rotation": -45,
                                            "lineWidth": 6,
                                            "spacing": 10
                                        }
                                    ]}
                                    fill={[
                                        {
                                            "match": {
                                                "id": "ruby"
                                            },
                                            "id": "dots"
                                        },
                                        {
                                            "match": {
                                                "id": "c"
                                            },
                                            "id": "dots"
                                        },
                                        {
                                            "match": {
                                                "id": "go"
                                            },
                                            "id": "dots"
                                        },
                                        {
                                            "match": {
                                                "id": "python"
                                            },
                                            "id": "dots"
                                        },
                                        {
                                            "match": {
                                                "id": "scala"
                                            },
                                            "id": "lines"
                                        },
                                        {
                                            "match": {
                                                "id": "lisp"
                                            },
                                            "id": "lines"
                                        },
                                        {
                                            "match": {
                                                "id": "elixir"
                                            },
                                            "id": "lines"
                                        },
                                        {
                                            "match": {
                                                "id": "javascript"
                                            },
                                            "id": "lines"
                                        }
                                    ]}
                                    legends={[
                                        {
                                            "anchor": "bottom",
                                            "direction": "row",
                                            "translateY": 56,
                                            "itemWidth": 100,
                                            "itemHeight": 18,
                                            "itemTextColor": "#999",
                                            "symbolSize": 18,
                                            "symbolShape": "circle",
                                            "effects": [
                                                {
                                                    "on": "hover",
                                                    "style": {
                                                        "itemTextColor": "#000"
                                                    }
                                                }
                                            ]
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                   */}
                    </div>
                    
                    </div>
                    }

                    { pathname === "transactions" && 
                        <TableWrapper className='xs-12'>
                        <div className='top xs-12'>
                            <div className='f-l'>
                                <h3>Transaction History</h3>
                                
                            </div>
                            
                            <div className='f-r t-options'>
                            {/* <label>Filter By</label> */}

                            <select className='form-control'>
                                <option value="no-filter">No Filter</option>
                                <option value="xlm">Lumens</option>
                                {info.transactions.length > 0 &&
                                    <option value="pst">{info.transactions[0].asset}</option>
                                }
                            </select>
                            
                            {/* <select className='form-control' placeholder="">
                                <option value="30 days">Last 30 days</option>
                            </select> */}

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
                                <h3>Prood</h3>
                                </div>
                            </div>
                        <div className='content xs-12'>
                            { 
                                info.transactions.map((transaction,i)=>{
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
                                        `} target="_blank">View On Explorer</a>
                                        </div>

                                    </div>
                                })
                            }
                        </div>
                    </TableWrapper>
                    }
               </TokenWrapper>
                    
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { projectAssetTransactions,type } =state.wallet;
    return {
        info: projectAssetTransactions,
        userId: state.auth.credentials.id,
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
          }
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Token));