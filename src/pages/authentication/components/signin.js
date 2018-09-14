import React from "react";
import Wrapper from "./wrapper";

import Logo from "../../../assets/icons/sela-circle-blue.svg";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signin } from "../../../store/action-creators/auth";
import AsycnButton from "../../../shared-components/unique/async-button";
import auth from "../../../store/actions/auth";
import MessageToShow from "../../../shared-components/errors/messageToShow";
import { validator } from "../../../helpers/utils";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minLengths: {
        username: 5,
        password: 6
      },
      specialError: {
        username: "",
        password: ""
      },
      username: {
        base: ""
      },
      password: "",
      rememberMe: false
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const key = Object.keys(this.state.username)[0],
      { password, rememberMe } = this.state;

    this.props.signin({
      [key]: this.state.username[key],
      password,
      rememberMe
    });
  };

  onPasswordChange = e => {
    const v = e.target.value;

    this.setState({
      password: v
    });
  };

  onUsernameChange = e => {
    let v = e.target.value;

    if (
      v !== "" &&
      validator(v, "email") === false &&
      validator(v, "phoneNumber") === false
    ) {
      this.setState({
        specialError: {
          ...this.state.specialError,
          username: "That email address / phone number looks invalid"
        }
      });
    } else {
      this.setState({
        specialError: {
          ...this.state.specialError,
          username: undefined
        }
      });
    }

    if (validator(v, "email")) {
      this.setState({
        username: {
          email: v,
          base: v
        }
      });
    } else if (
      validator(v, "phoneNumber") &&
      v.length >= this.state.minLengths.username
    ) {
      this.setState({
        username: {
          phone: v,
          base: v
        }
      });
    } else {
      this.setState({
        username: {
          base: v
        }
      });
    }
  };

  onCheck = e => {
    this.setState(p => {
      return {
        rememberMe: !p.rememberMe
      };
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { type, message, inprogress } = nextProps;
      this.setState({
        type,
        message,
        inprogress
      });
    }
  }
  confirmFields = () => {
    if (this.state.password.length > this.state.minLengths.password) {
      if (Object.keys(this.state.username).length < 2) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    const {
        inprogress,
        message,
        type,
        username,
        password,
        rememberMe
      } = this.state,
      disabled = this.confirmFields(),
      sEUsername = this.state.specialError.username,
      minName = this.state.minLengths.username,
      minPass = this.state.minLengths.password;

    return (
      <Wrapper viewName="signin">
        <div className="container">
          <div className="xs-12">
            <Link to="/">
              <img src={Logo} alt="logo" id="logo" />
            </Link>
          </div>
          <div className="xs-12">
            <h2> Sign in to Sela </h2>
          </div>

          <div className="xs-12">
            <form
              className="xs-10 xs-off-1 sm-6 sm-off-3 md-4 md-off-4"
              onSubmit={this.onSubmit}
            >
              <div className="form-group xs-12">
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Phone Number/Email Address"
                  onChange={this.onUsernameChange}
                  value={username["base"]}
                  minLength={minName}
                  maxLength={50}
                  required
                  autoFocus
                />
                {sEUsername && <p className="special-error">{sEUsername}</p>}
              </div>

              <div className="form-group xs-12">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={this.onPasswordChange}
                  minLength={minPass}
                  required
                />

                <div className="extremes xs-12">
                  <div className="xs-6">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      value={rememberMe}
                      onChange={this.onCheck}
                    />
                    <label> Keep me signed in</label>
                  </div>

                  <div className="xs-6">
                    <Link to="/forgot/password" className="link">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <div className="form-group xs-12">
                <AsycnButton
                  id="submit-btn"
                  attempt={inprogress}
                  disabled={disabled}
                >
                  Sign in
                </AsycnButton>
              </div>

              <div className="form-group xs-12">
                <div className="error">
                  <MessageToShow
                    type={type}
                    message={message}
                    match={auth.SIGNIN_FAILED}
                  />
                </div>

                <Link to="/signup" className="link" style={{ fontSize: "1em" }}>
                  Don’t have an account? Sign up.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  const { type, message } = state.auth.action;

  return {
    type,
    inprogress: type === auth.SIGNIN_IN_PROGRESS,
    message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    signin: bindActionCreators(signin, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
