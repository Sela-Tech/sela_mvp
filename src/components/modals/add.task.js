import React from "react";
import calendericon from "../../assets/icons/calendar.svg";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addTask } from "../../store/action-creators/task";
import AsyncButton from "../authentication/async-button";
import dashboardActions from "../../store/actions/dashboard";
import MessageToShow from "../errors/messageToShow";

const Form = styled.form`
  > p#info {
    font-size: 1em;
    text-align: center;
    color: #828282;
    padding: 0 2em;
    font-weight: 100;
  }

  #date-part {
    overflow: unset !important;
  }

  padding: 1.5em 0;
  input[type="text"],
  textarea {
    background: #ffffff;
    border: 3px solid #f1f3f5;
    border-radius: 17px;
    width: 100%;
    font-size: 1em;
    padding: 1em;
    line-height: normal;
    font-size: 20px;
    color: #bdbdbd;
    transition: 150ms;
    font-weight: 300;
    &:focus,
    &:active {
      border-color: #156edc;
    }
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #bdbdbd;
  }

  #dash {
    color: #bdbdbd;
    font-size: 2em;
    padding: 0;
    margin: 0.3em 0;
  }

  .date-wrpr {
    text-align: left;
    padding: 0.5em;
    max-height: 65px;
    position: relative;

    &:focus-within {
      border-color: #156edc;
    }
    label {
      padding: 0.5em;
    }

    &.show {
      label {
        font-size: 12px;
        padding: 0;
      }
      #c-one {
        position: absolute;
        top: 1em;
        right: 0;
        bottom: 0;

        img {
          top: 0;
        }
      }
    }

    img {
      position: relative;
      top: 0.5em;
    }

    label {
      color: #bdbdbd;
      cursor: pointer;
      display: inline-block;
      transition: 100ms;
    }

    background: #ffffff;
    border: 3px solid #f1f3f5;
    border-radius: 17px;

    input[type="date"] {
      border: 0;
    }
  }

  textarea {
    min-height: 6em;
  }

  .form-control {
    padding: 0.75em 0;
    overflow: auto;
  }
  #c-one {
    float: right;
    position: relative;
  }

  #create-project-btn {
    height: 74px;
    width: 100%;
    background: #156edc;
    border-radius: 17px;
    border: 0;
    font-size: 20px;
    color: white;
    letter-spacing: 1px;
  }
  .adjusted {
    input {
      padding: 0;
      border: 0;
    }
  }
`;

const mapStateToProps = state => {
  const { type, message } = state.tasks.add.action;
  return {
    add_task_in_progress: type === dashboardActions.ADD_TASK_IN_PROGRESS,
    message,
    type
  };
};

const placeholderDate = new Date().getFullYear() + "-01-01";

export default connect(mapStateToProps)(
  class AddPTaskModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        "deadline-unformatted": moment(placeholderDate),
        form: {
          deadline: moment(placeholderDate).format("MM-DD-YYYY")
        }
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.dispatch(addTask(this.state.form));
    };

    forceFocus = name => {
      this.setState({
        [name]: "show"
      });
    };

    handleChange = e => {
      const { value, name } = e.target;
      this.setState({
        message: undefined,
        form: {
          ...this.state.form,
          [name]: value
        }
      });
    };

    handleDeadlineDatePick = date => {
      this.setState({
        message: undefined,
        "deadline-unformatted": date,
        form: {
          ...this.state.form,
          deadline: moment(date).format("MM-DD-YYYY")
        }
      });
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    render() {
      let fd = this.state.form,
        { type, message } = this.state;
      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <p id="info">
            Create tasks that reflect phases of work and allow your team to
            track progress of your project.
          </p>
          <div className="form-control">
            <input
              type="text"
              name="task-name"
              placeholder="Task Name"
              value={fd["task-name"] || ""}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-control">
            <textarea
              type="text"
              name="task-description"
              placeholder="Task Description"
              value={fd["task-description"] || ""}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-control xs-12" id="date-part">
            <div className={"xs-12 date-wrpr show"}>
              <label
                onClick={() => this.forceFocus("show-start-date")}
                className="xs-10"
              >
                Deadline
              </label>
              <div className="xs-10 adjusted">
                <DatePicker
                  type="date"
                  name="deadline"
                  id="deadline"
                  ref="deadline"
                  selected={this.state["deadline-unformatted"]}
                  onChange={this.handleDeadlineDatePick}
                />
              </div>

              <div className="xs-2" id="c-one">
                <img src={calendericon} alt="calender-icon" />
              </div>
            </div>
          </div>
          <div className="form-control xs-12">
            <AsyncButton
              attempt={this.props.add_task_in_progress}
              type="submit"
              id="create-project-btn"
            >
              Add Task To Project
            </AsyncButton>
          </div>
          <MessageToShow
            type={type}
            message={message}
            match={dashboardActions.ADD_TASK_SUCCESSFUL}
          />
        </Form>
      );
    }
  }
);
