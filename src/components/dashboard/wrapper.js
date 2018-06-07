import React from "react";
import Helmet from "react-helmet";
import { StyledWrapperElem } from "../../styles/dashboard/wrapper";
import DashboardSidebar from "./sidebar";
import Modal from "../modals";
import { connect } from "react-redux";

const MetaData = ({ viewName, projectName }) => {
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

    case "project":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Project | {projectName} </title>
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

const Wrapper = ({ viewName, children, modalToShow, projectName }) => {
  return (
    <StyledWrapperElem className="xs-12">
      <div className="xs-12 md-2" id="sdbar-wrpr">
        <DashboardSidebar />
      </div>
      <div className="xs-12 md-10 md-off-2" id="main-wrpr">
        <MetaData viewName={viewName} projectName={projectName} />
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
