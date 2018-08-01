import React, { Component } from "react";

export default class ChangePassword extends Component {
  render() {
    return (
      <form className="xs-12 sm-4">
        <div className="form-group">
          <label> Current Password </label>
          <input placeholder="" className="form-control" />
        </div>

        <div className="form-group">
          <label> New Password </label>
          <input placeholder="" className="form-control" />
        </div>

        <div className="form-group">
          <label> Verify Password </label>
          <input placeholder="" className="form-control" />
        </div>

        <div className="form-group">
          <button id="save"> Save changes </button>
        </div>
      </form>
    );
  }
}
