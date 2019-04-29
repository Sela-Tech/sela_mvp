import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetch_my_wallet,
    // clear_wallet
 } from '../../../../store/action-creators/wallet';
import Navbar from "../navbar";
import styled from 'styled-components';

import SharedViewWrapper from "../styling/projects.view";
import Icon from 'react-fa';

import {Link,withRouter, NavLink} from 'react-router-dom';
import { FETCH_MY_WALLET_R } from '../../../../store/actions/wallet';
import { Fragment } from 'react';
import Token from "./token";
import Joyride from 'react-joyride';

const blue = "#156edc";
export const  colors = ["#F7AF7B", "#F77B8A", "#7B96F7", "#a8b0b9","#e04f96","#4fe0c2","#e04f4f","#e04fc4","#834fe0"];


export const Nav  = styled.div`
#header {
  
    border-bottom: 1px solid #eee;
    background: #fdfdfd;

    #can-see-status{
      display:inline-block;
      background: white;
      color: skyblue;
    }
    
    nav {
     padding: 0.25em;
     display: block;
      a {

        display: inline-block;
        font-family: Acumin Pro;
        line-height: 20px;
        font-size: 0.95em;
        font-weight: 300;
        text-align: center;
        color: #828282;
        text-align: center;
        padding: 10px 0;

        &:hover{
         color:${blue};
        }

        &.active{
          background:#201D41;
          color: white;
          border-radius: 4px;
        }
      }
    }
    
    h1 {
      font-family: Acumin Pro;
      line-height: normal;
      font-weight: 400;
      display: inline-block;
      font-size: 1em;
      color: #201D41;

    }

    p {
      font-family: Acumin Pro;
      line-height: 20px;
      font-size: 0.8em;
      color: #333333;
      font-weight: 300;
    }
    .side-stack{
        float:left;
        padding:  0.5em 1em !important;
      }
      
    #members {
      h4 {
        line-height: normal;
        color: #4f4f4f;
        font-weight: 400;
      }
      .member {
        border-radius: 40px;
        height: 40px;
        width: 40px;
        padding: 0;
        text-align: center;
        color: white;

        &:nth-child(1) {
          background: ${colors[0]};
        }
        &:nth-child(2) {
          background: ${colors[1]};
          position: relative;
          left: -8px;
        }
        &:nth-child(3) {
          background: ${colors[2]};
          position: relative;
          left: -16px;
        }
        &:nth-child(4) {
          background: ${colors[3]};
          position: relative;
          left: -24px;
          color: #156edc;
        }
      }
    }
}

`;
export const WalletWrapper = styled.div`
    height: 100vh;
    overflow: hidden;

.full{
    background: white;
    overflow: auto !important;
    height: 90.5vh;
}
.proof{

    label {
        display: block;
        font-size: 0.8em;
        color: #777;
    }

    // padding: 1.5% 3%;

    a{
        display: block;
        font-size:0.8em;

    }

}

.tokens{
    .token-card{
        cursor: pointer;
        display: block;

        margin: 1em 0;
        
        span.xlm {
            background: #369C05;
            /* border-radius: 2px; */
            font-size: 0.85em;
            text-transform: Uppercase;
            font-weight: 400;
            color: white;
            border-radius: 2px;
            padding: 0em 0.5em;
            height: 1.5em;
            line-height: 1.8em;
            display: inline-block;
            margin-right: 0.5em;          
        }
        
        span.pst{
            background: #156EDC;
            font-size: 0.85em;
            text-transform: Uppercase;
            font-weight: 400;
            color: white;
            border-radius: 2px;
            padding: 0em 0.5em;
            height: 1.5em;
            line-height: 1.8em;
            display: inline-block;
            margin-right: 0.5em;    
        }

        .inner{
            min-height: 8em;
            max-height: 8em;
            cursor: pointer;
            &.native{
                background: #074B9F;
            }
            &.pst{
                background: #0A2C56;
            }
            transition: 120ms;
           
            width: 95%;
            background: white;
            color: white;
            border-radius: 4px;
            border-radius: 1px solid #ddd;
            box-shadow: 0px 0px 1px 5px #f1f1f11f;
            padding: 1em;

            h4{
                margin: 0.25em 0;
                font-weight: 400;
                font-size: 14px;
                color: white;
                &.name{
                    height: 1em;
                }
            }

            .balance{
                color:#e78441 !important;
            }
            label{
                font-size :12px;
                color: white;
            }

            &:hover{
                background: #0A2C56;
                h4,label{
                    color: white;
                }
                transform: scale(1.05);
            }
        }
    }
}
`;

class Wallet extends Component {
    constructor(props){
        super(props);
        props.fetch_wallet();
        this.state = {
            steps: [
                {
                  target: ".tokens",
                  content: "This represents the base balance of the currency used by the sela system to perform actions on the platform, actions range from simple project creation to transfering tokens between stakeholders on a project etc."
              }],
            projects: {},
            pathname: "my-tokens",
            preloaders: false,
            myTokens: [],
            createdTokens: [],
            link: ""
        }
    }

