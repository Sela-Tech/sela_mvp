import React, { Component } from "react";

export default class AccountDetails extends Component {
  render() {
    return (
      <form className="xs-12 sm-4">
        <div className="form-group">
          <label> Username </label>
          <input placeholder="" name="username" className="form-control" />
        </div>

        <div className="form-group">
          <label> Email Address </label>
          <input placeholder="" name="email" className="form-control" />
        </div>

        <div className="form-group">
          <label> Phone Number </label>
          <input placeholder="" name="phoneNumber" className="form-control" />
        </div>

        <div className="form-group">
          <button id="save"> Save changes </button>
        </div>
      </form>
    );
  }
}
