import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import DashboardWrapper from "../../shared/container/wrapper";
import dashboard from "../../../../store/actions/dashboard";
import { LoadingRoute } from "../../../../helpers/routes";
import Spinner from "../../../../shared-components/spinners";
import ProjectComponent from "./main.js";
import * as actions from "../../../../store/action-creators/project";
import NoProject from "../../../../shared-components/errors/noProject";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.actions.fetchProject(this.props.match.params.id);
  }

  render() {
    const { project_info, project_action_type } = this.props;
    switch (project_action_type) {
      case dashboard.GET_PROJ_R:
        return (
          <DashboardWrapper viewName="project" projectName={"Loading"}>
            <div style={{ width: "100%", height: "100vh" }}>
              <LoadingRoute>
                <Spinner type="one" />
              </LoadingRoute>
            </div>
          </DashboardWrapper>
        );

      case dashboard.GET_PROJ_F:
        return (
          <DashboardWrapper viewName="project" projectName={"No Project"}>
            <NoProject />
          </DashboardWrapper>
        );

      case dashboard.GET_PROJ_S:
        if (Object.keys(project_info).length === 0) {
          return (
            <DashboardWrapper viewName="project" projectName={"No Project"}>
              <NoProject />
            </DashboardWrapper>
          );
        }

        return (
          <DashboardWrapper
            viewName="project"
            projectName={project_info.name || "Project Name"}
          >
            <ProjectComponent info={project_info} />
          </DashboardWrapper>
        );

      default:
        return <DashboardWrapper viewName="project" projectName={"Loading"} />;
    }
  }
}
const mapStateToProps = state => {
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
