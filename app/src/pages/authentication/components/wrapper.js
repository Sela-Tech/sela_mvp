import React from "react";
import Helmet from "react-helmet";
import SharedAuthWrapper from "../styles/shared.style";

const MetaData = ({ viewName }) => {
  switch (viewName) {
    case "signup":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Signup </title>
        </Helmet>
      );

    case "forgot-password":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Recover Password </title>
        </Helmet>
      );

    default:
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Signin </title>
        </Helmet>
      );
  }
};

export default ({ children, viewName }) => {
  return (
    <SharedAuthWrapper>
      <MetaData viewName={viewName} />
      {children}
    </SharedAuthWrapper>
  );
};
