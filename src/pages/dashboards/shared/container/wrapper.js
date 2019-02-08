import React from "react";
import Helmet from "react-helmet";
import { StyledWrapperElem } from "./wrapper.style";
import DashboardSidebar from "./sidebar";
import connect from "react-redux/lib/connect/connect";

const MetaData = ({ viewName, projectName }) => {
  switch (viewName) {
    case "overview":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Overview </title>
        </Helmet>
      );

    case "settings":
      return (
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Settings </title>
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

const Wrapper = ({ viewName, children, projectName }) => {
  return (
    <StyledWrapperElem className="xs-12">
      <MetaData viewName={viewName} projectName={projectName} />
       
      <div className="xs-12 md-2" id="sdbar-wrpr">
        <DashboardSidebar />
      </div>
      <div className="xs-12 md-10 md-off-2" id="main-wrpr">
        {children}
      </div>
    </StyledWrapperElem>
  );
};

const mapStateToProps = state => {
  return {
    modalToShow: state.modal.modalToShow
  };
};
export default connect(mapStateToProps)(Wrapper);
