

        import React from "react";
//icons
import up from "../../../../assets/icons/up.svg";
import success from "../../../../assets/icons/success.svg";

// components
import Wrapper from "../wrapper";
import SignUpWrapper from "../../styles/signup.style";

class CheckInboxAfterSignUp extends React.Component {

  render() { 
       return   (
          <Wrapper viewName="signup">
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
                <p
                  className="xs-10 xs-off-1 sm-6 sm-off-3"
                  id="signup-info-text"
                >
                  <span>
                    We’re currently reviewing your submission. We’ll send you an
                    email when your account is approved and activated!
                  </span>
                </p>
              </div>

              <div className="xs-12 video-section">
                <p className="xs-10 xs-off-1 sm-8 sm-off-2">
                  <span>
                    In the meantime, here’s a walkthrough to help you get
                    familiar with the platform:
                  </span>
                </p>

                <div className="xs-12 sm-8 sm-off-2" id="video-wrapper">
                  <video
                    poster="http://placehold.it/400"
                    controls
                    src="http://techslides.com/demos/sample-videos/small.mp4"
                    height="400px"
                    width="100%"
                  />
                </div>
              </div>
            </SignUpWrapper>
          </Wrapper>
        );

      
  }
}

export default CheckInboxAfterSignUp;