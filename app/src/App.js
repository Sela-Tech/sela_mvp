import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import r from "./routes";

import { connect } from "react-redux";
import authActions from "./store/actions/auth";
import { LoadingRoute, PrivateRoute } from "./helpers/routes";
import Errors from "./pages/errors";
import Modals from "./shared-components/modals";
import ALlEvaluatorsSee from "./pages/authentication/components/sub/evaluator.after-signup";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ isAuthenticated, actionType, modalToShow, isEvaluator }) => {

  switch (isEvaluator && isAuthenticated) {
    case true:
   return <Router>
      <Switch>
        <Route component={ALlEvaluatorsSee}/>
      </Switch>
    </Router>    
      
    default:
    return (
      <Router>
        <React.Fragment>
          <Modals name={modalToShow} />
          <ToastContainer />
  
          {actionType === authActions.TOKEN_VERIFICATION_IN_PROGRESS ? (
            <Switch>
              <LoadingRoute />
            </Switch>
          ) : (
            <Switch>
         
              <Route exact path="/" component={r.home} />
              <Route exact path="/admin" component={r.admin} />
              <Route exact path="/admin/users/:route" component={r.admin} />
  
              <Route
                exact
                path="/projects/:id"
                component={r.public_view_project}
              />
              <Route
                exact
                path="/projects/:id/:show"
                component={r.public_view_project}
              />
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
                path="/password/reset"
                type="auth"
                isAuthenticated={isAuthenticated}
                component={r.change_password}
              />
              
              <PrivateRoute
                exact
                path="/dashboard"
                isAuthenticated={isAuthenticated}
                component={r.dashboardDecider}
              />
              <PrivateRoute
                exact
                path="/dashboard/inbox"
                isAuthenticated={isAuthenticated}
                component={r.dashboardDecider}
              />
              <PrivateRoute
                exact
                path="/dashboard/notifications"
                isAuthenticated={isAuthenticated}
                component={r.dashboardDecider}
              />
              
              
              <PrivateRoute
                exact
                path="/dashboard/help"
                isAuthenticated={isAuthenticated}
                component={r.dashboardDecider}
              />
              
              
              <PrivateRoute
                exact
                path="/dashboard/settings"
                isAuthenticated={isAuthenticated}
                component={r.dashboardDecider}
              />
              <PrivateRoute
                exact
                path="/dashboard/project/:id/:view"
                isAuthenticated={isAuthenticated}
                component={r.dashboardDecider}
              />
              <Route component={Errors} />
            </Switch>
          )}
        </React.Fragment>
      </Router>
    );
  }
  
};



const mapStateToProps = state => { 
  const { isAuthenticated, action, credentials } = state.auth;
  return {
    isEvaluator: state.auth.credentials.isEvaluator,
    isAuthenticated,
    actionType: action.type,
    dashboardType: credentials.signUpType,
    modalToShow: state.dashboard.modalToShow,
  };
};

export default connect(mapStateToProps)(App);
