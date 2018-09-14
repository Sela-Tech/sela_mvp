import React from "react";
import { signout } from "../../store/action-creators/auth";
import { connect } from "react-redux";

const UnderConstruction = ({ dispatch }) => {
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
        onClick={() => {
          dispatch(signout());
        }}
        style={{
          display: "block",
          margin: "2em auto"
        }}
      >
        Fine, I'll Log Out
      </button>
    </p>
  );
};

export default connect()(UnderConstruction);
