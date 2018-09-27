import React from "react";
import RightPaneStyle from "./right.pane.style";
import SimpleMap from "./map";
import { connect } from "react-redux";

class RightPane extends React.Component {
  render() {
    return (
      <RightPaneStyle className="xs-12 sm-6">
        <SimpleMap projects={this.props.projects} />
      </RightPaneStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.home.projects
  };
};

export default connect(mapStateToProps)(RightPane);
