import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardWrapper from "../../../shared-components/dashboards/project-funder/wrapper";
import * as actions from "../../../store/action-creators/project-funder/project";

import Spinner from "../../../shared-components/spinners";
import { LoadingRoute } from "../../../helpers/routes";
import dashboard from "../../../store/actions/project-funder/dashboard";
import EmptyHomeView from "./components/empty";
import NotEmptyHomeView from "./components/not-empty";

const mapStateToProps = (state, props) => {
  return {
    type: state.projects.all.action.type,
    projects: state.projects.all.collection.projects || []
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
)(
  class DashboardHomeContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.props.actions.fetchProjects();
    }

    render() {
      const { projects, type } = this.props;

      const Comp = () => {
        switch (type) {
          case dashboard.FETCHING_PROJECTS_SUCCESSFUL:
            return (
              <React.Fragment>
                {projects.length > 0 ? (
                  <NotEmptyHomeView projects={projects} />
                ) : (
                  <EmptyHomeView />
                )}
              </React.Fragment>
            );

          default:
            return (
              <div style={{ width: "100%", height: "100vh" }}>
                <LoadingRoute>
                  <Spinner type="one" />
                </LoadingRoute>
              </div>
            );
        }
      };

      return <DashboardWrapper viewName="home">{Comp()}</DashboardWrapper>;
    }
  }
);
