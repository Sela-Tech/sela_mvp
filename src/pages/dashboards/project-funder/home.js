import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardWrapper from "../../../components/dashboards/project-funder/wrapper";
import * as actions from "../../../store/action-creators/project-funder/project";

import SpinnerTypeone from "../../../components/spinners/typeone";
import LoadingRoute from "../../../helpers/loadingRoute";
import dashboard from "../../../store/actions/project-funder/dashboard";
import EmptyHomeView from "../../../components/dashboards/project-funder/home/empty";
import NotEmptyHomeView from "../../../components/dashboards/project-funder/home/not-empty";

class DashboardHomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.actions.fetchProjects();
  }

  render() {
    const { projects, project_action_type } = this.props;

    switch (project_action_type) {
      case dashboard.FETCHING_PROJECTS_IN_PROGRESS:
        return (
          <DashboardWrapper viewName="home">
            <div style={{ width: "100%", height: "100vh" }}>
              <LoadingRoute>
                <SpinnerTypeone />
              </LoadingRoute>
            </div>
          </DashboardWrapper>
        );
      default:
        return (
          <DashboardWrapper viewName="home">
            {projects.length > 0 ? (
              <NotEmptyHomeView projects={projects} />
            ) : (
              <EmptyHomeView />
            )}
          </DashboardWrapper>
        );
    }
  }
}
const mapStateToProps = (state, props) => {
  return {
    project_action_type: state.projects.all.action.type,
    projects: state.projects.all.collection
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
)(DashboardHomeContainer);
