import React from "react";
import SharedAuthWrapper from "../../styles/authentication/shared";
import SignUpWrapper from "../../styles/authentication/signup";
import Logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";

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
      formData: {}
    };
  }

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.formData);
  };

  onSelect = name => {
    this.setState({
      formData: {
        ...this.state.formData,
        "sign-up-type": name
      }
    });
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
    const checkFormCompletion =
      Object.keys(this.state.formData).filter((k, i) => {
        if (this.state.formData[k] !== "") return k;
      }).length !== 6;

    return (
      <SharedAuthWrapper>
        <SignUpWrapper className="container">
          <div className="xs-12">
            <img src={Logo} alt="logo" id="logo" />
          </div>
          <div className="xs-12">
            <h2>Let's get started </h2>
            <p className="xs-10 xs-off-1" id="signup-info-text">
              <span>
                Create an account to join the Sela platform and community.{" "}
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
                  active={this.state.formData["sign-up-type"]}
                />
                <Button
                  title="Contractor"
                  name="contractor"
                  description="I want to track my project progress with Sela."
                  Ftn={this.onSelect}
                  active={this.state.formData["sign-up-type"]}
                />
                <Button
                  title="Evaluation Agent"
                  name="evaluation-agent"
                  description="I want to help validate projects in my community."
                  Ftn={this.onSelect}
                  active={this.state.formData["sign-up-type"]}
                />
              </div>

              <div className="form-group xs-12 md-6">
                <input
                  name="firstname"
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="First Name"
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12 md-6">
                <input
                  name="surname"
                  type="text"
                  className="form-control"
                  placeholder="Surname"
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <input
                  name="phoneNumber"
                  type="tel"
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
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12" id="submit-part">
                <div className="xs-12 md-4">
                  <input
                    type="submit"
                    value="Get Started"
                    disabled={checkFormCompletion}
                  />
                </div>

                <div className="xs-12 md-8">
                  <p className="xs-12 md-10 md-off-1">
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
      </SharedAuthWrapper>
    );
  }
}

export default Signup;
