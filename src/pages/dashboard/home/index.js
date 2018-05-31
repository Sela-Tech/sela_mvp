import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

import DashboardWrapper from "../../../components/dashboard/wrapper";
import DashboardHome from "../../../components/dashboard/home";

class DashboardHomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <DashboardWrapper viewName="home">
        <DashboardHome />
      </DashboardWrapper>
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
)(DashboardHomeContainer);
