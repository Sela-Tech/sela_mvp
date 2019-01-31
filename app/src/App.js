import React, { Suspense, lazy } from 'react';
import { Switch, Route, BrowserRouter as Router, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import authActions from "./store/actions/auth";
import { LoadingRoute, PrivateRoute } from "./helpers/routes";

import Error404 from "./pages/error404";
import Modals from "./shared-components/modals";
import 'react-toastify/dist/ReactToastify.css';
import loadable from "loadable-components";
import Blank from "./pages/dashboards/blank/";
import NotLoggedIn from "./pages/public/loading/generic";
import signin from "./pages/authentication/components/signin";
import forgot_password from "./pages/authentication/components/forgot-password";
import email_verification from "./pages/authentication/components/email-verification";

import home from './pages/public/home';
import ErrorBoundary from './error.boundary';

const change_password = lazy(()=> import("./pages/authentication/components/change-password"));
const signup = lazy(()=> import("./pages/authentication/components/signup"));
const public_view_project = lazy(() => import('./pages/public/projects/view-project'));
const dashboard_decider = loadable(() => import("./pages/dashboards/"), {
    LoadingComponent: Blank
  });
const evaluator_default_page = lazy(()=> import("./pages/authentication/components/sub/evaluator.after-signup"));


const App = ({ isAuthenticated, actionType, isEvaluator }) => {
  switch (isEvaluator && isAuthenticated) {
    case true:
   return <Router>
      <Suspense fallback={<NotLoggedIn/>}>
      <Switch>
        <Route component={withRouter(evaluator_default_page)}/>
      </Switch>
      </Suspense>
    </Router>    
      
    default:
    return (
      
          <Router>
            <React.Fragment>
              <ErrorBoundary>
                <Modals />
                <Suspense fallback={<NotLoggedIn/>}>
                {actionType === authActions.TOKEN_VERIFICATION_R ? (
                  <Switch>
                    <LoadingRoute />
                  </Switch>
                ) : (
                  <Switch>
              
                    <Route exact path="/" component={home} />
                    
                    <Route
                      exact
                      path="/email/verify"
                      component={email_verification}
                    />
                    
                    <Route
                      exact
                      path="/projects/:id"
                      component={withRouter(public_view_project)}
                    />

                    <Route
                      exact
                      path="/projects/:id/:show"
                      component={withRouter(public_view_project)}
                    />

                    <PrivateRoute
                      exact
                      path="/signin"
                      type="auth"
                      isAuthenticated={isAuthenticated}
                      component={signin}
                    />

                    <PrivateRoute
                      exact
                      path="/signup"
                      type="auth"
                      isAuthenticated={isAuthenticated}
                      component={signup}
                    />

                    <PrivateRoute
                      exact
                      path="/forgot/password"
                      type="auth"
                      isAuthenticated={isAuthenticated}
                      component={forgot_password}
                    />
                    
                    <PrivateRoute
                      exact
                      path="/password/reset"
                      type="auth"
                      isAuthenticated={isAuthenticated}
                      component={change_password}
                    />
                    
                    <PrivateRoute
                      exact
                      path="/dashboard"
                      isAuthenticated={isAuthenticated}
                      component={dashboard_decider}
                    />

                    <PrivateRoute
                      exact
                      path="/dashboard/inbox"
                      isAuthenticated={isAuthenticated}
                      component={dashboard_decider}
                    />
                    <PrivateRoute
                      exact
                      path="/dashboard/notifications"
                      isAuthenticated={isAuthenticated}
                      component={dashboard_decider}
                    />
                    
                    <PrivateRoute
                      exact
                      path="/dashboard/help"
                      isAuthenticated={isAuthenticated}
                      component={dashboard_decider}
                    />
                    
                    <PrivateRoute
                      exact
                      path="/dashboard/settings"
                      isAuthenticated={isAuthenticated}
                      component={dashboard_decider}
                    />

                    <PrivateRoute
                      exact
                      path="/dashboard/project/:id/:view"
                      isAuthenticated={isAuthenticated}
                      component={dashboard_decider}
                    />

                    <Route component={Error404} />
                  </Switch>
                )}
              </Suspense>
              </ErrorBoundary>
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
    dashboardType: credentials.signUpType
    };
};

export default connect(mapStateToProps)(App);
