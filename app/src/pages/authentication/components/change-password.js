import React from "react";
import Logo from "../../../assets/icons/sela-circle-blue.svg";
import { Link, withRouter } from "react-router-dom";
import AsycnButton from "../../../shared-components/unique/async-button";
import {connect} from "react-redux";
import {update_password} from "../../../store/action-creators/auth";
import { notify } from "../../../store/action-creators/app";
import auth from "../../../store/actions/auth";
import { getQueryString } from "../../../helpers/utils";
import ReactPasswordStrength from 'react-password-strength';
import config from "./config";
import Helmet from "react-helmet";
import Wrapper from "./wrapper";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    let token = null;
    if(window.location.search){
      token = getQueryString(window.location.search).replace("token=","")
    }
    this.state = {
      token,
      verifyPassword: {
        value: "",
        valid: false
      },
      newPassword: {
        value: "",
        valid: false
      }
    };
  }

  onNewPassChange = obj => {
    this.setState({
        newPassword: {
          value: obj.password,
          valid: obj.isValid
        }
    });  
  }

  onVerifyPassChange = obj => {
    this.setState({
        verifyPassword: {
          value: obj.password,
          valid: obj.isValid
        }
    });  
  }
  

  onSubmit = e => {
    e.preventDefault();
    let obj =  {
      newPassword: this.state.newPassword.value,
      confirmPassword: this.state.verifyPassword.value
    };
    this.props.dispatch(update_password( obj, this.state.token))
  };

  onChange = e => {
    e.persist();
    const {value,name} = e.target;
      this.setState({
        [name]:value
      });  
  };

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){

      if(nextProps.type === auth.UPDATE_PASSWORD_SUCCESSFUL){
          notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"success");
          nextProps.history.push("/signin")
      }

      if(nextProps.type === auth.UPDATE_PASSWORD_FAILED){
        notify(<p style={{color: 'white'}}>{nextProps.message}</p>,"error")
      } 
    }
  }

  render() {

    const {inprogress } = this.props;
    
    const values_match = this.state.newPassword.value === this.state.verifyPassword.value;
    const both_valid =  this.state.newPassword.valid === true && this.state.verifyPassword.valid === true;
    
    const validate = values_match && both_valid;

    return (
      <Wrapper className='xs-12' id='change-password'>
         <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Change Password </title>
        </Helmet>
     
        <div className="container">
          <div className="xs-12">
            <Link to="/">
              <img src={Logo} alt="logo" id="logo" />
            </Link>
          </div>
          <div className="xs-12">
            <h2>Change Password </h2>
            
          </div>
          <div className="xs-12">
            <form
              className="xs-10 xs-off-1 sm-6 sm-off-3 md-4 md-off-4"
              onSubmit={this.onSubmit}
            >
              <div className="form-group xs-12">
                    <ReactPasswordStrength
                     className= {`form-control ${validate ? `match`:`dont-match`}`}
                 
                      minLength={config.min_password_length}
                      minScore={4}
                      value={this.state.verifyPassword.value}
                      scoreWords={['weak', 'okay', 'good', 'strong', 'solid']}
                      changeCallback={this.onNewPassChange}
                      inputProps={{ name: "newPassword", autoComplete: "off",
                       className: "form-control", placeholder:'Enter new password ' }}
                      required
                    />
                </div>

              <div className="form-group xs-12">
                    <ReactPasswordStrength
                     className= {`form-control ${validate ? `match`:`dont-match`}`}
                 
                      minLength={config.min_password_length}
                      minScore={4}
                      value={this.state.verifyPassword.value}
                      scoreWords={['weak', 'okay', 'good', 'strong', 'solid']}
                      changeCallback={this.onVerifyPassChange}
                      inputProps={{ name: "verifyPassword", autoComplete: "off",
                       className: "form-control", placeholder:"Re-enter new password" }}
                      required
                    />
                  </div>
              {values_match === false && <p style={{color: 'pink'}}> Passwords Don't Match. </p> }    
              {this.state.token && 
              <div className="form-group xs-12">
                <AsycnButton id="submit-btn" attempt={inprogress} disabled={!validate}>
                  Update Password
                </AsycnButton>
              </div>
              }

              <div className="form-group xs-12">
                {this.props.admin !== true && (

                  <React.Fragment>
                    <Link
                      to="/signup"
                      className="link"
                      style={{ fontSize: "15px" }}
                    >
                      Don’t have an account? Sign up.
                    </Link>

                    <p> or </p>

                    <Link className="link" to="/signin"   style={{ fontSize: "15px" }}
                    >
                      Click here to sign in.                  
                    </Link>
                </React.Fragment>
                )}
              </div>
            </form>
          </div>
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = state=>{
  return {
    message: state.auth.action.message,
    type : state.auth.action.type,
    inprogress: state.auth.action.type === auth.UPDATE_PASSWORD_IN_PROGRESS
  }
}
export default withRouter( connect(mapStateToProps)(ChangePassword));
