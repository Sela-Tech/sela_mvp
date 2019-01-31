import React from "react";
import { connect } from "react-redux";
import VideoPlayer from "./sub-components/video-player";
import { ViewTaskWrapper } from "./styles.modals/view-task";

import MediaElement from "./sub-components/media-element";
import moment from "moment";
import { fetchTaskInfo } from "../../store/action-creators/project-funder/task";

const mapStateToProps = state => {
  const { info } = state.tasks.single;

  return {
    info,
    type: state.tasks.single.action.type,
    taskId: state.dashboard.taskId
  };
};

export default connect(mapStateToProps)(
  class ViewTask extends React.Component {
    constructor(props) {
      super(props);
      props.dispatch(fetchTaskInfo(props.taskId));
      this.state = {
        info: {}
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        if (nextProps.info) {
          if (nextProps.info.status)
            this.setState({
              info: nextProps.info,
              complete: nextProps.info.status === "COMPLETED" ? "active" : "",
              "in-progress":
                nextProps.info.status === "ASSIGNED" ||
                nextProps.info.status === "STARTED"
                  ? "active"
                  : "",
              "not-started":
                nextProps.info.status === "UNASSIGNED" ? "active" : "",
              terminated: nextProps.info.status === "TERMINATED" ? "active" : ""
            });
        }
      }
    }

    render() {
      let { info } = this.state,
        MediaElements = [];
      if (info.evaluation_submissions) {
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
      }

      // const assignedTo = Boolean(info.assignedTo) ? info.assignedTo : "-------";

      return (
        <ViewTaskWrapper className="xs-12">
          <div className="xs-12 md-6 left">
            <h2> {info.name} </h2>
            <p className="desc">{info.description}</p>
            <div className="xs-6 sm-4">
              <h4>Task Created</h4>
              <p>{moment(info.createdOn).format("MMM D, YYYY")}</p>
            </div>
            <div className=" xs-6 sm-4">
              <h4>Deadline</h4>
              <p>{moment(info.dueDate).format("MMM D, YYYY")}</p>
            </div>
{/*            
            <div className="xs-12 sm-4">
              <h4>Contractor Assigned</h4>
              <p>{assignedTo}</p>
           
            </div> */}

            <div className="xs-12 status">
          
              {/* <h4 id="stat">
                Status: <span>{info.status} </span>
              </h4> */}
          
              <div className="grey-border xs-12">
                <button className={this.state["not-started"] + " xs-12 sm-3"}>
                  Not Started
                </button>
                <button className={this.state["in-progress"] + " xs-12 sm-3"}>
                  In Progress
                </button>
                <button className={this.state["complete"] + " xs-12 sm-3"}>
                  Complete
                </button>
                <button className={this.state["terminated"] + " xs-12 sm-3"}>
                  Terminated
                </button>
              </div>
            </div>

            <div className="xs-12" id="eval-subs">
              <h3>Evaluation Submissions</h3>
              {Boolean(MediaElements.length) ? (
                MediaElements
              ) : (
                <p> No Submissions Found </p>
              )}
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
