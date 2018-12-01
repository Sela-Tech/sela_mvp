import React from "react";
import { Route, Redirect } from "react-router-dom";

export const LoadingRoute = ({ children, text, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <div className="wrp xs-12">
      <div className="c-w i-h">
        <div className="c i-h t-c">            
          <div className="spinner">
              <div className="lds-ring">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>    
          </div> 
        </div>
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
