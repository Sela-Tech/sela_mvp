import React from "react";
import ViewAllProjectStyles from "./view-all-projects.style";
import { connect } from "react-redux";

class ViewAllProjects extends React.Component {
  render() {
    return <ViewAllProjectStyles className="xs-12 sm-6" />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(ViewAllProjects);
