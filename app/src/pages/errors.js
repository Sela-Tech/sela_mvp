import React from "react";

import A404 from "../shared-components/errors/a404";
import UnderConstruction from "../shared-components/errors/under-construction";

const ErrorToReturn = ({ errorName }) => {
  switch (errorName) {
    case "under-construction":
      return <UnderConstruction />;
    default:
      return <A404 />;
  }
};

const Errors = ({ errorName }) => {
  return (
    <div className="center-wrapper">
      <div className="center">
        <ErrorToReturn errorName={errorName} />
      </div>
    </div>
  );
};

export default Errors;
