import React from "react";
import { connect } from "react-redux";
import TaskStyle from "./tasks.style";
import moment from "moment";

class Tasks extends React.Component {
  state = {
    date: ""
  };

  render() {
    // const { date } = this.state;

    return (
      <TaskStyle className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l c-sm-screen">
            <h3>Tasks</h3>
          </div>

          <div className="f-r c-sm-screen">
            <button className="blue-btn"> Add Task</button>
          </div>
        </div>

        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
            <div className="xs-12 sm-2">
              <h4> Status</h4>
            </div>
            <div className="xs-12 sm-7">
              <h4> Task Details</h4>
            </div>

            <div className="xs-12 sm-3">
              <h4> Deadline </h4>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-2">
              <button className="completed">Completed</button>
            </div>
            <div className="xs-12 sm-7">
              <h3>Transaction Memo Listed Here</h3>
              <p>Task description</p>
            </div>

            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-2">
              <button className="ongoing">On-going</button>
            </div>
            <div className="xs-12 sm-7">
              <h3>Transaction Memo Listed Here</h3>
              <p>Task description</p>
            </div>

            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>
          <div className="xs-12 row b">
            <div className="xs-12 sm-2">
              <button className="not-started">Not Started</button>
            </div>
            <div className="xs-12 sm-7">
              <h3>Transaction Memo Listed Here</h3>
              <p>Task description</p>
            </div>

            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>
        </div>
      </TaskStyle>
    );
  }
}

export default connect()(Tasks);
