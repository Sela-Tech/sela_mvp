import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import DashboardWrapper from "../../../../shared-components/dashboards/project-funder/wrapper";
import dashboard from "../../../../store/actions/project-funder/dashboard";
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
      case dashboard.FETCHING_TEAM_IN_PROGRESS:
        return (
          <DashboardWrapper viewName="team" projectName={"Loading"}>
            <div style={{ width: "100%", height: "100vh" }}>
              <LoadingRoute>
                <Spinner type="one" />
              </LoadingRoute>
            </div>
          </DashboardWrapper>
        );

      case dashboard.FETCHING_TEAM_FAILED:
        return (
          <DashboardWrapper viewName="team" projectName={"No Team"}>
            {/* <NoProject /> */}
          </DashboardWrapper>
        );

      case dashboard.FETCHING_TEAM_SUCCESSFUL:
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
