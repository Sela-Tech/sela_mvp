import React from "react";
import styled from "styled-components";
import Icon from "react-fa";
import pdf from "../../../assets/pdf.svg";
import { connect } from "react-redux";
import { watch_video } from "../../../store/action-creators/task";

const MediaElemWrapper = styled.div`
  margin-bottom: 0.5em;
  height: 6em;
  cursor: pointer;

  > div {
    background: #f2f2f2;
  }
  position: relative;

  span.s {
    height: 15px;
    width: 15px;
    position: absolute;
    top: -5px;
    right: 7%;
    font-size: 0.5em;
    color: white;
    padding: 0.3em;
    border-radius: 2em;
    z-index: 1;
  }

  .xs-11 {
    height: 100%;
    display: table;
    position: relative;

    &:hover {
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
      }
    }

    button {
      position: absolute;
      background: transparent;
      border: 0;
      font-size: 1em;
      width: 100%;
      height: 100%;
      z-index: 1;
      span {
        color: white;
        border: 2px solid white;
        border-radius: 2em;
        height: 2.25em;
        width: 2.25em;
        line-height: 2.05em;
        text-align: center;
        padding-left: 2px;
      }
    }
  }

  video {
    width: 100%;
    object-fit: contain;
    height: 100%;
  }

  .good {
    background: #6fcf97;
  }

  .bad {
    background: #eb5757;
  }

  p.name {
    font-size: 0.65em;
    text-align: center;
  }
`;

const mapStateToProps = state => {
  const { src, playing } = state.tasks.single.video_to_watch;
  return {
    redux_src: src,
    redux_playing: playing
  };
};

export default connect(mapStateToProps)(
  ({ src, status, poster, type, name, dispatch, redux_src, redux_playing }) => {
    const iconPicker = () => {
      if (redux_playing === true) {
        if (src === redux_src) {
          return <Icon name="pause" />;
        }
      } else {
        return <Icon name="play" />;
      }
    };

    switch (type) {
      case "document":
        return (
          <MediaElemWrapper
            className="xs-6 sm-3"
            onClick={() => window.open(src, "_blank")}
          >
            {status === "good" ? (
              <Icon className="s good" name="check" />
            ) : (
              <Icon className="s bad" name="exclamation" />
            )}
            <div className="xs-11">
              <div className="center">
                <img src={pdf} alt="" />
                <p className="name">{name}</p>
              </div>
            </div>
          </MediaElemWrapper>
        );
      default:
        return (
          <MediaElemWrapper className="xs-6 sm-3">
            {status === "complete" ? (
              <Icon className="s good" name="check" />
            ) : (
              <Icon className="s bad" name="exclamation" />
            )}
            <div className="xs-11">
              <button onClick={() => dispatch(watch_video(src))}>
                {iconPicker()}
              </button>
              <video poster={poster} src={src} />
            </div>
          </MediaElemWrapper>
        );
    }
  }
);
