import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from "../../navbar";
import styled from 'styled-components';
import { fetch_my_transactions } from '../../../../../store/action-creators/wallet';
import TableWrapper from "../../styling/table";
import {WalletWrapper} from "../index";
import SharedViewWrapper from "../../styling/projects.view";
import moment from 'moment';
import { showModal } from '../../../../../store/action-creators/modal';
import { SHOW_STAKEHOLDER_MODAL } from '../../../../../store/actions/modal';

const TokenWrapper = styled.div`
.acc-no{
    font-size: 0.4em;
    color: skyblue;
}

 .tokens .token-card .inner{
     min-height: auto !important;
 }
`;

class Token extends Component {
    constructor(props){
        super(props);
        let _as;
        if(props.isContractor && window.location.href.indexOf("contractor=true") !== -1 ){
            _as = "contractor";
        };
        props.fetch_my_transactions(props.match.params.projectId, props.userId, _as);
        this.state = {
            perTransaction: [],created: '',toDeduct: "", name: ""
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

    render(){
        const { perTransaction,created,toDeduct, name} = this.state;
        return (
        <TokenWrapper className='xs-12'>
            <Navbar/>
            <WalletWrapper className='xs-12'>
                <SharedViewWrapper className='xs-12'>
                    <div className='xs-12'>
                        <label>Token Details - <strong>{name}</strong> </label>
                        <div className='tokens xs-12'>

                        <div className='token-card xs-12'>
                                <div className='inner xs-12'>
                                    {/* <h4 className='name'>{name}</h4> */}
                                    <div className='xs-4'>
                                        <label>Initial Lumens Balance</label>
                                        <h4 className='balance'>{parseFloat(1000)}</h4>
                                    </div>
                                    <div className='xs-4'>
                                        <label>Lumens Spent</label>
                                        <h4 className='balance'>{parseFloat(0.00001 * perTransaction.length)}</h4>
                                    </div>
                                    <div className='xs-4'>
                                        <label>Avaliable Lumens</label>
                                        <h4 className='balance'>{parseFloat(1000) - parseFloat(0.00001 * perTransaction.length)}</h4>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className='token-card xs-12'  >
                                <div className='inner xs-12'>
                                    {/* <h4 className='name'>{name}</h4> */}
                                    <div className='xs-4'>
                                        <label>Created</label>
                                        <h4 className='balance'>{window.moneyFormat(parseFloat(created), "PST ")}</h4>
                                    </div>
                                    <div className='xs-4'>
                                        <label>Dispersed</label>
                                        <h4 className='balance'>{window.moneyFormat(parseFloat(toDeduct), "PST ")}</h4>
                                    </div>
                                    <div className='xs-4'>
                                        <label>Avaliable</label>
                                        <h4 className='balance'>{window.moneyFormat( (parseFloat(created) - parseFloat(toDeduct || 0)), "PST ")}</h4>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                    {/* <div className='xs-10 xs-off-1 t-r'>
                        <button className='f-r visualize'>Visualize</button>
                    </div> */}

                    </div>
                </SharedViewWrapper>
                <TableWrapper className='xs-12'>
                    <div className='xs-12'>
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
                            })}


                        </div>
                    </div>
                </TableWrapper>
            </WalletWrapper>
        </TokenWrapper>
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
        fetch_my_transactions: (projectId,userId, _as) => dispatch(fetch_my_transactions(projectId, userId, _as)),
        showSH: id => {
            if(Boolean(id))
                dispatch(showModal( SHOW_STAKEHOLDER_MODAL, { stakeholder: id }))
          }
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Token);