import React, { Suspense, lazy, Component } from 'react';
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
import { fetchOrganizations } from './store/action-creators/organizations';
import Walkthrough from './shared-components/modals/walkthrough.modal';

const change_password = lazy(()=> import("./pages/authentication/components/change-password"));
const signup = lazy(()=> import("./pages/authentication/components/signup"));
const public_view_project = lazy(() => import('./pages/public/projects/view-project'));
const dashboard_decider = loadable(() => import("./pages/dashboards/"), {
    LoadingComponent: Blank
  });
const evaluator_default_page = lazy(()=> import("./pages/authentication/components/sub/evaluator.after-signup"));
let pulled_organization = false;

const append = () => {
  const script = document.createElement("script");
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDRMWoNjCQp00UvNO7xWxK4DWy_H34Ov8I&libraries=places";
  script.async = true;
  document.body.appendChild(script);
};

const App = class extends Component{
  constructor(props){
    super(props); 
    
    if(props.isAuthenticated){      
      if(window.location.pathname !== "/"){
        if(!window.google){
          append();
        }else if(!window.google.places){
          append();
        }
      }
    } 
   if(pulled_organization === false){
      this.props.dispatch(fetchOrganizations());
      pulled_organization = true;
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      if(nextProps.isAuthenticated){
        if(window.location.pathname !== "/"){
          if(!window.google){
            append();
          }else if(!window.google.places){
            append();
          }
        }
      } 
    }
  }

  render(){
    const { isAuthenticated, actionType, isEvaluator } = this.props;
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
                        path="/dashboard/wallet/:id"
                        isAuthenticated={isAuthenticated}
                        component={dashboard_decider}
                      />
                      <PrivateRoute
                        path="/dashboard/wallet/native/:id"
                        isAuthenticated={isAuthenticated}
                        component={dashboard_decider}
                      />
                      <PrivateRoute
                        path="/dashboard/wallet"
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
                        path="/dashboard/project/preview/:id"
                        isAuthenticated={isAuthenticated}
                        component={dashboard_decider}
                      />

                      <PrivateRoute
                        exact
                        path="/dashboard/project/:id/:view"
                        isAuthenticated={isAuthenticated}
                        component={dashboard_decider}
                      />

                      <PrivateRoute
                        exact
                        path="/dashboard/proposal/new/:project_id"
                        isAuthenticated={isAuthenticated}
                        component={dashboard_decider}
                      />

                      <PrivateRoute
                        exact
                        path="/dashboard/proposal/new/:project_id/s"
                        isAuthenticated={isAuthenticated}
                        component={dashboard_decider}
                      />


                      <PrivateRoute
                        exact
                        path="/dashboard/proposal/:proposal_id"
                        isAuthenticated={isAuthenticated}
                        component={dashboard_decider}
                      />
                      
                      <Route component={Error404} />
                    </Switch>
                  )}
                </Suspense>
                </ErrorBoundary>
                {isAuthenticated &&
                  <Walkthrough/>
                }
            
              </React.Fragment>
            </Router>
      );
    } 
  };
}

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
