import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "react-fa";
import { update } from "../../../../store/action-creators/auth";
import auth from "../../../../store/actions/auth";

const mapStateToProps = state => {
  return {
    actionType: state.auth.action.type
  };
};
export default connect(mapStateToProps)(
  class ChangePassword extends Component {
    state = {
      current_pass: "",
      new_pass: "",
      verify_pass: "",
      verified: false,
      actionType: ""
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          actionType: nextProps.actionType
        });
      }
    }
    handleChange = e => {
      this.setState(
        {
          [e.target.name]: e.target.value
        },
        this.verifyPass
      );
    };

    verifyPass = () => {
      this.setState({
        verified:
          this.state.verify_pass === this.state.new_pass &&
          this.state.verify_pass.length > 6 &&
          this.state.new_pass.length > 6
      });
    };

    handleSubmit = e => {
      e.preventDefault();

      if (this.state.new_pass === this.state.verify_pass) {
        return this.props.dispatch(
          update({
            oldPassword: this.state.current_pass,
            verifyPassword: this.state.verify_pass,
            newPassword: this.state.new_pass
          })
        );
      }
    };

    render() {
      let { actionType } = this.state,
        message = () => {
          if (actionType === auth.CHANGE_USER_DETAILS_SUCCESSFUL) {
            return "Changed password successfully";
          } else if (actionType === auth.CHANGE_USER_DETAILS_FAILED) {
            return "Could not change your password";
          }
        };

      return (
        <form className="xs-12 sm-4" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Current Password </label>
            <input
              placeholder=""
              className="form-control"
              name="current_pass"
              type="password"
              value={this.state.current_pass}
              onChange={this.handleChange}
              autoComplete="foo"
            />
          </div>

          <div className="form-group">
            <label> New Password </label>
            <input
              placeholder=""
              className="form-control"
              name="new_pass"
              type="password"
              value={this.state.new_pass}
              onChange={this.handleChange}
              minLength="6"
              autoComplete="foo"
            />
          </div>

          <div className="form-group">
            <label> Verify Password </label>
            <input
              placeholder=""
              type="password"
              className="form-control"
              name="verify_pass"
              value={this.state.verify_pass}
              onChange={this.handleChange}
              minLength="6"
              autoComplete="foo"
            />
          </div>

          <div className="form-group">
            <button id="save" type="submit" disabled={!this.state.verified}>
              {actionType === auth.CHANGE_USER_DETAILS_IN_PROGRESS ? (
                <span>
                  Attempting to save <Icon name="spinner" spin />
                </span>
              ) : (
                <span>Save changes</span>
              )}
            </button>
          </div>

          <div className="form-group">
            <p>{message()}</p>
          </div>
        </form>
      );
    }
  }
);
