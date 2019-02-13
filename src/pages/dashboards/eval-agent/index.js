// import React from "react";
import { withRouter } from "react-router";

export default withRouter(props => {
  const pathname = props.match.path;
  switch (pathname) {
    default:
      return null;
  }
});
