import React from "react";
import Wrapper from "./wrapper";
import Logo from "../../../assets/icons/sela-circle-blue.svg";
import { Link } from "react-router-dom";
import AsycnButton from "../../../shared-components/unique/async-button";
import {connect} from "react-redux";
import {send_recovery_mail} from "../../../store/action-creators/auth";
import { notify } from "../../../store/action-creators/app";
import auth from "../../../store/actions/auth";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        value:''
      }
    };
  }

  onSubmit = e => {

    const v = this.state.formData.value;

    e.preventDefault();
    if(parseInt(this.state.formData.value,10)){
    }

    let obj = {
      [parseInt(v,10) && v.indexOf("@") === -1 ? "phone":"email"]: v
    }

    this.props.dispatch(send_recovery_mail(obj));

  };

  onChange = e => {
    e.persist();
    const value = e.target.value;
      this.setState({
        formData: {
          ...this.state.formData,
          value
        }
      });  

  };

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){

      if(nextProps.type === auth.SEND_RECOVERY_MAIL_SUCCESSFUL){
          notify(<p style={{color: 'white'}}>Please Check Your Mail ! :)</p>,"success")
      }

      if(nextProps.type === auth.SEND_RECOVERY_MAIL_FAILED){
        if(nextProps.message.length > 0){
         notify(<p style={{color: 'white'}}>{nextProps.message[0].msg || nextProps.message}</p>,"error")
        }
      }

      
    }
  }

  render() {

    const {inprogress } = this.props;
    
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
                  name="text"
                  type="text"
                  className="form-control"
                  placeholder="Email Or Phone Number"
                  value={this.state.formData.value}
                  onChange={this.onChange}
                  required
                />
              </div>

              <div className="form-group xs-12">
                <AsycnButton id="submit-btn" attempt={inprogress}>
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

const mapStateToProps = state=>{
  return {
    message: state.auth.action.message,
    type : state.auth.action.type,
    inprogress: state.auth.action.type === auth.SEND_RECOVERY_MAIL_IN_PROGRESS,

  }
}
export default connect(mapStateToProps)(ForgotPassword);
