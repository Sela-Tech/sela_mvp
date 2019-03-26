import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetch_my_wallet,clear_wallet } from '../../../../store/action-creators/wallet';
import Navbar from "../navbar";
import styled from 'styled-components';
import { fetchProjects } from '../../../../store/action-creators/project';
import SharedViewWrapper from "../styling/projects.view";
import Icon from 'react-fa';
import {Link} from 'react-router-dom';
import { FETCH_MY_WALLET_R } from '../../../../store/actions/wallet';

export const WalletWrapper = styled.div`
.tokens{
    .token-card{
        cursor: pointer;
        display: block;

        margin: 1em 0;
        .inner{
            min-height: 8em;
            max-height: 8em;
            cursor: pointer;
       
            transition: 120ms;
            &:hover{
                background: #0A2C56;
                h4,label{
                    color: white;
                }
                transform: scale(1.05);
            }
            width: 95%;
            background: white;
            color: #0A2C56;
            border-radius: 4px;
            border-radius: 1px solid #ddd;
            box-shadow: 0px 0px 1px 5px #f1f1f11f;
            padding: 1em;

            h4{
                margin: 0.25em 0;
                font-weight: 400;
                font-size: 14px;
                &.name{
                    height: 3em;
                    &.placeholder{
                    }
                }
            }
            .balance{
                color:#e78441 !important;
            }
            label{
                font-size :12px;
            }
        }
    }
}
`;

class Wallet extends Component{
    constructor(props){
        super(props);
        this.state = {
            projects: {},
            preloaders: false,
            createdTokens: [],
            receivedTokens: []
        }
    }

    componentWillUnmount(){
        this.props.clear_wallet();
    }

    componentWillMount(){
        this.props.fetchProjects("a");
    }

    componentWillReceiveProps(nextProps){
        if( this.props !== nextProps ){
            console.log(nextProps.fetch_projects_action)
                
            if(nextProps.projects !== this.props.projects && 
                Object.keys(nextProps.projects).length > 1 &&
                nextProps.fetch_projects_action === "GET_PROJS_S" ){
                nextProps.fetch_wallet( 
                    nextProps.projects, nextProps.userId, 
                    nextProps.isContractor === true  ? "contractor": undefined )
            }

            this.setState({
                preloaders: nextProps.type === FETCH_MY_WALLET_R,
                createdTokens: nextProps.createdTokens || [],
                receivedTokens: nextProps.receivedTokens || [],
            })
        }
    }

render(){

    const { createdTokens, receivedTokens, preloaders } = this.state;
    
    return <WalletWrapper className='xs-12'>
            <Navbar />
            <SharedViewWrapper className='xs-12'>
            
                <div className='xs-12'>
                    <label>Tokens Created</label>
                    <div className='tokens xs-12'>
                        {Boolean(createdTokens.length) &&
                        createdTokens.map((createdToken,i)=>{
                            return <Link className='token-card xs-3' 
                                key={i} to={`/dashboard/wallet/${createdToken.projectId}`}>
                                <div className='inner xs-12'>
                                    <h4 className='name'>{createdToken.name}</h4>
                                    <label>Created</label>
                                    <h4 className='balance'>{window.moneyFormat(createdToken.balance, "PST ")}</h4>
                                </div>
                            </Link>
                        })
                    }

                    { preloaders && [1].map(i=>{
                            return <div className='token-card xs-3' key={i}>
                                <div className='inner xs-12'>
                                    <h4 className='name placeholder'>
                                        <Icon name='spinner' spin/>
                                    </h4>
                                    <label>Created</label>
                                    <h4 className='balance placeholder' >
                                        <Icon name='spinner' spin/>
                                    </h4>
                                </div>
                                
                            </div>
                        })
                        }

                    {preloaders === false && Boolean(createdTokens.length)=== false && 
                        <div className='token-card xs-3'>
                            <div className='inner xs-12'>    
                                <label>None Found</label>   
                            </div>
                        </div>
                    }
                       
                    </div>
                </div>

                { this.props.isFunder === false &&
                <div className='xs-12'>
                    <label>Tokens Received</label>
                    <div className='tokens xs-12'>
                        {Boolean(receivedTokens.length)  && 
                        receivedTokens.map((receivedToken,i)=>{
                            return <Link className='token-card xs-3' 
                                key={i} to={`/dashboard/wallet/${receivedToken.projectId}?contractor=true`}>
                                <div className='inner xs-12'>
                                    <h4 className='name'>{receivedToken.name}</h4>
                                    <label style={{color: "teal"}}>Received</label>
                                    <h4 className='balance'>{window.moneyFormat(receivedToken.balance, "PST ")}</h4>
                                </div>
                            </Link>
                        })
                    }

                    { preloaders && [1].map(i => {
                            return <div className='token-card xs-3' key={i}>
                                <div className='inner xs-12'>
                                    <h4 className='name placeholder'>
                                        <Icon name='spinner' spin/>
                                    </h4>
                                    <label>Received</label>
                                    <h4 className='balance placeholder' >
                                        <Icon name='spinner' spin/>
                                    </h4>
                                </div>
                                
                            </div>
                        })
                    }

                    {preloaders === false && Boolean(receivedTokens.length)=== false && 
                        <div className='token-card xs-3'>
                            <div className='inner xs-12'>    
                                <label>None Found</label>   
                            </div>
                        </div>
                    }
                       
                    </div>
               
                </div>
                }
            
            </SharedViewWrapper>
    </WalletWrapper>
}
}

export const mapStateToProps = state=>{
    return {
        isFunder: state.auth.credentials.isFunder,
        isContractor: state.auth.credentials.isContractor,
        createdTokens: state.wallet.createdTokens,
        receivedTokens: state.wallet.receivedTokens,
        userId: state.auth.credentials.id,
        projects: state.projects.all.collection,
        fetch_projects_action: state.projects.all.action.type,
        type: state.wallet.type
    }
}

export const mapDispatchToProps = dispatch =>{
    return {
        fetch_wallet: (data, userId,type) => dispatch(fetch_my_wallet(data, userId,type)),
        fetchProjects: (cat)=>dispatch(fetchProjects(cat)),
        clear_wallet: ()=> dispatch(clear_wallet())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);