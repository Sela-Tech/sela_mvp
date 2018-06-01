import React from "react";
import company_logo from "../assets/icons/logo.svg";
import { Route } from "react-router-dom";

const style = {
  color: "#333"
};

export default ({ children, text, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div className="center-wrapper">
        <div className="center">
          {children ? children : <img src={company_logo} alt="company-logo" />}
          <p style={style}>{text}</p>
        </div>
      </div>
    )}
  />
);
