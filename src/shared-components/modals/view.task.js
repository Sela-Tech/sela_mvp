import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "./sub-components/video-player";
import { ViewTaskWrapper } from "../../styles/dashboards/project-funder/modals/view-task";
import MediaElement from "./sub-components/media-element";
import moment from "moment";

const mapStateToProps = state => {
  const { info } = state.tasks.single;
  return {
    info
  };
};

export default connect(mapStateToProps)(
  class ViewTask extends React.Component {
    state = {
      info: {}
    };
    componentWillMount() {
      this.setState({
        info: this.props.info,
        [this.props.info.status]: "active"
      });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          info: nextProps.info,
          [nextProps.info.status]: "active"
        });
      }
    }

    render() {
      const { info } = this.state,
        MediaElements = info.evaluation_submissions.map((d, i) => {
          return (
            <MediaElement
              key={i}
              src={d.src}
              status={d.status}
              type={d.type}
              name={d.name}
            />
          );
        });
      return (
        <ViewTaskWrapper className="xs-12">
          <div className="xs-12 md-6 left">
            <h2> {info.name} </h2>
            <div className="xs-6 sm-4">
              <h4>Task Created</h4>
              <p>{moment(info.task_created).format("MMM D, YYYY")}</p>
            </div>
            <div className=" xs-6 sm-4">
              <h4>Deadline</h4>
              <p>{moment(info.deadline).format("MMM D, YYYY")}</p>
            </div>
            <div className="xs-12 sm-4">
              <h4>Contractor Assigned</h4>
              <p>{info.contractor_assigned}</p>
            </div>

            <div className="xs-12 status">
              <h4>Status</h4>
              <div className="grey-border xs-11">
                <button className={this.state["not-started"] + " xs-12 sm-4"}>
                  Not Started
                </button>
                <button className={this.state["in-progress"] + " xs-12 sm-4"}>
                  In Progress
                </button>
                <button className={this.state["complete"] + " xs-12 sm-4"}>
                  Complete
                </button>
              </div>
            </div>

            <div className="xs-12" id="eval-subs">
              <h3>Evaluation Submissions</h3>
              {MediaElements}
            </div>
          </div>
          <div className="xs-12 md-6 right grey">
            <VideoPlayer />
          </div>
        </ViewTaskWrapper>
      );
    }
  }
);
