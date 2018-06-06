import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardWrapper from "../../../components/dashboard/wrapper";
import * as actions from "../../../store/action-creators/dashboard/home";
import NotEmptyHomeView from "../../../components/dashboard/home/not-empty";
import EmptyHomeView from "../../../components/dashboard/home/empty";
import dashboard from "../../../store/actions/dashboard";
import LoadingRoute from "../../../helpers/loadingRoute";
import SpinnerTypeone from "../../../components/spinners/typeone";

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
          <div style={{width: "100%",height: "100vh"}}>
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
    project_action_type: state.dashboard.projects.action.type,
    projects: state.dashboard.projects.collection
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
