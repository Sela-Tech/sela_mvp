import React from "react";
import RightPaneStyle from "./right.pane.style";
import SimpleMap from "./map";
import { connect } from "react-redux";
import { toggleFullScreen } from "../../../../store/action-creators/homepage";

class RightPane extends React.Component {
  render() {
    const { className } = this.props;
    return (
      <RightPaneStyle className={className}>
        <SimpleMap {...this.props} />
      </RightPaneStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.home.projects,
    centerize: state.home.centerize,
    fullscreen: state.home.map.fullscreen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleFullScreen: () => dispatch(toggleFullScreen)
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightPane);
