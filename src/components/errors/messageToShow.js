import React from "react";
import styled from "styled-components";

export default ({ message, type, match }) => {
  switch (message === undefined) {
    case false:
      const color = type.includes("SUCCESSFUL") ? "#3dcc4a" : "#f54e23c7";

      const P = styled.p`
        background: ${color};
        text-align: center;
        margin: 0.25em 0 1.25em;
        font-size: 1em;
        color: white;
        padding: 10px 25px;
        border-radius: 6px;
      `;
      return <P className="xs-12">{message}</P>;
    default:
      return null;
  }
};
