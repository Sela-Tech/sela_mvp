import React from "react";
import styled from "styled-components";
import Icon from "react-fa";
import { connect } from "react-redux";
import { watch_video, clear_video } from "../../../store/action-creators/task";

Object.defineProperty(HTMLMediaElement.prototype, "playing", {
  get: function() {
    return !!(
      this.currentTime > 0 &&
      !this.paused &&
      !this.ended &&
      this.readyState > 2
    );
  }
});

const VideoPlayerWrapper = styled.div`
  video {
    width: 100%;
    height: 20em;
    object-fit: contain;
    background: #888;
  }

  position: relative;

  &:hover {
    button {
      display: block !important;
    }
  }

  &.playing {
    button {
      display: none;
    }
  }

  button {
    color: white;
    border: 0;
    background: transparent;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    span {
      color: white;
      font-size: 4em;
    }
  }
`;

const mapStateToProps = state => {
  return {
    src: state.tasks.single.video_to_watch.src,
    playing: state.tasks.single.video_to_watch.playing
  };
};

export default connect(mapStateToProps)(
  class VideoPlayer extends React.Component {
    state = {
      playing: false
    };

    componentDidMount() {
      const v = this.refs.video;
      v.addEventListener("timeupdate", this.playListener);
    }

    play_pause = () => {
      const v = this.refs.video;
      v.paused ? v.play() : v.pause();
    };

    playListener = v => {
      this.setState({
        playing: v.target.playing
      });
    };

    componentWillUpdate(nextProps, nextState) {
      if (this.state.playing !== nextState.playing) {
        this.props.dispatch(watch_video(nextState.src, nextState.playing));
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState(
          {
            src: nextProps.src
          },
          () => {
            if (nextProps.playing === false) {
              this.refs.video.pause();
            } else {
              this.refs.video.play();
            }
          }
        );
      }
    }
    componentWillUnmount() {
      const v = this.refs.video;
      v.removeEventListener("timeupdate", this.playListener);
      this.props.dispatch(clear_video());
    }

    render() {
      let { poster } = this.props,
        { src } = this.state;

      return (
        <VideoPlayerWrapper
          className={this.state.playing ? "playing xs-12" : "xs-12"}
        >
          <button onClick={this.play_pause}>
            {this.state.playing ? <Icon name="pause" /> : <Icon name="play" />}
          </button>

          <video autoPlay={false} ref="video" poster={poster} src={src} />
        </VideoPlayerWrapper>
      );
    }
  }
);
