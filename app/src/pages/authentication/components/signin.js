import React from "react";
import Wrapper from "./wrapper";

import Logo from "../../../assets/icons/sela-circle-blue.svg";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signin, resend_verification_mail } from "../../../store/action-creators/auth";
import * as adminACreators from "../../../store/action-creators/admin";

import AsycnButton from "../../../shared-components/unique/async-button";
import auth from "../../../store/actions/auth";
import { validator } from "../../../helpers/utils";
import { notify } from "../../../store/action-creators/app";
import config from "./config";

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

    this.props.admin === true
      ? this.props.adminACreators.signin({
          [key]: this.state.username[key],
          password
        })
      : this.props.signin({
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

  handleReset = ()=> {
    const key = Object.keys(this.state.username)[0];
    const value = this.state.username[key];
    this.props.send_verification_mail(value)
  }

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

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      
      const { type, message, inprogress } = nextProps;
      this.setState({
        type,
        message,
        inprogress
      });
   
      if(nextProps.type === auth.SIGNIN_SUCCESSFUL){
          notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"success");
        }

        if(nextProps.type === auth.RESEND_VERIFICATION_SUCCESSFUL){
          notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"success");
        }

        if(nextProps.type === auth.RESEND_VERIFICATION_FAILED){
          notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error");
        
        }
        
      if(nextProps.type === auth.SIGNIN_FAILED){

        if(typeof nextProps.message !== "string"){
          nextProps.message.map(m=>{
            if(m.indexOf("verified") !== -1){
              return notify(<p style={{color: 'white'}}>{m}</p>,"error",{
                autoClose: false
              });
            }else{
              return notify(<p style={{color: 'white'}}>{m}</p>,"error");
            }
          })
        } else {
          let m = nextProps.message;
          if(m.indexOf("verified") !== -1){
            return notify(
              <div className=''>
                <p style={{color: 'white'}}>{m}</p>
                <button style={{
                      padding: '.5em 1em',
                      marginBottom: ".5em",
                      fontSize: '15px',
                      background: '#982d4f',
                      color: 'white',
                      fontWeight: '300',
                      border: "0px solid white",
                      borderRadius: '5px'
                }} onClick={()=>this.handleReset()}> Resend Verification Mail </button>
              </div>,"error",{
              autoClose: false
            });
          }else{
            return notify(<p style={{color: 'white'}}>{m}</p>,"error");
          }
        }

    } 
    }
  }

  render() {
    const {
        inprogress,
        username,
        password,
        rememberMe
      } = this.state,
      sEUsername = this.state.specialError.username,
      minName = this.state.minLengths.username;

    let form_is_complete = this.state.password.length >= config.min_password_length 
    && Object.keys(this.state.username).length  === 2
    
    let disabled = !form_is_complete;

    return (
      <Wrapper viewName="signin">
        <div className="container">
          <div className="xs-12">
            <Link to="/">
              <img src={Logo} alt="logo" id="logo" />
            </Link>
          </div>
          <div className="xs-12">
            {this.props.admin ? (
              <React.Fragment>
                <h2> Admin Portal </h2>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2> Sign in to Sela </h2>
                <div className="test-cred xs-12">
                  <p>Test Username: test@gmail.com</p>
                  <p>Test Password: password</p>
                </div>
              </React.Fragment>
            )}
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
                  minLength={config.min_password_length}
                  required
                />

                {this.props.admin !== true && (
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
                )}
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
                {this.props.admin !== true && (
                  <Link
                    to="/signup"
                    className="link"
                    style={{ fontSize: "1em" }}
                  >
                    Don’t have an account? Sign up.
                  </Link>
                )}
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
    signin: bindActionCreators(signin, dispatch),
    send_verification_mail: field => dispatch(resend_verification_mail(field)),
    adminACreators: bindActionCreators(adminACreators, dispatch)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
