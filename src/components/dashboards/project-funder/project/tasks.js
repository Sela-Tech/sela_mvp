import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import modals from "../../../../store/actions/project-funder/modals";
import {
  showTaskModal,
  showModal
} from "../../../../store/action-creators/project-funder/modal";
import moment from "moment";

const TaskStyleWrapper = styled.div`
  height: auto;
  h3 {
    margin-top: 0;
    margin-bottom: 0.85em;
    font-weight: 400;
    line-height: normal;
    font-size: 18px;
    color: #4f4f4f;
  }
  .checkbox-part {
    margin-top: 0.3em;
    /* The container */
    .l-container {
      display: block;
      position: relative;
    }

    /* Hide the browser's default checkbox */
    .l-container input {
      opacity: 0;
      cursor: pointer;
      position: absolute;
    }

    /* Create a custom checkbox */
    .checkmark {
      position: relative;
      height: 35px;
      width: 35px;
      border-radius: 50px;
      border: 1.5px solid #156edc;
      background-color: #eff5fb;
      display: block;
      margin: auto;
      cursor: pointer;
    }

    /* On mouse-over, add a grey background color */
    .l-container:hover input ~ .checkmark {
      background-color: #eee;
    }

    /* When the checkbox is checked, add a blue background */
    .l-container input:checked ~ .checkmark {
      // background-color: #2196f3;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }

    /* Show the checkmark when checked */
    .l-container input:checked ~ .checkmark:after {
      display: block;
    }

    /* Style the checkmark/indicator */
    .l-container .checkmark:after {
      transform: rotate(45deg);
      left: 12px;
      top: 8px;
      width: 5px;
      height: 12px;
      border: solid #156edc;
      border-width: 0 2px 2px 0;
    }
  }

  ul {
    background: #ffffff;
    border: 2px solid #f1f3f5;
    border-radius: 17px;
    padding: 1em 0;
    padding: 0;
    margin: 0;
    max-height: 400px;
    // overflow-y: -moz-scrollbars-vertical;
    // overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 7px;
      background: none;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #adb5bd;
      -webkit-box-shadow: 0;
      height: 1em;
    }

    li {
      display: block;
      border-bottom: 1px solid #f2f2f2;
      padding: 1em;
      cursor: pointer;
      &:hover {
        background: #fafafa;
      }
      .s {
        padding: 0 0.25em;
      }

      h4,
      p {
        margin: 0.2em 0;
      }
      h4 {
        line-height: normal;
        font-size: 18px;
        color: #4f4f4f;
        font-weight: 400;
      }

      p {
        line-height: normal;
        font-size: 16px;
        color: #828282;
        font-weight: 100;
      }
    }
  }
  #new-task {
    background: #fbfbfb;
    border: 2px solid #cfd3d8;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 1em;
    color: #adb5bd;
    float: right;
    margin: 1em 0;
    width: 12em;
    height: 3em;

    &:hover {
      background: #156edc;
      color: white;
      border: 0;
    }
  }
`;

const Task = connect()(({ checked, data, dispatch }) => {
  return (
    <li
      className="xs-12"
      onClick={() => dispatch(showTaskModal(modals.view_task, data))}
    >
      <div className="xs-2  checkbox-part">
        <label className="l-container">
          <input type="checkbox" defaultChecked={checked} disabled />
          <span className="checkmark" />
        </label>
      </div>
      <div className="xs-10 s">
        <h4>{data.name}</h4>
        <p> {moment(data.deadline).format("MMM D, YYYY")}</p>
      </div>
    </li>
  );
});

const Tasks = ({ className, dispatch, tasks }) => {
  const tasksElements = tasks.map((task, i) => {
    return (
      <Task
        key={i}
        name={task.name}
        date={task.deadline}
        data={task}
        checked={task.status === "complete"}
      />
    );
  });
  return (
    <TaskStyleWrapper className={className}>
      <div className="xs-12 md-11">
        <h3>Tasks</h3>
        <ul className="xs-12">{tasksElements}</ul>
        <div className="xs-12">
          <button
            id="new-task"
            onClick={() => dispatch(showModal(modals.add_task))}
          >
            + New Task
          </button>
        </div>
      </div>
    </TaskStyleWrapper>
  );
};

export default connect()(Tasks);
