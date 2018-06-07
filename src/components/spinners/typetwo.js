import React from "react";
import styled from "styled-components";

const Div = styled.div`
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 0.85em;
    height: 0.85em;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 1em;
    height: 1em;
    border: 3px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default () => (
  <Div>
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </Div>
);
