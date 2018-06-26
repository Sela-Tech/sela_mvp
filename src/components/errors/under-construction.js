import React from "react";
import history from "../../helpers/history";

const UnderConstruction = () => {
  return (
    <p
      className="xs-10 xs-off-1 sm-6 sm-off-3 md-4 md-off-4"
      style={{
        color: "#333"
      }}
    >
      Something silly just happened. The dashboard u've requested is probably
      still under construction or us developers are still fighting the good
      battle with the codebase. Come back later. :)
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

export default UnderConstruction;
