import React from "react";
import { connect } from "react-redux";
import AccountDetails from "../../../shared-components/dashboards/project-funder/settings/account_details";
import ChangePassword from "../../../shared-components/dashboards/project-funder/settings/change_password";
import DashboardWrapper from "../../../shared-components/dashboards/project-funder/wrapper";
import SettingsStyleWrapper from "../../../styles/dashboards/project-funder/settings";
// import { bindActionCreators } from "redux";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewing: "AccountDetails"
    };
  }

  selectView = e => {
    this.setState({
      viewing: e.target.name
    });
  };

  render() {
    return (
      <React.Fragment>
        <DashboardWrapper viewName="settings">
          <SettingsStyleWrapper className="xs-12">
            <h3>Settings</h3>
            <h5>
              Registered as: <strong>Project Funder</strong>
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
              <AccountDetails />
            ) : (
              <ChangePassword />
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
