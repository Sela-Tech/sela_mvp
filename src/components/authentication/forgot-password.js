import React from "react";
import SharedAuthWrapper from "../../styles/authentication/shared";
import Logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
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
      <SharedAuthWrapper>
        <div className="container">
          <div className="xs-12">
            <img src={Logo} alt="logo" id="logo" />
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
                <input type="submit" value="Reset" />
              </div>

              <div className="form-group xs-12">
                <Link to="/login" className="link" style={{fontSize: "1em"}}>
                  Have an account ? Sign in.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </SharedAuthWrapper>
    );
  }
}

export default ForgotPassword;
