import React from "react";
import Helmet from "react-helmet";
import { StyledWrapperElem } from "../../styles/dashboard/wrapper";
import DashboardSidebar from "./sidebar";
import Modal from "../modals";
import { connect } from "react-redux";

const MetaData = ({ viewName }) => {
  switch (viewName) {
    case "overview":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Overview </title>
        </Helmet>
      );

    case "projects":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Projects </title>
        </Helmet>
      );

    default:
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Dashboard </title>
        </Helmet>
      );
  }
};

const Wrapper = ({ viewName, children, modalToShow }) => {
  return (
    <StyledWrapperElem>
      <div className="xs-12 md-2" id="sdbar-wrpr">
        <DashboardSidebar />
      </div>
      <div className="xs-12 md-10" id="main-wrpr">
        <MetaData viewName={viewName} />
        <Modal name={modalToShow} />
        {children}
      </div>
    </StyledWrapperElem>
  );
};

const mapStateToProps = state => {
  return {
    modalToShow: state.dashboard.modalToShow
  };
};
export default connect(mapStateToProps)(Wrapper);
