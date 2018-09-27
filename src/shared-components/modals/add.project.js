import React from "react";
import calendericon from "../../assets/icons/calendar.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import {
  addProject,
  fetchProjects
} from "../../store/action-creators/project-funder/project";

import dA from "../../store/actions/project-funder/dashboard";
import MessageToShow from "../errors/messageToShow";
import { Form } from "./styles.modals/add";

import ContractorLoader from "./sub-components/contractor-loader";
import AsyncButton from "../unique/async-button";

import LocationLoader from "./sub-components/location-loader";
import GeoSuggest from "react-geosuggest";

const mapStateToProps = state => {
  const { type, message } = state.projects.add.action;
  return {
    add_project_in_progress: type === dA.ADD_PROJECT_IN_PROGRESS,
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
          endDate: moment(placeholderDate).format("MM-DD-YYYY"),
          startDate: moment(placeholderDate).format("MM-DD-YYYY"),
          location: {}
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

    onSuggestSelect = suggest => {
      if (suggest) {
        this.setState({
          form: {
            ...this.state.form,
            location: {
              name: suggest.label,
              lat: suggest.location.lat,
              lng: suggest.location.lng
            }
          }
        });
      }
      this.geoSuggest.hideSuggests();
    };

    handleStartDatePick = date => {
      this.setState({
        message: undefined,
        "start-date-unformatted": date,
        form: {
          ...this.state.form,
          startDate: date.toDate().toISOString() // moment(date).format("MM-DD-YYYY")
        }
      });
    };

    handleEndDatePick = date => {
      this.setState({
        message: undefined,
        "end-date-unformatted": date,
        form: {
          ...this.state.form,
          endDate: date.toDate().toISOString() //moment(date).format("MM-DD-YYYY")
        }
      });
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        // pull fresh projects after adding
        if (nextProps.type === dA.ADD_PROJECT_SUCCESSFUL) {
          nextProps.dispatch(fetchProjects());
        }
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
        <React.Fragment>
          <div className="xs-12">
            <p className="below-text">
              Add your funded development project and relevant contractors and
              collaborators.
            </p>
          </div>
          <Form onSubmit={this.handleSubmit} className="xs-12">
            <div className="form-control">
              <label> Name your project </label>
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={fd["name"] || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label> Add a project description </label>

              <textarea
                type="text"
                name="description"
                placeholder="Project Description"
                value={fd["description"] || ""}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label> Set the location </label>

              {/* <input
                type="text"
                name="location"
                placeholder="Location"
                value={fd["location"].name || ""}
                onChange={this.handleLocationChange}
                required
              /> */}

              <LocationLoader>
                <GeoSuggest
                  ref={el => (this.geoSuggest = el)}
                  onSuggestSelect={this.onSuggestSelect}
                />
              </LocationLoader>
            </div>

            <ContractorLoader onchange={this.handleChange} />

            <div className="form-control xs-12" id="date-part">
              <div className={"xs-12 sm-5 date-wrpr show"}>
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

              <span className="xs-12 sm-2">
                <p id="dash">-</p>
              </span>

              <div className={"xs-12 sm-5 date-wrpr show"}>
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
            <MessageToShow
              type={type}
              message={message}
              match={dA.ADD_PROJECT_SUCCESSFUL}
            />
          </Form>
        </React.Fragment>
      );
    }
  }
);
