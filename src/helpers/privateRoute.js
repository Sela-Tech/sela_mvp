import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ isAuthenticated, type, component: Component, ...rest }) => {
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
