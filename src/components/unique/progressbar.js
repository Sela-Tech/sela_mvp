import React from "react";
import styled from "styled-components";

const Progress = styled.div`
  width: 85%;
  margin: auto;
  position: relative;
  height: 2em;

  .bar {
    width: 100%;
    height: 2em;
    background: #eff5fb;
    border-radius: 2px;
    position: relative;
  }

  h4 {
    position: absolute;
    top: 0;
    color: ${p => (p.percentage > 30 ? "white" : "black")};
    bottom: 0;
    left: 0;
    right: 0;
    text-align: left;
    padding: 0 1.5em;
    line-height: 3em;
    font-size: 0.7em;
    font-weight: 500;
    z-index: 3;
  }

  .value {
    width: ${p => p.percentage}%;
    background: #156edc;
    height: 2em;
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

export default ({ percentage, style }) => {
  return (
    <Progress className="progress-bar" style={style} percentage={percentage}>
      <div className="bar" />
      <h4>{percentage}% funded</h4>
      <div className="value" />
    </Progress>
  );
};
