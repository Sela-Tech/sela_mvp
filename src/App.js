import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import r from "./routes";
import PrivateRoute from "./helpers/privateRoute";

import { connect } from "react-redux";
import authActions from "./store/actions/auth";

const App = ({ isAuthenticated, actionType }) => {
  return (
    <Router>
      {actionType === authActions.TOKEN_VERIFICATION_IN_PROGRESS ? (
        <Switch>
          <Route exact path="/" component={r.home} />
          <Route component={r.loading} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={r.home} />
          <PrivateRoute
            exact
            path="/signin"
            type="auth"
            isAuthenticated={isAuthenticated}
            component={r.signin}
          />
          <PrivateRoute
            exact
            path="/signup"
            type="auth"
            isAuthenticated={isAuthenticated}
            component={r.signup}
          />
          <PrivateRoute
            exact
            path="/forgot/password"
            type="auth"
            isAuthenticated={isAuthenticated}
            component={r.forgot_password}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            component={r.dashboard_home}
          />
          <Route component={r.errors} />
        </Switch>
      )}
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    actionType: state.auth.action.type
  };
};

export default connect(mapStateToProps)(App);
