import React from "react";
import history from "../../helpers/history";

const Error404 = () => {
  return (
    <p
      style={{
        color: "#333"
      }}
    >
      This is a 404
      <button
        onClick={() => history.goBack()}
        style={{
          display: "block",
          margin: "auto"
        }}
      >
        Go Back
      </button>
    </p>
  );
};

export default Error404;
