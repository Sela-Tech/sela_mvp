import React from "react";
// icons

import Logo from "../../../assets/icons/sela-circle-blue.svg";

// others
import { Link, withRouter } from "react-router-dom";
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

import { Creatable as Select } from "react-select";
import { fetchOrganizations } from "../../../store/action-creators/organizations";

import { notify } from "../../../store/action-creators/app";
import CheckInboxAfterSignUp from "./sub/check_inbox.after-signup";
import DownloadAppAfterSignup from "./sub/download_app.after-signup";

import ReactPasswordStrength from 'react-password-strength';
import config from "./config";

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
        signUpType: {  value: "", valid: false },
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

     this.props.signup(objToSubmit);
    
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
  
  onPassChange = obj => {
    this.setState({
      formData: {
        ...this.state.formData,
        password: {
          value: obj.password,
          valid: obj.isValid
        }
      }
    });  
  }

  render() {

    let {
      inprogress,
      type,
      selectedOption,
      organizations
    } = this.state;

    const { formData } = this.state;

    let disable_form  = true, form_is_complete = false;

     const valid_fields = Object.keys(formData).filter(key => {     
      return formData[key].valid === true;
    })

    if( formData.signUpType.value === "evaluation-agent" ){
      form_is_complete = valid_fields.length >= config.min_valid_field_count_for_evaluators;
    }else if(formData.signUpType.value === "project-funder") {
      form_is_complete = valid_fields.length >= config.min_valid_field_count_for_project_funders;
    }else if(formData.signUpType.value === "contractor"){
      form_is_complete = valid_fields.length >= config.min_valid_field_count_for_contractors;
    }
    
    // because if the form is complete, without the exclamation mark,it would still disable so i reversed it.
    
    disable_form = !form_is_complete;
   
    switch (type) {
      
      case auth.SIGNUP_SUCCESSFUL:
        window.scrollTo(0, 0);

       return this.props.signUpType === "evaluation-agent" 
        ?
        <DownloadAppAfterSignup logout={this.props.logout}/>
        :
        <CheckInboxAfterSignUp/>
      
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
                    />
                  </div>

                  <div className="form-group xs-12">
                    <ReactPasswordStrength
                      minLength={config.min_password_length}
                      minScore={4}
                      value={this.state.formData.password.value}
                      scoreWords={['weak', 'okay', 'good', 'strong', 'solid']}
                      changeCallback={this.onPassChange}
                      inputProps={{ name: "password", autoComplete: "off", className: "form-control" }}
                      required
                    />
                  </div>

                  <div className="form-group xs-12" id="submit-part">
                    <div className="xs-12 md-4 center-t">
                      <AsycnButton
                        id="submit-btn"
                        attempt={inprogress}
                        disabled={disable_form}
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
