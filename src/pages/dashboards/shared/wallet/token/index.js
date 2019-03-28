import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import Navbar from "../../navbar";
import styled from 'styled-components';
import { fetch_projectAsset_transaction_history } from '../../../../../store/action-creators/wallet';
import TableWrapper from "../../styling/table";
// import {WalletWrapper} from "../index";
// import SharedViewWrapper from "../../styling/projects.view";
import moment from 'moment';
import { showModal } from '../../../../../store/action-creators/modal';
import { SHOW_STAKEHOLDER_MODAL } from '../../../../../store/actions/modal';
// import Link from 'react-router-dom/Link';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveLine } from '@nivo/line';
import {Nav} from "../index";
import { NavLink, withRouter } from 'react-router-dom';

const line = [
    {
      "id": "contractor 1",
      "color": "hsl(211, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 135
        },
        {
          "x": "helicopter",
          "y": 283
        },
        {
          "x": "boat",
          "y": 233
        },
        {
          "x": "train",
          "y": 145
        },
        {
          "x": "subway",
          "y": 293
        },
        {
          "x": "bus",
          "y": 237
        },
        {
          "x": "car",
          "y": 43
        },
        {
          "x": "moto",
          "y": 44
        },
        {
          "x": "bicycle",
          "y": 181
        },
        {
          "x": "others",
          "y": 181
        }
      ]
    },
    {
      "id": "evaluator 1",
      "color": "hsl(125, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 141
        },
        {
          "x": "helicopter",
          "y": 283
        },
        {
          "x": "boat",
          "y": 196
        },
        {
          "x": "train",
          "y": 175
        },
        {
          "x": "subway",
          "y": 18
        },
        {
          "x": "bus",
          "y": 215
        },
        {
          "x": "car",
          "y": 153
        },
        {
          "x": "moto",
          "y": 71
        },
        {
          "x": "bicycle",
          "y": 288
        },
        {
          "x": "others",
          "y": 113
        }
      ]
    },
 
  ];
const pie = [
    {
      "id": "python",
      "label": "python",
      "value": 362,
      "color": "hsl(335, 70%, 50%)"
    },
    {
      "id": "go",
      "label": "go",
      "value": 369,
      "color": "hsl(281, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 272,
      "color": "hsl(90, 70%, 50%)"
    }
  ]

const TokenWrapper = styled.div`
    padding: 3%;
    background: white;
    .acc-no{
        font-size: 0.4em;
        color: skyblue;
    }

    .tokens .token-card .inner{
        min-height: auto !important;
    }
    .pad{
        .line, .pie{
            height: 17em;
        }
        margin: 1em 0;
        &.f-r{
            .inner{
                float: right;
            }
        }
        .inner{
            width: 95%;
            border: 1px solid #F5F5F8;
            border-radius: 3px;
            padding: 1em;
        }
    }
`;

class Token extends Component {
    constructor(props){
        super(props);
        console.log(props.match);
        props.fetch_transactions(props.match.params.id);
        this.state = {
            perTransaction: [],pathname: "overview"
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            const {perTransaction,created,toDeduct, name} = nextProps;
            this.setState({
                perTransaction,created,toDeduct, name
            })
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
        const { perTransaction, pathname } = this.state;
        return (
            <Fragment>
                <Navbar/>
                    
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
                    <Fragment>
                        <div className='xs-12'>
                            <div className='xs-6 keys'>
                                <label>Public Key</label>
                                <h4>931203921321392adisdioasidnasdiasnd1320931n302</h4>
                            </div>

                            <div className='xs-6 options'>
                                <button>Withdraw</button>
                                <button>Send</button>
                            </div>
                        </div>

                        <div className='xs-12'>
                            <div className='xs-6'>
                                <label>Lumens Available</label>
                                <h4>10.00</h4>
                            </div>
                            <div className='xs-6'>
                                <label>Lumens Spent</label>
                                <h4>10.00</h4>
                            </div>
                        </div>

                        <div className='xs-12'>       
                            <div className='xs-4'>
                                <label>Total PST Cap</label>
                                <h4>10.00</h4>
                            </div>
                            <div className='xs-4'>
                                <label>PST Available</label>
                                <h4>10.00</h4>
                            </div>
                            <div className='xs-4'>
                                <label>PST Spent</label>
                                <h4>10.00</h4>
                            </div>
                        </div>

                        <div className='xs-12'>
                        <div className='xs-7 pad'>
                            <div className='inner xs-12 line'>
                                <ResponsiveLine
                                    data={line}
                                    margin={{
                                        "top": 50,
                                        "right": 110,
                                        "bottom": 50,
                                        "left": 60
                                    }}
                                    xScale={{
                                        "type": "point"
                                    }}
                                    yScale={{
                                        "type": "linear",
                                        "stacked": true,
                                        "min": "auto",
                                        "max": "auto"
                                    }}
                                    axisTop={null}
                                    axisRight={null}
                                    axisBottom={{
                                        "orient": "bottom",
                                        "tickSize": 5,
                                        "tickPadding": 5,
                                        "tickRotation": 0,
                                        "legend": "transportation",
                                        "legendOffset": 36,
                                        "legendPosition": "middle"
                                    }}
                                    axisLeft={{
                                        "orient": "left",
                                        "tickSize": 5,
                                        "tickPadding": 5,
                                        "tickRotation": 0,
                                        "legend": "count",
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
                        <div className='xs-5 pad f-r'>
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
                    </div>
                    </Fragment>
                    }

                    { pathname === "transactions" && 
                        <TableWrapper className='xs-12'>
                        <div className='top xs-12'>
                            <div className='f-l'>
                                <h3>Transaction History</h3>
                                
                            </div>
                            
                            <div className='f-r'>
                            <select className='form-control' placeholder="">
                                <option value="30 days">Last 30 days</option>
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
                            <h3>Transaction Date</h3>
                            </div>
                        
                        </div>
                        <div className='content xs-12'>
                        { 
                            perTransaction.map((transaction,i)=>{
                                return <div className='row xs-12' key={i}>
                                
                                <div className='xs-3 col-row'> 
                                <button className='stakeholder' key={i}
                                onClick={()=>this.showSH(transaction.from._id)}>{transaction.from.fullName} </button>
                                </div>


                                <div className='xs-3 col-row'> 
                                <button className='stakeholder' key={i}
                                onClick={()=>this.showSH(transaction.stakeholder._id)}>{transaction.stakeholder.fullName} </button>
                                </div>

                                <div className='xs-3 col-row'> 
                                <p style={{color: "red"}}>-{ window.moneyFormat( parseFloat(transaction.quote), "PST ")}</p>
                                </div>


                                <div className='xs-3 col-row'>
                                <p>{moment(transaction.date).format("DD MMMM YYYY")}</p>
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
    const { created,name, toDeduct, perTransaction } =state.wallet;
    return {
        created,name, toDeduct, perTransaction, 
        userId: state.auth.credentials.id,
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