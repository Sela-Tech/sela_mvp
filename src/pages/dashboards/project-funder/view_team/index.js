import React from "react";
import  connect  from "react-redux/lib/connect/connect";
import DashboardWrapper from "../../../../shared-components/dashboards/project-funder/wrapper";
import dashboard from "../../../../store/actions/dashboard";
import { LoadingRoute } from "../../../../helpers/routes";
import Spinner from "../../../../shared-components/spinners";

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { team_info, team_action_type } = this.props;
    switch (team_action_type) {
      case dashboard.GET_TEAM_R:
        return (
          <DashboardWrapper viewName="team" projectName={"Loading"}>
            <div style={{ width: "100%", height: "100vh" }}>
              <LoadingRoute>
                <Spinner type="one" />
              </LoadingRoute>
            </div>
          </DashboardWrapper>
        );

      case dashboard.GET_TEAM_F:
        return (
          <DashboardWrapper viewName="team" projectName={"No Team"}>
            {/* <NoProject /> */}
          </DashboardWrapper>
        );

      case dashboard.GET_TEAM_S:
        if (Object.keys(team_info).length === 0) {
          return (
            <DashboardWrapper viewName="team" projectName={"No Team"}>
              {/* <NoProject /> */}
            </DashboardWrapper>
          );
        }

        return (
          <DashboardWrapper
            viewName="team"
            projectName={team_info.name || "Team"}
          >
            {/* <ProjectComponent info={team_info} /> */}
          </DashboardWrapper>
        );

      default:
        return <DashboardWrapper viewName="team" projectName={"Loading"} />;
    }
  }
}
const mapStateToProps = state => {
  return {
    team_action_type: "", //state.team.single.action.type,
    team_info: {} //state.team.single.info
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);
