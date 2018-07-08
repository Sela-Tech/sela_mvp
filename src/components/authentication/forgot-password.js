import React from "react";
import Wrapper from "../../components/authentication/wrapper";
import Logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import AsycnButton from "../../components/authentication/async-button";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
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
    return (
      <Wrapper viewName="forgot-password">
        <div className="container">
          <div className="xs-12">
            <Link to="/">
              <img src={Logo} alt="logo" id="logo" />
            </Link>
          </div>
          <div className="xs-12">
            <h2>Reset Password </h2>
            <p className="xs-10 xs-off-1">
              Enter the email associated with your account to receive a password
              reset link.
            </p>
          </div>
          <div className="xs-12">
            <form
              className="xs-10 xs-off-1 sm-6 sm-off-3 md-4 md-off-4"
              onSubmit={this.onSubmit}
            >
              <div className="form-group xs-12">
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <AsycnButton id="submit-btn" attempt={""}>
                  Reset
                </AsycnButton>
              </div>

              <div className="form-group xs-12">
                <Link to="/signin" className="link" style={{ fontSize: "1em" }}>
                  Have an account? Sign in.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default ForgotPassword;
