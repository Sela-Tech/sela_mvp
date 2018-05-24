import React from "react";

import Login from "../../components/authentication/signin";
import Signup from "../../components/authentication/signup";
import ForgotPassword from "../../components/authentication/forgot-password";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Helmet from "react-helmet";

import detectAuthType from "../../helpers/detect-auth-type";

export default ({ match }) => {
  return [
    <Helmet key={1}>
      <meta charSet="utf-8" />
      <title> Sela - {detectAuthType(match)} </title>
    </Helmet>,
    <Router key={2}>
      <Switch>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </Router>
  ];
};
