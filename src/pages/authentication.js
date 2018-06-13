import React from "react";
import Signin from "../components/authentication/signin";
import Signup from "../components/authentication/signup";
import ForgotPassword from "../components/authentication/forgot-password";
import { withRouter } from "react-router-dom";

export default withRouter(({ match }) => {
  switch (match.path) {
    case "/forgot/password":
      return <ForgotPassword />;
    case "/signup":
      return <Signup />;
    default:
      return <Signin />;
  }
});
