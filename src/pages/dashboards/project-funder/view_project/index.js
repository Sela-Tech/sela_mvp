import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dashboard from "../../../../store/actions/project-funder/dashboard";
import { LoadingRoute } from "../../../../helpers/routes";
import Spinner from "../../../../shared-components/spinners";
import * as actions from "../../../../store/action-creators/project";
import MainViewProject from "./main";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide_loading: false
    };
    props.actions.fetchProject(props.match.params.id);
  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      let obj = {};
      if(nextProps.type === dashboard.GET_PROJ_S || nextProps.type === dashboard.GET_PROJ_F){
        obj.hide_loading = true;
      }
      this.setState(obj)
    }
  }

  render() {
    const { hide_loading } = this.state;
    switch (hide_loading) {
      case true:
      return (
          <React.Fragment>
            <MainViewProject/>
          </React.Fragment>
      );

      default:
      return <div style={{ width: "100%", height: "100vh" }}>
          <LoadingRoute>
          <Spinner type="one" />
          </LoadingRoute>   
      </div>
    }
  }
}

const mapStateToProps = state => {
  return {
    type: state.projects.single.action.type,
    info: state.projects.single.info
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
