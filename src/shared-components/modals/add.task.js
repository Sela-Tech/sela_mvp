import React from "react";
import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addTask } from "../../store/action-creators/project-funder/task";
import AsyncButton from "../unique/async-button";
import dA from "../../store/actions/project-funder/dashboard";
import { Form } from "./styles.modals/task";

const mapStateToProps = state => {
  const { type, message } = state.tasks.add.action;
  return {
    add_task_in_progress: type === dA.ADD_TASK_R,
    projectId: state.modal.projectId,
    message,
    type
  };
};

export default connect(mapStateToProps)(
  class AddPTaskModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dueDate: moment(),
        form: {
          dueDate: moment()
        }
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      const data = this.state.form;
      data.projectId = this.props.projectId;
      this.props.dispatch(addTask(data));
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
        form: {
          ...this.state.form,

          dueDate: date
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
      let fd = this.state.form;
      
      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <p id="info">
            Create tasks that reflect phases of work and allow your team to
            track progress of your project.
          </p>
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Task Name"
              value={fd["name"] || ""}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-control">
            <textarea
              type="text"
              name="description"
              placeholder="Task Description"
              value={fd["description"] || ""}
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
                  name="dueDate"
                  id="deadline"
                  ref="dueDate"
                  minDate={moment()}
                  selected={fd.dueDate}
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
        
        </Form>
      );
    }
  }
);
