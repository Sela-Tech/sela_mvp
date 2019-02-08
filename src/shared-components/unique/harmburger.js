import React from "react";
import styled from "styled-components";

const Hamwrap = styled.div`
  cursor: pointer;
  position: relative;
  top: -0.5em;
  right: 0.5em;

  .hamburger {
    -webkit-transform: scale(1);
    transform: scale(1);
    position: relative;
    display: block;
    width: 5.5em;
    height: 5.5em;
    background: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  svg {
    height: 5.5em;
    width: 5.5em;
  }

  .burger-main {
    position: absolute;
    padding: 0;
    top: 20px;
    left: 16px;
    height: 5.5em;
    width: 5.5em;
  }

  .burger-inner {
    position: relative;
    height: 28px;
    width: 36px;
  }

  .burger-main span {
    position: absolute;
    display: block;
    height: 4px;
    width: 36px;
    border-radius: 2px;
    background: #156edc;
  }

  .top {
    top: 0;
    transform-origin: 34px 2px;
  }

  .bot {
    bottom: 0;
    transform-origin: 34px 2px;
  }

  .mid {
    top: 12px;
  }

  .svg-main {
    position: absolute;
    top: 0;
    left: 0;
    width: 5.5em;
    height: 5.5em;
  }

  .circle {
    width: 5.5em;
    height: 5.5em;
  }

  .path {
    stroke-dasharray: 240;
    stroke-dashoffset: 240;
    stroke-linejoin: round;
  }

  .hamburger.open .path {
    animation: dash-in 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.closed .path {
    animation: dash-out 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.open .top {
    animation: close-top-out 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.open .bot {
    animation: close-bot-out 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.closed .top {
    animation: close-top-in 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.closed .bot {
    animation: close-bot-in 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.open .mid {
    animation: burger-fill-out 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.closed .mid {
    animation: burger-fill-in 0.6s linear normal;
  }

  .path-burger {
    position: absolute;
    top: 0;
    left: 0;
    height: 5.5em;
    width: 5.5em;
    -webkit-mask: url(#mask);
    mask: url(#mask);
  }

  .animate-path {
    position: absolute;
    top: 0;
    left: 0;
    width: 5.5em;
    height: 5.5em;
  }

  .path-rotation {
    height: 34px;
    width: 34px;
    margin: 34px 34px 0 0;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
  }

  .path-rotation:before {
    content: "";
    display: block;
    width: 30px;
    height: 34px;
    margin: 0 4px 0 0;
    background: #fff;
  }

  .hamburger.open .animate-path {
    animation: circle-in 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  .hamburger.closed .animate-path {
    animation: circle-out 0.6s linear normal;
    animation-fill-mode: forwards;
  }

  @-webkit-keyframes dash-in {
    0% {
      stroke-dashoffset: 240;
    }

    40% {
      stroke-dashoffset: 240;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes dash-in {
    0% {
      stroke-dashoffset: 240;
    }

    40% {
      stroke-dashoffset: 240;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @-webkit-keyframes dash-out {
    0% {
      stroke-dashoffset: 0;
    }

    40% {
      stroke-dashoffset: 240;
    }

    100% {
      stroke-dashoffset: 240;
    }
  }

  @keyframes dash-out {
    0% {
      stroke-dashoffset: 0;
    }

    40% {
      stroke-dashoffset: 240;
    }

    100% {
      stroke-dashoffset: 240;
    }
  }

  @keyframes close-top-out {
    0% {
      left: 0;
      top: 0;
      transform: rotate(0deg);
    }

    20% {
      left: 0;
      top: 0;
      transform: rotate(15deg);
    }

    80% {
      left: -5px;
      top: 0;
      transform: rotate(-60deg);
    }

    100% {
      left: -5px;
      top: 1px;
      transform: rotate(-45deg);
    }
  }

  @keyframes close-bot-out {
    0% {
      left: 0;
      transform: rotate(0deg);
    }

    20% {
      left: 0;
      transform: rotate(-15deg);
    }

    80% {
      left: -5px;
      transform: rotate(60deg);
    }

    100% {
      left: -5px;
      transform: rotate(45deg);
    }
  }

  @keyframes close-top-in {
    0% {
      left: -5px;
      bot: 0;
      transform: rotate(-45deg);
    }

    20% {
      left: -5px;
      bot: 0;
      transform: rotate(-60deg);
    }

    80% {
      left: 0;
      bot: 0;
      transform: rotate(15deg);
    }

    100% {
      left: 0;
      bot: 1px;
      transform: rotate(0deg);
    }
  }

  @keyframes close-bot-in {
    0% {
      left: -5px;
      transform: rotate(45deg);
    }

    20% {
      left: -5px;
      transform: rotate(60deg);
    }

    80% {
      left: 0;
      transform: rotate(-15deg);
    }

    100% {
      left: 0;
      transform: rotate(0deg);
    }
  }

  @keyframes burger-fill-in {
    0% {
      width: 0;
      left: 36px;
    }

    40% {
      width: 0;
      left: 40px;
    }

    80% {
      width: 36px;
      left: -6px;
    }

    100% {
      width: 36px;
      left: 0px;
    }
  }

  @keyframes burger-fill-out {
    0% {
      width: 36px;
      left: 0px;
    }

    20% {
      width: 42px;
      left: -6px;
    }

    40% {
      width: 0;
      left: 40px;
    }

    100% {
      width: 0;
      left: 36px;
    }
  }
  @keyframes circle-out {
    0% {
      transform: rotate(0deg);
    }

    40% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes circle-in {
    0% {
      transform: rotate(360deg);
    }

    40% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
`;

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      closed: true,
      className: "closed"
    };
  }

  handleClick = () => {
    this.props.onClick();
    this.setState(p => {
      return {
        closed: !p.closed,
        className: this.state.closed === true ? "open" : "closed"
      };
    });
  };

  render() {
    return (
      <Hamwrap>
        <div
          className={`hamburger ${this.state.className}`}
          onClick={this.handleClick}
        >
          <div className="burger-main">
            <div className="burger-inner">
              <span className="top" />
              <span className="mid" />
              <span className="bot" />
            </div>
          </div>

          <div className="svg-main">
            <svg className="svg-circle">
              <path
                className="path"
                fill="none"
                stroke="#fff"
                strokeMiterlimit="10"
                strokeWidth="4"
                d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"
              />
            </svg>
          </div>
          <div className="path-burger">
            <div className="animate-path">
              <div className="path-rotation" />
            </div>
          </div>
        </div>
      </Hamwrap>
    );
  }
}
