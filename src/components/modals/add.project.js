import React from "react";
import calendericon from "../../assets/icons/calendar.svg";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { addProject } from "../../store/action-creators/dashboard/home";
import AsyncButton from "../authentication/async-button";
import dashboardActions from "../../store/actions/dashboard";
import MessageToShow from "../errors/messageBox";

const Form = styled.form`
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
  const { type, message } = state.dashboard.addProject.action;
  return {
    add_project_in_progress: type === dashboardActions.ADD_PROJECT_IN_PROGRESS,
    message,
    type
  };
};

const placeholderDate = new Date().getFullYear() + "-01-01";


export default connect(mapStateToProps)(
  class AddProjectModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        "end-date-unformatted": moment(placeholderDate),
        "start-date-unformatted": moment(placeholderDate),
        form: {
          "end-date": moment(placeholderDate).format("MM-DD-YYYY"),
          "start-date": moment(placeholderDate).format("MM-DD-YYYY")
        }
      };
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.dispatch(addProject(this.state.form));
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

    handleStartDatePick = date => {
      this.setState({
        message: undefined,
        "start-date-unformatted": date,
        form: {
          ...this.state.form,
          "start-date": moment(date).format("MM-DD-YYYY")
        }
      });
    };

    handleEndDatePick = date => {
      this.setState({
        message: undefined,
        "end-date-unformatted": date,
        form: {
          ...this.state.form,
          "end-date": moment(date).format("MM-DD-YYYY")
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
        { type, message } = this.state,
        endDate = this.state["end-date-unformatted"],
        startDate = this.state["start-date-unformatted"],
        disabled = endDate < startDate;
      return (
        <Form onSubmit={this.handleSubmit} className="xs-12">
          <div className="form-control">
            <input
              type="text"
              name="project-name"
              placeholder="Project Name"
              value={fd["project-name"] || ""}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-control">
            <textarea
              type="text"
              name="project-description"
              placeholder="Project Description"
              value={fd["project-description"] || ""}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={fd["location"] || ""}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-control xs-12" id="date-part">
            <div className={"xs-5 date-wrpr show"}>
              <label
                onClick={() => this.forceFocus("show-start-date")}
                className="xs-10"
              >
                Start Date
              </label>
              <div className="xs-10 adjusted">
                <DatePicker
                  type="date"
                  name="start-date"
                  id="start-date"
                  ref="start-date"
                  selected={this.state["start-date-unformatted"]}
                  onChange={this.handleStartDatePick}
                />
              </div>

              <div className="xs-2" id="c-one">
                <img src={calendericon} alt="calender-icon" />
              </div>
            </div>
            <span className="xs-2">
              <p id="dash">-</p>
            </span>
            <div className={"xs-5 date-wrpr show"}>
              <label
                onClick={() => this.forceFocus("show-end-date")}
                className="xs-10 "
              >
                End Date
              </label>

              <div className="xs-10 adjusted">
                <DatePicker
                  type="date"
                  name="end-date"
                  id="end-date"
                  ref="end-date"
                  selected={this.state["end-date-unformatted"]}
                  onChange={this.handleEndDatePick}
                />
              </div>

              <div className="xs-2" id="c-one">
                <img src={calendericon} alt="calender-icon" />
              </div>
            </div>
          </div>
          <div className="form-control xs-12">
            <AsyncButton
              attempt={this.props.add_project_in_progress}
              type="submit"
              id="create-project-btn"
              disabled={disabled}
            >
              Create Project
            </AsyncButton>
          </div>
          <MessageToShow type={type} message={message} match={dashboardActions.ADD_PROJECT_SUCCESSFUL}/>
        </Form>
      );
    }
  }
);
