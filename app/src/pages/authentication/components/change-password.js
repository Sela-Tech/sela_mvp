import React from "react";
import Wrapper from "./wrapper";
import Logo from "../../../assets/icons/sela-circle-blue.svg";
import { Link, withRouter } from "react-router-dom";
import AsycnButton from "../../../shared-components/unique/async-button";
import {connect} from "react-redux";
import {update_password} from "../../../store/action-creators/auth";
import { notify } from "../../../store/action-creators/app";
import auth from "../../../store/actions/auth";
import { getQueryString } from "../../../helpers/utils";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyPassword: "",
      newPassword: ""
    };
  }

  onSubmit = e => {
    e.preventDefault();
    let obj =  {
      newPassword: this.state.newPassword,
      confirmPassword: this.state.verifyPassword
    };
    this.props.dispatch(update_password( obj, getQueryString(window.location.search).replace("token=","")));
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
    
    const validate = this.state.newPassword === this.state.verifyPassword 
    && this.state.newPassword !== "" && this.state.verifyPassword !== "";

    return (
      <Wrapper viewName="forgot-password">
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
                <input
                  name="newPassword"
                  type="password"
                  className= {`form-control ${validate ? `match`:`dont-match`}`}
                  placeholder="Enter New Password"
                  value={this.state.newPassword}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <input
                  name="verifyPassword"
                  type="password"
                  className= {`form-control ${validate ? `match`:`dont-match`}`}
                  placeholder="Verify New Password"
                  value={this.state.verifyPassword}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <AsycnButton id="submit-btn" attempt={inprogress} disabled={!validate}>
                  Update Password
                </AsycnButton>
              </div>

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
