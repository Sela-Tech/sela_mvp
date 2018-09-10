import React from "react";
import company_logo from "../assets/icons/sela-full-logo-blue.svg";
import { Route, Redirect } from "react-router-dom";

const style = {
  color: "#333"
};

export const LoadingRoute = ({ children, text, ...rest }) => (
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

export const PrivateRoute = ({
  isAuthenticated,
  type,
  component: Component,
  ...rest
}) => {
  switch (type) {
    case "auth":
      return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated === false ? (
              <Component {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
      );

    default:
      return (
        <Route
          {...rest}
          render={props =>
            isAuthenticated === true ? (
              <Component {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
      );
  }
};
