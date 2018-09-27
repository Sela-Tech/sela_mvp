import React from "react";
import LeftPaneStyle from "./left.pane.style";
import { connect } from "react-redux";
import {
  fetchProjects,
  fetchLocations
} from "../../../../store/action-creators/homepage";
import CardHolder from "../../../../shared-components/card-holder";
import { withRouter } from "react-router";
import { getQueryString } from "../../../../helpers/utils";

const statuses = ["DORMANT", "ACCEPTED", "STARTED", "TERMINATED", "COMPLETED"];

class LeftPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.projects,
      locations: this.props.locations,
      location: ""
    };
    this.timeout = 0;
    this.props.fetchLocations();
    this.props.fetchProjects(getQueryString(window.location.href));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        projects: nextProps.projects,
        action: nextProps.action
      });
    }
    if (this.props.locations.length === 0 && nextProps.locations.length > 0) {
      this.setState({
        locations: nextProps.locations
      });
    }
  }

  handleSelect = e => {
    const { name, value } = e.target;
    if (this.timeout) clearTimeout(this.timeout);
    this.setState({
      [name]: value
    });

    this.timeout = setTimeout(() => {
      const { location, status } = this.state;
      if (
        location &&
        location !== "Unspecified" &&
        status &&
        status !== "Unspecified"
      ) {
        this.props.history.push(`/?location=${location}&status=${status}`);
      } else if (location) {
        if (
          location === status ||
          (location === "Unspecified" && status === undefined)
        ) {
          this.props.history.push("/");
        } else if (
          location === "Unspecified" &&
          status !== undefined &&
          status !== "Unspecified"
        ) {
          this.props.history.push(`/?status=${status}`);
        } else {
          this.props.history.push(`/?location=${location}`);
        }
      } else if (status) {
        if (
          location === status ||
          (status === "Unspecified" && location === undefined)
        ) {
          this.props.history.push("/");
        } else if (
          status === "Unspecified" &&
          location !== undefined &&
          location !== "Unspecified"
        ) {
          this.props.history.push(`/?location=${location}`);
        } else {
          this.props.history.push(`/?status=${status}`);
        }
      }

      this.props.fetchProjects(getQueryString(window.location.href));
    }, 300);
  };

  render() {
    const { locations, location } = this.state;

    return (
      <LeftPaneStyle className="xs-12 sm-6">
        <div className="xs-10 xs-off-1">
          <h2 id="projects-h2">Projects</h2>

          <div className="xs-6">
            <select
              className="boma-select xs-12 sm-11"
              name="location"
              onChange={this.handleSelect}
              value={location}
            >
              <option value="" default hidden>
                Select Location
              </option>

              <option value="Unspecified"> Unspecified</option>
              {locations.map((l, i) => {
                return (
                  <option value={l.name} key={i}>
                    {l.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="xs-6">
            <select
              className="boma-select xs-12 sm-11"
              name="status"
              onChange={this.handleSelect}
            >
              <option value="" default hidden>
                Select Project Status
              </option>
              <option value="Unspecified"> Unspecified</option>

              {statuses.map((s, i) => {
                return (
                  <option value={s} key={i}>
                    {s}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <CardHolder projects={this.state.projects} action={this.state.action} />
      </LeftPaneStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.home.projects,
    locations: state.home.locations,
    action: state.home.action
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: query => dispatch(fetchProjects(query)),
    fetchLocations: () => dispatch(fetchLocations())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeftPane));
