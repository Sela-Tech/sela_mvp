import React from "react";
// icons

import Logo from "../../../assets/icons/sela-circle-blue.svg";
import phone from "../../../assets/icons/phone.svg";
import success from "../../../assets/icons/success.svg";

// others
import { Link } from "react-router-dom";
import { validator } from "../../../helpers/utils";

// store related
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signup } from "../../../store/action-creators/auth";

// components
import Wrapper from "./wrapper";
import SignUpWrapper from "./signup.style";
import AsycnButton from "../../../shared-components/unique/async-button";
import auth from "../../../store/actions/auth";
import MessageToShow from "../../../shared-components/errors/messageToShow";

import { Creatable as Select } from "react-select";
import { fetchOrganizations } from "../../../store/action-creators/organizations";

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
        organization: { name: "", id: "", valid: false },
        email: { value: "", valid: false },
        password: { value: "", valid: false },
        phone: { value: "", valid: false }
      }
    };

    this.props.fetchOrganizations();
  }

  onSubmit = e => {
    e.preventDefault();
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
      return {
        formData: {
          ...p.formData,
          signUpType: {
            value: name,
            valid: true
          }
        }
      };
    });
  };

  handleOrgSelect = selectedOption => {
    const { value, id } = selectedOption;
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

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { type, message, inprogress, organizations } = nextProps;
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
  }
  render() {
    let {
      inprogress,
      type,
      message,
      selectedOption,
      organizations
    } = this.state;

    const { formData } = this.state,
      checkFormCompletion =
        Object.keys(formData).filter(key => {
          return formData[key].valid === true;
        }).length !== 7;

    switch (type) {
      case auth.SIGNUP_SUCCESSFUL:
        switch (this.state.formData["signUpType"].value) {
          case "project-funder":
            window.scrollTo(0, 0);
            return (
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
                        We’re currently reviewing your submission. We’ll send
                        you an email when your account is approved and
                        activated!
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
          default:
            window.scrollTo(0, 0);
            return (
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
                      <span>You're signed up!</span>
                    </h2>
                    <p className="xs-10 xs-off-1" id="signup-info-text">
                      <span> Let’s get you chatting with our Selabot </span>
                    </p>
                  </div>

                  <div className="xs-10 xs-off-1 sm-8 sm-off-2">
                    <ul id="list">
                      <li>
                        <div className="xs-2 sm-1">
                          <p className="round">
                            <span>1</span>
                          </p>
                        </div>
                        <div className="xs-10 sm-11 sp-text-styles">
                          <p className="type-1">
                            <strong>Download Telegram</strong> (if you already
                            have this installed, move on to step two)
                          </p>
                          <p className="type-2">
                            Telegram is a messaging application that you’ll use
                            to submit updates with Sela. You can find it on
                            Google Play Store or Apple App Store using the links
                            below
                          </p>

                          <div className="space">
                            <Link to="#" className="link">
                              Download Telegram for Android
                            </Link>
                            <Link to="#" className="link">
                              Download Telegram for iPhone
                            </Link>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="xs-2 sm-1">
                          <p className="round">
                            <span>2</span>
                          </p>
                        </div>
                        <div className="xs-10 sm-11 sp-text-styles">
                          <p className="type-1">
                            <strong>Meet Sela</strong>
                          </p>
                          <p className="type-2">
                            You’ll be communicating with our bot named
                            “Selabot”. Once you have Telegram installed, click
                            the button below to start your chat.
                          </p>

                          <div className="button-container">
                            <Link
                              id="open-chat"
                              to="/open-chat"
                              name="open-chat"
                            >
                              Open Chat
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </SignUpWrapper>
              </Wrapper>
            );
        }

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
                      active={this.state.formData["signUpType"].value}
                    />
                    <Button
                      title="Contractor"
                      name="contractor"
                      description="I want to track my project inprogress with Sela."
                      Ftn={this.onSelect}
                      active={this.state.formData["signUpType"].value}
                    />
                    <Button
                      title="Evaluation Agent"
                      name="evaluation-agent"
                      description="I want to help validate projects in my community."
                      Ftn={this.onSelect}
                      active={this.state.formData["signUpType"].value}
                    />
                  </div>

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

                  <div className="form-group xs-12">
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

                    <div className="xs-12">
                      <div className="error">
                        <MessageToShow
                          type={type}
                          message={message}
                          match={auth.SIGNUP_FAILED}
                        />
                      </div>
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
    organizations: state.organizations.list
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signup: bindActionCreators(signup, dispatch),
    fetchOrganizations: () => dispatch(fetchOrganizations())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
