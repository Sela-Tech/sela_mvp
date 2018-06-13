import React from "react";
import Helmet from "react-helmet";
import { StyledWrapperElem } from "../../styles/dashboards/project-funder/wrapper";
import DashboardSidebar from "./blank-sidebar";
import SpinnerTypeone from "../spinners/typeone";
import LoadingRoute from "../../helpers/loadingRoute";

export default () => {
  return (
    <StyledWrapperElem className="xs-12">
      <div className="xs-12 md-2" id="sdbar-wrpr">
        <DashboardSidebar />
      </div>
      <div className="xs-12 md-10 md-off-2" id="main-wrpr">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Sela - Home | Dashboard </title>
        </Helmet>

        <div style={{ width: "100%", height: "100vh" }}>
          <LoadingRoute>
            <SpinnerTypeone />
          </LoadingRoute>
        </div>
      </div>
    </StyledWrapperElem>
  );
};
