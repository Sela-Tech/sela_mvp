import React from "react";
//icons
import up from "../../../../assets/icons/up.svg";
import success from "../../../../assets/icons/success.svg";
import NavLink from "react-router-dom/NavLink";

// components
import Wrapper from "../wrapper";
import SignUpWrapper from "../../styles/signup.style";

class CheckInboxAfterSignUp extends React.Component {

  render() { 
       return <Wrapper viewName="signup">
          <SignUpWrapper className="container">
            <div className="xs-12">
              <div id="phone-wrapper">
                <div id="phone">
                  <img src={up} alt="up" />
                </div>
              </div>
            </div>
            <div className="xs-12">
              <h2>
                <img src={success} alt="success" id="success-icon" />
                You're signed up!
              </h2>

            <div  className="xs-10 xs-off-1 sm-6 sm-off-3">
            
              <p
              className='xs-12'
              id="signup-info-text">

                <span>
                  Thank you for signing up!.
                </span>
            
                <span>
                  Please check your <strong>inbox</strong> and following the instructions provided to verify your email address.
                </span>
                
              </p>

            </div>

                <div className="xs-12">
                  <NavLink exact to="/signin" id='sign-in'>Proceed To Sigin</NavLink>
                </div>
            
            </div>

          
          </SignUpWrapper>
        </Wrapper>
      
  }
}

export default CheckInboxAfterSignUp;