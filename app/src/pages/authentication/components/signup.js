import React from "react";
// icons

import Logo from "../../../assets/icons/sela-circle-blue.svg";
import up from "../../../assets/icons/up.svg";
import success from "../../../assets/icons/success.svg";


import phone from "../../../assets/icons/phone.svg";
import apple from "../../../assets/apple.svg";
import google from "../../../assets/google.svg";


// others
import { Link, NavLink, withRouter } from "react-router-dom";
import { validator } from "../../../helpers/utils";

// store related
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signup, signout } from "../../../store/action-creators/auth";

// components
import Wrapper from "./wrapper";
import SignUpWrapper from "../styles/signup.style";

import AsycnButton from "../../../shared-components/unique/async-button";
import auth from "../../../store/actions/auth";
// import MessageToShow from "../../../shared-components/errors/messageToShow";

import { Creatable as Select } from "react-select";
import { fetchOrganizations } from "../../../store/action-creators/organizations";

// import ReactS3Uploader from "react-s3-uploader";
// import endpoints from "../../../endpoints";

import {Buttn} from "./sub/evaluator.after-signup";
import { notify } from "../../../store/action-creators/app";

const Button = ({ active, title, description, name, Ftn }) => {
  let onClick = () => Ftn(name);

  const activeClassName = active === name ? "active" : "";
  return (
    <div className="xs-12 md-4 signup-type-button" onClick={onClick}>
      <div className={"inner " + activeClassName}>
        <div className="checkbox-part xs-3">
          <label className="l-container">
            <input type="checkbox" checked={active === name} />
            <span className="checkmark" />
          </label>
        </div>

        <div className="text-part xs-8 md-12">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizations: [],
      formData: {
        firstName: { value: "", valid: false },
        lastName: { value: "", valid: false },
        signUpType: {
          value: "",
          valid: false
        },
        profilePhoto: { preview: "", file: "" },
        organization: { name: "", id: "", valid: false },
        email: { value: "", valid: false },
        password: { value: "", valid: false },
        phone: { value: "", valid: false }
      }
    };
    this.props.clear();
    this.props.fetchOrganizations();
  }

  onSubmit = e => {
    e.preventDefault();

    this.setState({
      inprogress: true
    });

    let { formData } = this.state,
      objToSubmit = {};

    Object.keys(formData).map(key => {
      return (objToSubmit = { ...objToSubmit, [key]: formData[key].value });
    });

    objToSubmit = {
      ...objToSubmit,
      organization: {
        name: formData.organization.name,
        id: formData.organization.id
      }
    };

    if (this.state.formData.profilePhoto.file) {
      this.next(this.state.formData.profilePhoto.file);
    } else {
      this.props.signup(objToSubmit);
    }
  };

  onSelect = name => {
    this.setState(p => {

      if(name === "evaluation-agent"){
        return {
          selectedOption: undefined,
          formData:{
            ...p.formData,
            organization: { name: "", id: "", valid: false },
            signUpType: {
              value: name,
              valid: true
            }
         
          }
        }
      }else{
      return {
        formData: {
          ...p.formData,
          signUpType: {
            value: name,
            valid: true
          }
        }
      };
    }
    });
  };

  handleOrgSelect = selectedOption => {
    let value, id;

    if (selectedOption === null) {
      selectedOption = undefined;
    } else {
      value = selectedOption.value;
      id = selectedOption.id;
    }

    this.setState(p => {
      return {
        selectedOption,
        formData: {
          ...p.formData,
          organization: {
            name: value,
            id,
            valid: validator(value, "string")
          }
        }
      };
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: {
          value,
          valid: validator(value, name)
        }
      }
    });
  };


  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      
      const { type, message, inprogress, organizations } = nextProps;

      if(type === auth.SIGNOUT){
        nextProps.history.push("/")
      }
    
      this.setState({
        type,
        message,
        inprogress,
        organizations: organizations.map(o => {
          return {
            label: o.name,
            value: o.name,
            id: o._id
          };
        })
      });
    }
   
      if(nextProps.type === auth.SIGNUP_SUCCESSFUL){
          notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"success");
      }
      if(nextProps.type === auth.SIGNUP_FAILED){
        notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error")
      } 
    }
  


  handleImageChange = (file, next) => {
    this.setState({
      formData: {
        ...this.state.formData,
        profilePhoto: {
          preview: URL.createObjectURL(file),
          file
        }
      }
    });
    this.next = next;
  };

  onUploadFinish = upload => {
    let { formData } = this.state,
      objToSubmit = {};

    Object.keys(formData).map(key => {
      objToSubmit = { ...objToSubmit, [key]: formData[key].value };
      return null;
    });

    objToSubmit = {
      ...objToSubmit,
      profilePhoto:
        "https://s3.us-east-2.amazonaws.com/selamvp/" + upload.filename,
      organization: {
        name: formData.organization.name,
        id: formData.organization.id
      }
    };

    this.props.signup(objToSubmit);
  };

  onUploadProgress = count => {
    this.setState({
      uploading: count
    });
  };


  render() {

    let {
      inprogress,
      type,
      // message,
      selectedOption,
      organizations
    } = this.state;

    const { formData } = this.state;

    const count = formData.signUpType.value ==="evaluation-agent" ? 6:7;

    const length = Object.keys(formData).filter(key => {     
      if(count === 6){
        if(formData[key].value !== "evaluation-agent"){
          return formData[key].valid === true;
        }
      }
      return formData[key].valid === true;
    }).length;

    const checkFormCompletion = length !== count;

    switch (type) {
      
      case auth.SIGNUP_SUCCESSFUL:
        window.scrollTo(0, 0);

       return this.props.signUpType === "evaluation-agent"?
        <Wrapper viewName="signup">
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
  
       :
       (
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
      );


        // (
        //   <Wrapper viewName="signup">
        //     <SignUpWrapper className="container">
        //       <div className="xs-12">
        //         <div id="phone-wrapper">
        //           <div id="phone">
        //             <img src={up} alt="up" />
        //           </div>
        //         </div>
        //       </div>
        //       <div className="xs-12">
        //         <h2>
        //           <img src={success} alt="success" id="success-icon" />
        //           You're signed up!
        //         </h2>
        //         <p
        //           className="xs-10 xs-off-1 sm-6 sm-off-3"
        //           id="signup-info-text"
        //         >
        //           <span>
        //             We’re currently reviewing your submission. We’ll send you an
        //             email when your account is approved and activated!
        //           </span>
        //         </p>
        //       </div>

        //       <div className="xs-12 video-section">
        //         <p className="xs-10 xs-off-1 sm-8 sm-off-2">
        //           <span>
        //             In the meantime, here’s a walkthrough to help you get
        //             familiar with the platform:
        //           </span>
        //         </p>

        //         <div className="xs-12 sm-8 sm-off-2" id="video-wrapper">
        //           <video
        //             poster="http://placehold.it/400"
        //             controls
        //             src="http://techslides.com/demos/sample-videos/small.mp4"
        //             height="400px"
        //             width="100%"
        //           />
        //         </div>
        //       </div>
        //     </SignUpWrapper>
        //   </Wrapper>
        // );

      default:
        return (
          <Wrapper viewName="signup">
            <SignUpWrapper className="container">
              <div className="xs-12">
                <Link to="/">
                  <img src={Logo} alt="logo" id="logo" />
                </Link>
              </div>
              <div className="xs-12">
                <h2>Let's get started </h2>
                <p className="xs-10 xs-off-1" id="signup-info-text">
                  <span>
                    Create an account to join the Sela platform and community.
                  </span>
                  <Link className="link" to="/signin">
                    Already have an account? Sign in here
                  </Link>
                </p>
              </div>

              <div className="xs-12">
                <form
                  className="xs-10 xs-off-1 sm-6 sm-off-3"
                  onSubmit={this.onSubmit}
                >
                  <div className="form-group xs-12">
                    <Button
                      title="Project Funder"
                      name="project-funder"
                      description="I want to use Sela to manage projects I fund."
                      Ftn={this.onSelect}
                      active={formData["signUpType"].value}
                    />
                    <Button
                      title="Contractor"
                      name="contractor"
                      description="I want to track my project inprogress with Sela."
                      Ftn={this.onSelect}
                      active={formData["signUpType"].value}
                    />
                    <Button
                      title="Evaluation Agent"
                      name="evaluation-agent"
                      description="I want to help validate projects in my community."
                      Ftn={this.onSelect}
                      active={formData["signUpType"].value}
                    />
                  </div>

                  {/* <div className="form-group xs-12 md-6">
                    <label htmlFor="photo" className="profile-photo">
                      {formData.profilePhoto.preview && (
                        <img
                          src={formData.profilePhoto.preview}
                          alt="profilePhoto"
                          id="profilePhoto"
                        />
                      )}
                      <div className="c-w">
                        <div className="c t-c">
                          <span>+</span>
                        </div>
                      </div>

                      <ReactS3Uploader
                        id="photo"
                        name="profile-photo"
                        server={endpoints.b}
                        signingUrl="s3/sign"
                        signingUrlMethod="GET"
                        accept="image/*"
                        s3path="user-avatars/"
                        preprocess={this.handleImageChange}
                        onSignedUrl={this.onSignedUrl}
                        onProgress={this.onUploadProgress}
                        onError={this.onUploadError}
                        onFinish={this.onUploadFinish}
                        uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
                        contentDisposition="auto"
                        scrubFilename={filename =>
                          filename.replace(/[^\w\d_\-.]+/gi, "")
                        }
                        autoUpload={true}
                      />
                    </label>
                  </div> */}

                  <div className="form-group xs-12 md-12">
                    <div className="form-group xs-12 md-6">
                      <input
                        name="firstName"
                        type="text"
                        className="form-control"
                        id="firstname"
                        placeholder="First Name"
                        value={this.state.formData.firstName.value}
                        onChange={this.onChange}
                        required
                      />
                    </div>

                    <div className="form-group xs-12 md-6">
                      <input
                        name="lastName"
                        type="text"
                        className="form-control"
                        placeholder="Last Name / Surname"
                        value={this.state.formData.lastName.value}
                        onChange={this.onChange}
                        required
                      />
                    </div>
                  </div>
              {
                this.state.formData["signUpType"].value !== "evaluation-agent" &&
                  <div className="form-group xs-12">
                    <label id="olabel">Type in or find your organization</label>
                    <Select
                      name="organization"
                      className="form-control"
                      value={selectedOption}
                      onChange={this.handleOrgSelect}
                      options={organizations}
                      isSearchable
                      isClearable
                      required
                      placeholder="Organization"
                    />
                  </div>
              }

                  <div className="form-group xs-12">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={this.state.formData.email.value}
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="form-group xs-12">
                    <input
                      name="phone"
                      type="tel"
                      value={this.state.formData.phone.value}
                      className="form-control"
                      placeholder="Phone Number"
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="form-group xs-12">
                    <input
                      name="password"
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.formData.password.value}
                      onChange={this.onChange}
                      required
                    />
                  </div>

                  <div className="form-group xs-12" id="submit-part">
                    <div className="xs-12 md-4 center-t">
                      <AsycnButton
                        id="submit-btn"
                        attempt={inprogress}
                        disabled={checkFormCompletion}
                      >
                        Get Started
                      </AsycnButton>
                    </div>

                    <div className="xs-12 md-8">
                      <p className="xs-12 md-10 md-off-1 center-t-sm">
                        By clicking this button, you agree to our{" "}
                        <Link to="/terms" className="link">
                          Terms and Conditions.
                        </Link>
                      </p>
                    </div>

                

                  </div>
                </form>
              </div>
            </SignUpWrapper>
          </Wrapper>
        );
    }
  }
}

const mapStateToProps = state => {
  const { type, message } = state.auth.action;
  return {
    type: type,
    inprogress: type === auth.SIGNUP_IN_PROGRESS,
    message,
    organizations: state.organizations.list,
    signUpType: state.auth.signUpType
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signup: bindActionCreators(signup, dispatch),
    fetchOrganizations: () => dispatch(fetchOrganizations()),
    clear: () => dispatch({ type: auth.CLEAR }),
    logout: () => dispatch(signout())
  };
};
export default withRouter( connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup));
