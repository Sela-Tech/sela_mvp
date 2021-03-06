import React from "react";
import styled from "styled-components";
import Icon from "react-fa";
import pdf from "../../../assets/pdf.svg";
import { connect } from "react-redux";
import { watch_video } from "../../../store/action-creators/project-funder/task";
import Spinner from "../../spinners";

const MediaElemWrapper = styled.div`
  .loading{
    position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #999;
      z-index: 1;
  }
  }
  margin-bottom: 0.5em;
  height: 10em;
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
    z-index: 2;
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
      left: 0;
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

  .good {
    background: #6fcf97;
  }

  .bad {
    background: #eb5757;
  }

  p.name {
    font-size: 0.65em !important;
    text-align: center !important;
    margin: auto;
    padding: auto;
  }

  text-align: center;

  img, video{
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
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
  class Mediaelement extends React.Component {
    state = {
      videoLoaded: false,
      state: "not-playing",
      hide: false
    };

    togglePlayer = () => {
      const { redux_playing, redux_src, src, dispatch } = this.props;
      if (src === redux_src) {
        dispatch(watch_video(src, !redux_playing));
      } else {
        dispatch(watch_video(src, true));
      }
    };

    cbSuccess = () => {
      this.setState({
        videoLoaded: true
      });
    };

    cbFailed = () => {
      this.setState({
        hide: true
      });
    };

    componentDidMount(){
      const v = this.refs.media;
      //make sure the video exists before listening
      if (v) {
        v.addEventListener("loadeddata", this.cbSuccess);
        v.addEventListener("error", this.cbFailed);
      }
    }

    componentWillUnmount(){
      const v = this.refs.media;
      if (v) {
        //remove the listeners when component is dropped
        v.removeEventListener("loadeddata", this.cbSuccess);
        v.removeEventListener("error", this.cbFailed);
      }
    }

    render(){

      const { status, type, name, src } = this.props;
      // iconPicker = redux_playing === true ?  
      // src === redux_src  ? <Icon name = "pause" /> : <Icon name="play" />  :  <Icon name="play" />;
      switch (type) {

        case "table":
          return (
            <MediaElemWrapper className="xs-6 sm-3" onClick={() => window.open(src, "_blank")}>
              {status === "good" ? ( <Icon className="s good" name="check" /> ) : (  <Icon className="s bad" name="exclamation" />  )}
              <div className="xs-11">
                <div className="center">
                  <img src={pdf} alt="" />
                  <p className="name">{name}</p>
                </div>
              </div>
            </MediaElemWrapper>
          );

        default:
          if (this.state.hide === false) {
            return (
              <MediaElemWrapper className="xs-6 sm-3">
                {/* {status === "complete" ? ( <Icon className="s good" name="check" /> ) : ( <Icon className="s bad" name="exclamation" /> )} */}
                <div className="xs-11">
                  {/* <button onClick={this.togglePlayer}>{iconPicker}</button> */}
                  {this.state.videoLoaded === false && (
                    <div className="loading">
                      <div className="center-wrapper">
                        <div className="center">
                          <Spinner type="two" />
                        </div>
                      </div>
                    </div>
                  )}
                  <img src={src} ref={"media"} alt='' onLoad={this.cbSuccess  } />
                </div>
              </MediaElemWrapper>
            );
          }

          return null;
      }
    }
  }
);
