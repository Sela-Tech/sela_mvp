import React from "react";
import SharedAuthWrapper from "../../styles/authentication/shared";
import Logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";

class Login extends React.Component {
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
            <h2>Sign in to Sela </h2>
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
                  required
                />
              </div>

              <div className="form-group xs-12">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
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
                <input type="submit" value="Sign in" />
              </div>

              <div className="form-group xs-12">
                <Link to="/signup" className="link" style={{ fontSize: "1em" }}>
                  Don’t have an account? Sign up.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </SharedAuthWrapper>
    );
  }
}

export default Login;
