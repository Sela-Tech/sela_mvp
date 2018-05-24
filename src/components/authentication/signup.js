import React from "react";
import SharedAuthWrapper from "../../styles/authentication/shared";
import SignUpWrapper from "../../styles/authentication/signup";
import Logo from "../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import validator from "../../helpers/validator";

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
      formData: {
        firstname: {value:"",valid: false},
        surname: {value:"",valid: false},
        "sign-up-type": {
          value:"",valid: false
        },
        email: {value:"",valid: false},
        password: {value:"",valid: false},
        phoneNumber: {value:"",valid: false}
      }
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let {formData} = this.state,
     objToSubmit = {};

    Object.keys(formData).map((key)=>{
      return objToSubmit = {...objToSubmit, [key]: formData[key].value}
    })
    // console.log(objToSubmit);
  };

  onSelect = name => {
    this.setState({
      formData: {
        ...this.state.formData,
        "sign-up-type": {
          value:name,
          valid: true
      }
    }
    });
  };

  onChange = e => {
    const {name,value} = e.target;
    this.setState({
      formData: {
        ...this.state.formData,
        [name]: {
          value, valid: validator(value,name)
        }
      }
    });
  };

  render() {

    const {formData} = this.state,
    checkFormCompletion = Object.keys(formData).filter((key)=>{
      return formData[key].valid === true
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
              <Link className="link" to="/login">
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
                  active={this.state.formData["sign-up-type"].value}
                />
                <Button
                  title="Contractor"
                  name="contractor"
                  description="I want to track my project progress with Sela."
                  Ftn={this.onSelect}
                  active={this.state.formData["sign-up-type"].value}
                />
                <Button
                  title="Evaluation Agent"
                  name="evaluation-agent"
                  description="I want to help validate projects in my community."
                  Ftn={this.onSelect}
                  active={this.state.formData["sign-up-type"].value}
                />
              </div>

              <div className="form-group xs-12 md-6">
                <input
                  name="firstname"
                  type="text"
                  className="form-control"
                  id="firstname"
                  placeholder="First Name"
                  value={this.state.formData.firstname.value}
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
                  value={this.state.formData.surname.value}
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
                  value={this.state.formData.email.value}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <input
                  name="phoneNumber"
                  type="tel"
                  value={this.state.formData.phoneNumber.value}
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
