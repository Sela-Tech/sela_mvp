import React from "react";
import calendericon from "../../assets/icons/calendar.svg";

import styled from "styled-components";

const Form = styled.form`
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
    background: #ffffff;
    border: 3px solid #f1f3f5;
    border-radius: 17px;
    padding: 1em 0.5em;

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
    float: left;
  }

  #c-two {
    float: right;
  }
`;

class AddProjectModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Form onSumbit={this.handleSubmit} className="xs-12">
        <div className="form-control">
          <input type="text" name="project-name" placeholder="Project Name" />
        </div>
        <div className="form-control">
          <textarea
            type="text"
            name="project-description"
            placeholder="Project Description"
          />
        </div>
        <div className="form-control">
          <input type="text" name="location" placeholder="Location" />
        </div>
        <div className="form-control" id="date-part">
          <div className="xs-5 date-wrpr">
            <input type="date" name="start-date" className="xs-10" />
            <div className="xs-2">
              <img src={calendericon} alt="calender-icon" id="c-one" />
            </div>
          </div>
          <span className="xs-2">
            <p id="dash">-</p>
          </span>
          <div className="xs-5 date-wrpr">
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              name="end-date"
              id="end-date"
              className="xs-10 barely-visible"
            />

            <div className="xs-2" id="c-two">
              <img src={calendericon} alt="calender-icon" />
            </div>
          </div>
        </div>
        <div className="form-control" />
        <div className="form-control">
          <input type="submit" value="Create Project" />
        </div>
      </Form>
    );
  }
}

export default AddProjectModal;
