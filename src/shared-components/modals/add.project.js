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
import ReactS3Uploader from "react-s3-uploader";
import endpoints from "../../endpoints";
import SdgPicker from "./sub-components/sdg-picker";

const mapStateToProps = state => {
  const { type, message } = state.projects.add.action;
  return {
    add_project_in_progress: type === dA.ADD_PROJECT_IN_PROGRESS,
    message,
    type,
    selected: state.projects.funders.selected
  };
};

export default connect(mapStateToProps)(
  class AddProjectModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        "end-date-unformatted": moment().add(1, "d"),
        "start-date-unformatted": moment(),
        "project-avatar": {},
        uploading: 0,
        form: {
          startDate: moment().format("MM-DD-YYYY"),
          endDate: moment()
            .add(1, "d")
            .format("MM-DD-YYYY"),
          defaultEndDate: moment()
            .add(1, "d")
            .format("MM-DD-YYYY"),
          location: {}
        }
      };
    }

    componentWillMount() {
      this.props.dispatch({
        type: "CLEAR_ADD"
      });
    }

    handleSubmit = e => {
      e.preventDefault();
      let selected = this.props.selected;

      this.setState({
        uploading: 1,
        add_project_in_progress: true
      });

      let formData = this.state.form;

      if (selected && selected.length > 0) {
        formData.stakeholders = selected.map(s => {
          return { user: { information: s } };
        });
      }

      if (this.state["project-avatar"].file) {
        this.next(this.state["project-avatar"].file);
      } else {
        this.props.dispatch(addProject(formData));
      }
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

    handleSDG = value => {
      console.log(value);
      // this.setState({
      //   form: {
      //     ...this.state.form,
      //     tags: value
      //   }
      // });
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
      // set in-date normally and set default minimum date of out date to in-date
      let obj = {
        message: undefined,
        "start-date-unformatted": date,
        "end-date-unformatted": moment(date).add(1, "d"),

        form: {
          ...this.state.form,
          startDate: date.toDate().toISOString(), // moment(date).format("MM-DD-YYYY"),
          endDate: moment(date)
            .add(1, "d")
            .toDate()
            .toISOString()
        }
      };

      this.setState(obj);
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

    handleImageChange = (file, next) => {
      this.setState({
        "project-avatar": {
          preview: URL.createObjectURL(file),
          file
        }
      });
      // next();
      this.next = next;
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        // pull fresh projects after adding
        if (nextProps.type === dA.ADD_PROJECT_SUCCESSFUL) {
          nextProps.dispatch(fetchProjects());
        }
        this.setState({
          type: nextProps.type,
          message: nextProps.message,
          add_project_in_progress: nextProps.add_project_in_progress
        });
      }
    }

    onUploadFinish = upload => {
      this.setState(
        {
          form: {
            ...this.state.form,
            "project-avatar":
              "https://s3.us-east-2.amazonaws.com/selamvp/" + upload.filename
          }
        },
        () => {
          this.props.dispatch(addProject(this.state.form));
        }
      );
    };

    onUploadProgress = count => {
      this.setState({
        uploading: count
      });
    };

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
            <div className="xs-12 sm-6">
              <div className="xs-12 sm-11">
                <div className="form-control">
                  <label> Project Avatar</label>
                  <label htmlFor="avatar" id="label-image">
                    <img src={this.state["project-avatar"].preview} alt="" />
                    <div className="c-w">
                      <div className="c t-c">
                        <p>+</p>
                      </div>
                    </div>

                    <ReactS3Uploader
                      id="avatar"
                      name="project-avatar"
                      server={endpoints.b}
                      signingUrl="s3/sign"
                      signingUrlMethod="GET"
                      accept="image/*"
                      s3path="project-avatars/"
                      preprocess={this.handleImageChange}
                      onSignedUrl={this.onSignedUrl}
                      onProgress={this.onUploadProgress}
                      onError={this.onUploadError}
                      onFinish={this.onUploadFinish}
                      // signingUrlWithCredentials={true} // in case when need to pass authentication credentials via CORS
                      uploadRequestHeaders={{ "x-amz-acl": "public-read" }} // this is the default
                      contentDisposition="auto"
                      scrubFilename={filename =>
                        filename.replace(/[^\w\d_\-.]+/gi, "")
                      }
                      autoUpload={true}
                    />
                  </label>
                </div>
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
                  <label> Financial Goal (USD) </label>
                  <input
                    type="number"
                    name="goal"
                    placeholder="Amount you expect to raise"
                    value={fd["goal"] || ""}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="xs-12 sm-6">
              <div className="form-control">
                <label> Set the location </label>
                <LocationLoader>
                  <GeoSuggest
                    ref={el => (this.geoSuggest = el)}
                    onSuggestSelect={this.onSuggestSelect}
                  />
                </LocationLoader>
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

              <SdgPicker onChange={this.handleSDG} />

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
                      minDate={moment()}
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
                      minDate={this.state["end-date-unformatted"]}
                    />
                  </div>

                  <div className="xs-2" id="c-one">
                    <img src={calendericon} alt="calender-icon" />
                  </div>
                </div>
              </div>
              <div className="form-control xs-12">
                <AsyncButton
                  attempt={this.state.add_project_in_progress}
                  type="submit"
                  id="create-project-btn"
                  disabled={disabled}
                >
                  Create Project
                </AsyncButton>

                {Boolean(this.state.uploading) && (
                  <label
                    style={{
                      display: "block",
                      marginTop: "5px"
                    }}
                  >
                    Uploading Picture: {this.state.uploading}%
                  </label>
                )}
              </div>
            </div>
            {type === dA.ADD_PROJECT_SUCCESSFUL && (
              <MessageToShow
                type={type}
                message={message}
                match={dA.ADD_PROJECT_SUCCESSFUL}
              />
            )}
          </Form>
        </React.Fragment>
      );
    }
  }
);
