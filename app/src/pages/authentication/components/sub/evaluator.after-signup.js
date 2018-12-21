import React from 'react';
import Wrapper from "../wrapper";
import SignUpWrapper from "../../styles/signup.style";

import phone from "../../../../assets/icons/phone.svg";
import apple from "../../../../assets/apple.svg";
import google from "../../../../assets/google.svg";

import success from "../../../../assets/icons/success.svg";
import styled from "styled-components";

import {connect} from "react-redux";
import { signout } from '../../../../store/action-creators/auth';
import { withRouter, Redirect } from 'react-router';

export const Buttn = styled.div`
margin-top: 2em;
cursor:pointer;
.close-button {
    display: inline-block;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: calc(0.75em/2);
    height: calc(0.75em/2);
    position: relative;
    border: none;
    -webkit-border-radius: 1em;
    border-radius: 1em;
    font: normal 8em/normal Arial, Helvetica, sans-serif;
    color: rgba(0,0,0,1);
    -o-text-overflow: clip;
    text-overflow: clip;
    background: #e27936;
  }
  
  .close-button::before {
    display: inline-block;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: calc(0.45em/2);
    height: calc(0.1em/2);
    position: absolute;
    content: "";
    top: calc(0.33em/2);
    left: calc(0.165em/2);
    border: none;
    font: normal 100%/normal Arial, Helvetica, sans-serif;
    color: rgba(0,0,0,1);
    -o-text-overflow: clip;
    text-overflow: clip;
    background: #ffffff;
    text-shadow: none;
    -webkit-transform: rotateZ(45deg)   ;
    transform: rotateZ(45deg)   ;
  }
  
  .close-button::after {
    display: inline-block;
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
    width: calc( 0.45em/2);
    height: calc( 0.1em/2);
    position: absolute;
    content: "";
    top:calc(0.33em/2);
    left: calc(0.165em/2);
    border: none;
    font: normal 100%/normal Arial, Helvetica, sans-serif;
    color: rgba(0,0,0,1);
    -o-text-overflow: clip;
    text-overflow: clip;
    background: #ffffff;
    text-shadow: none;
    -webkit-transform: rotateZ(-45deg)   ;
    transform: rotateZ(-45deg)   ;
  }
`;



class EAS extends React.Component{
  
  render(){
  
    switch ( this.props.isAuthenticated ) {
        case false:            
        return <Redirect exact to="/"/>
            
        default:
        return <Wrapper viewName="signup">
        <SignUpWrapper className="container">
          <div className="xs-12">
            <div id="phone-wrapper">
              <div id="phone">
                <img src={phone} alt="phone" />
              </div>
            </div>
          </div>
          <div className="xs-12">
            <h2>
              <img src={success} alt="success" id="success-icon" />
              You're signed up!
            </h2>
            <p
              className="xs-10 xs-off-1 sm-6 sm-off-3"
              id="signup-info-text"
            >
              <span>
              Download the Sela app to continue. With the Sela app, you will be able to upload evaluation submissions for projects around you </span>
            </p>
          </div>

          <div className="xs-12 video-section">
            <div className="xs-10 xs-off-1 sm-6 sm-off-3">

              <div className="xs-12 sm-6 t-c">
                <img src={apple} alt="apple" id="apple"/>
              </div>  

              <div className="xs-12 sm-6 t-c">
                <img src={google} alt="google" id="google"/>
              </div>  
              
              
            </div>
          </div>

          <div className='xs-12'>
        
            <Buttn onClick={this.props.logout}>
                <div className="close-button"></div> 
            </Buttn>

          </div>

        </SignUpWrapper>
      </Wrapper>
  
    }
}
}

const mapDispatchToProps = dispatch=>{
    return {
        logout: ()=>{
            dispatch(signout());
        }
  
    }
}

const mapStateToProps = state=>{
    return {
         isAuthenticated: state.auth.isAuthenticated,
         signUpType: state.auth.signUpType
    }
}

export default withRouter( connect(mapStateToProps,mapDispatchToProps)(EAS));