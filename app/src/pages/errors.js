import React from "react";

import A404 from "../shared-components/errors/a404";
import UnderConstruction from "../shared-components/errors/under-construction";
import Navbar from "../shared-components/navbar";

const ErrorToReturn = ({ errorName }) => {
  switch (errorName) {
    case "under-construction":
      return <div className="center-wrapper">
      <div className="center">
      <UnderConstruction />
      </div>
    </div>
   
    default:
      return <A404 />;
  }
};

const Errors = ({ errorName }) => {
  return (
    <React.Fragment>
    <Navbar/>
       <ErrorToReturn errorName={errorName} />
    </React.Fragment>
  );
};

export default Errors;
