import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import r from "./routes";
import PrivateRoute from "./helpers/privateRoute";

import { connect } from "react-redux";
import authActions from "./store/actions/auth";
import LoadingRoute from "./helpers/loadingRoute";
import Errors from "./pages/errors";

const FilterDashboard = (type, isAuthenticated = false) => {
  switch (type) {
    default:
      return <Errors errorName="under-construction" />;

    case "project-funder":
      return [
        <PrivateRoute
          key={1}
          exact
          path="/dashboard"
          isAuthenticated={isAuthenticated}
          component={r.funder_dashboard_home}
        />,

        <PrivateRoute
          key={2}
          exact
          path="/dashboard/project/:id"
          isAuthenticated={isAuthenticated}
          component={r.funder_dashboard_project}
        />
      ];

    case "contractor":
      return [
        <PrivateRoute
          key={1}
          exact
          path="/dashboard"
          isAuthenticated={isAuthenticated}
          component={r.funder_dashboard_home}
        />,

        <PrivateRoute
          key={2}
          exact
          path="/dashboard/project/:id"
          isAuthenticated={isAuthenticated}
          component={r.funder_dashboard_project}
        />
      ];
  }
};

const App = ({ isAuthenticated, actionType, dashboardType }) => {
  return (
    <Router>
      {actionType === authActions.TOKEN_VERIFICATION_IN_PROGRESS ? (
        <Switch>
          <Route exact path="/" component={r.home} />
          <LoadingRoute text={"Please Wait..."} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={r.home} />

          <PrivateRoute
            exact
            path="/signin"
            type="auth"
            isAuthenticated={isAuthenticated}
            component={r.auth}
          />
          <PrivateRoute
            exact
            path="/signup"
            type="auth"
            isAuthenticated={isAuthenticated}
            component={r.auth}
          />
          <PrivateRoute
            exact
            path="/forgot/password"
            type="auth"
            isAuthenticated={isAuthenticated}
            component={r.auth}
          />

          {FilterDashboard(dashboardType, isAuthenticated)}

          <Route component={r.errors} />
        </Switch>
      )}
    </Router>
  );
};

const mapStateToProps = state => {
  const { isAuthenticated, action, credentials } = state.auth;
  return {
    isAuthenticated,
    actionType: action.type,
    dashboardType: credentials.type
  };
};

export default connect(mapStateToProps)(App);