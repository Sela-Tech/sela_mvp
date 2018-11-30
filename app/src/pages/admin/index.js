import React from "react";
import { connect } from "react-redux";
import Signin from "../authentication/components/signin";
import AdminDashboard from "./dashboard";

class AdminPage extends React.Component {
  render() {
    const { isAdmin, isAuthenticated } = this.props;
    switch (isAdmin && isAuthenticated) {
      case true:
        return <AdminDashboard />;
      default:
        return <Signin admin={true} />;
    }
  }
}

export const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.admin.isAdminLoggedIn || state.auth.credentials.isAdmin
  };
};

export default connect(mapStateToProps)(AdminPage);