    componentWillUnmount(){
        // this.props.clear_wallet();
    }
    
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){

            let obj = {
                preloaders: nextProps.type === FETCH_MY_WALLET_R,
                link: nextProps.link
            };

            if(nextProps.myTokens){
                obj.myTokens = nextProps.myTokens
            };

            if(nextProps.createdTokens){
                obj.createdTokens = nextProps.createdTokens
            };

            this.setState(obj);

        }
    }

    manualNavigator = e=>{
        e.preventDefault();
        this.setState({
            pathname: e.target.name
        })
    }

    render(){

        const { myTokens, createdTokens,preloaders,steps } = this.state;
        const pathname = this.state.pathname;

        return   <WalletWrapper className='xs-12'>
              <Joyride steps={steps} />

                    <Navbar />
                    <div className='xs-3 full'>
                        <div className='xs-12'>
                            <Nav className='xs-12'>    
                            <div className="xs-12" id="header">
                                <div className="xs-12"> 
                                <nav className="xs-12">

                                <NavLink
                                    className={`side-stack xs-6 ${pathname !== "project-tokens" ? "active":""}`}
                                    activeClassName="active"
                                    name="my-tokens"
                                    onClick={this.manualNavigator}
                                    exact to={`/dashboard/wallet/my-tokens`}>
                                    My Tokens
                                </NavLink>

                                <NavLink
                                    className={`side-stack xs-6 ${pathname  === "project-tokens" ? "active":""}`}
                                    activeClassName="active"
                                    name="project-tokens"
                                    onClick={this.manualNavigator}
                                    exact to={`/dashboard/wallet/project-tokens`}>
                                    Project Tokens
                                </NavLink>

                                </nav>
                            </div>
                            </div>
                        </Nav>    
                        </div>   
                        <div className="xs-12" id="view">
                            <SharedViewWrapper className='xs-12'>
                                { this.state.pathname === "my-tokens" ? 
                                    <div className='xs-12'>
                                        <div className='tokens xs-12'>
                                        
                                            { preloaders && [1].map(i=>{
                                                return <div className='token-card xs-12' key={i}>
                                                    <div className='inner xs-12'>
                                                        <h4 className='name placeholder'>
                                                            <Icon name='spinner' spin/>
                                                        </h4>
                                                        <label>Balance</label>
                                                        <h4 className='balance placeholder' >
                                                            <Icon name='spinner' spin/>
                                                        </h4>
                                                    </div>
                                                    
                                                </div>
                                            })
                                            }

                                            {Boolean(myTokens.length) &&
                                                myTokens.map((token,i)=>{
                                                    return <Link className='token-card xs-12' 
                                                        key={i} to={`/dashboard/wallet/${token.type === 'native' ? 'native':`native/${token.projectId}`}/`}>
                                                        <div className={`inner xs-12 ${token.type === "native" ? 'native': "pst"}`}>
                                                            <h4 className='name'> {token.type === "native" ? "My Lumens": token.projectName}</h4>
                                                            <label>Balance</label>
                                                            <h4 className='balance'>
                                                            <span className={token.type === "native" ? "xlm ":"pst"}>
                                                                {token.token ?  token.token : "XLM"}
                                                            </span>
                                                            {
                                                                window.moneyFormat(token.balance,  "")
                                                            }</h4>
                                                        </div>
                                                    </Link>
                                                })
                                            }
                    
                                        {preloaders === false && Boolean(myTokens.length)=== false && 
                                            <div className='token-card xs-12'>
                                                <div className='inner xs-12'>    
                                                    <label>None Found</label>   
                                                </div>
                                            </div>
                                        }
                                            
                                        </div>
                                    </div> 
                                            :
                                    <div className='xs-12'>
                                        {/* <label>Tokens Created</label> */}
                                        <div className='tokens xs-12'>
                                            
                                        { preloaders && [1].map(i=>{
                                                return <div className='token-card xs-12' key={i}>
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

                                        {Boolean(createdTokens.length) &&
                                            createdTokens.map((token,i)=>{
                                                return <Link className='token-card xs-12' 
                                                    key={i} to={`/dashboard/wallet/${token.projectId}`}>

                                                    <div className={`inner xs-12 ${token.type === "native" ? 'native': "pst"}`}>
                                                        <h4 className='name'> {token.projectName}</h4>
                                                        <label>Balance</label>
                                                        
                                                        { token.balances
                                                            .distributor.distributionAccountBalances.map((val,i)=>{
                                                            return <Fragment key={i}>
                                                        
                                                                <h4 className='balance'>
                                                                    <span className={val.type === "native" ? "xlm ":"pst"}>
                                                                        {val.token ?  val.token : "XLM"}
                                                                    </span>
                                                                    { window.moneyFormat(val.balance, " ")  }
                                                                </h4>
                                                            </Fragment>
                                                        })}
                                                    </div>

                                                </Link>
                                            })
                                        }

                                        {preloaders === false && Boolean(createdTokens.length)=== false && 
                                            <div className='token-card xs-12'>
                                                <div className='inner xs-12'>    
                                                    <label>None Found</label>   
                                                </div>
                                            </div>
                                        }
                                
                                        </div>
                                    </div>
                                }
                            </SharedViewWrapper>
                        </div>                
                    </div>

                    <div className='xs-9' style={{ height: '100%', overflow: 'auto'}}>
                        <Token {...this.props}/>
                    </div>
        
        </WalletWrapper>
    }

}

export const mapStateToProps = state=>{
    return {
        type: state.wallet.type,
        myTokens: state.wallet.myTokens,
        createdTokens: state.wallet.createdTokens,
        link: state.wallet.link
    }
}

export const mapDispatchToProps = dispatch =>{
    return {
        fetch_wallet: () => dispatch(fetch_my_wallet()),
        // clear_wallet: ()=> dispatch(clear_wallet())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wallet));