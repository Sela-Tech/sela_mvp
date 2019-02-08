import React from "react";
//icons
import success from "../../../../assets/icons/success.svg";
import phone from "../../../../assets/icons/phone.svg";
import apple from "../../../../assets/apple.svg";
import google from "../../../../assets/google.svg";
import {Buttn} from "./evaluator.after-signup";

// components
import Wrapper from "../wrapper";
import SignUpWrapper from "../../styles/signup.style";


class DownloadAppAfterSignup extends React.Component {

  render() { 
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

export default DownloadAppAfterSignup;