import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardWrapper from "../../components/dashboard/wrapper";
import dashboard from "../../store/actions/dashboard";
import LoadingRoute from "../../helpers/loadingRoute";
import SpinnerTypeone from "../../components/spinners/typeone";
import ProjectComponent from "../../components/dashboard/project";
import * as actions from "../../store/action-creators/project";
import NoProject from "../../components/errors/noProject";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.actions.fetchProject(this.props.match.params.id);
  }

  render() {
    const { project_info, project_action_type } = this.props;

    switch (project_action_type) {
      case dashboard.FETCHING_PROJECT_IN_PROGRESS:
        return (
          <DashboardWrapper viewName="project" projectName={"Loading"}>
            <div style={{ width: "100%", height: "100vh" }}>
              <LoadingRoute>
                <SpinnerTypeone />
              </LoadingRoute>
            </div>
          </DashboardWrapper>
        );

      case dashboard.FETCHING_PROJECT_FAILED:
        return (
          <DashboardWrapper viewName="project" projectName={"No Project"}>
            <NoProject />
          </DashboardWrapper>
        );
      default:
        return (
          <DashboardWrapper
            viewName="project"
            projectName={project_info.name || "Project Name"}
          >
            <ProjectComponent info={project_info} />
          </DashboardWrapper>
        );
    }
  }
}
const mapStateToProps = (state, props) => {
  return {
    project_action_type: state.projects.single.action.type,
    project_info: state.projects.single.info
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
