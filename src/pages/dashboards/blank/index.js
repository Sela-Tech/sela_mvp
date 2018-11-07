import React from "react";
import Helmet from "react-helmet";
import { StyledWrapperElem } from "../shared/container/wrapper.style";
import DashboardSidebar from "./blank-sidebar";
import Spinner from "../../../shared-components/spinners";

import { LoadingRoute } from "../../../helpers/routes";

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
            <Spinner type="one" />
          </LoadingRoute>
        </div>
      </div>
    </StyledWrapperElem>
  );
};
