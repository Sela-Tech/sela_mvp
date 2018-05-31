import React from "react";
import Wrapper from "../../components/authentication/wrapper";

import Logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signin } from "../../store/action-creators/auth";
import AsycnButton from "../../components/authentication/async-button";
import auth from "../../store/actions/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password: ""
      }
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.signin(this.state.formData);
  };

  onChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    const { signin_auth_in_progress } = this.props;
    return (
      <Wrapper viewName="signin">
        <div className="container">
          <div className="xs-12">
            <img src={Logo} alt="logo" id="logo" />
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
                  placeholder="Email or Phone Number"
                  onChange={this.onChange}
                  value={this.state.formData.username}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={this.state.formData.password}
                  onChange={this.onChange}
                  required
                />

                <div className="extremes xs-12">
                  <div className="xs-6">
                    <input type="checkbox" name="remember-me" />
                    <label> Keep me signed in</label>
                  </div>

                  <div className="xs-6">
                    <Link to="/forgot/password" className="link">
                      Forgot password ?
                    </Link>
                  </div>
                </div>
              </div>

              <div className="form-group xs-12">
                <AsycnButton id="submit-btn" attempt={signin_auth_in_progress}>
                  Sign in
                </AsycnButton>
              </div>

              <div className="form-group xs-12">
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
    signin_auth_type: type,
    signin_auth_in_progress: type === auth.LOGIN_IN_PROGRESS,
    signin_auth_message: message
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
