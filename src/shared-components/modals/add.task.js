import React from "react";
import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addTask } from "../../store/action-creators/project-funder/task";
import AsyncButton from "../unique/async-button";
import dA from "../../store/actions/project-funder/dashboard";
import MessageToShow from "../errors/messageToShow";
import { Form } from "./styles.modals/task";

const mapStateToProps = state => {
  const { type, message } = state.tasks.add.action;
  return {
    add_task_in_progress: type === dA.ADD_TASK_IN_PROGRESS,
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
            match={dA.ADD_TASK_SUCCESSFUL}
          />
        </Form>
      );
    }
  }
);
