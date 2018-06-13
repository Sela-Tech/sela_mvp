import React from "react";

import A404 from "../components/errors/a404";

const ErrorToReturn = ({ errorName }) => {
  switch (errorName) {
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
