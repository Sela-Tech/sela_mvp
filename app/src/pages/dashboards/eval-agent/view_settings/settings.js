import React from "react";
import { connect } from "react-redux";
import AccountDetails from "../../shared/settings/account_details";
import ChangePassword from "../../shared/settings/change_password";
import DashboardWrapper from "../../shared/container/wrapper";
import SettingsStyleWrapper from "../../../../styles/dashboards/project-funder/settings";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewing: "AccountDetails",
      userType: this.props.userType
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        userType: nextProps.userType
      });
    }
  }
  selectView = e => {
    this.setState({
      viewing: e.target.name
    });
  };

  render() {
    const { userType } = this.state;

    return (
      <React.Fragment>
        <DashboardWrapper viewName="settings">
          <SettingsStyleWrapper className="xs-12">
            <h3>Settings</h3>
            <h5>
              Registered as: <strong>{userType}</strong>
            </h5>

            <div id="options">
              <button
                className="select"
                autoFocus
                onClick={this.selectView}
                name="AccountDetails"
              >
                Account Details
              </button>
              <button
                className="select"
                onClick={this.selectView}
                name="ChangePassword"
              >
                Change Password
              </button>
            </div>

            {this.state.viewing === "AccountDetails" ? (
              <AccountDetails viewing={this.state.viewing} />
            ) : (
              <ChangePassword viewing={this.state.viewing} />
            )}
            <div className="xs-12">
              <button id="de-activate"> De-activate your account </button>
            </div>
          </SettingsStyleWrapper>
        </DashboardWrapper>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state, props) => {
  let { isFunder, isContractor, isEvaluator } = state.auth.credentials;

  return {
    userType:
      (isFunder === true && "Project Funder") ||
      (isContractor === true && "Project Contractor") ||
      (isEvaluator === true && "Project Evaluator")
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
