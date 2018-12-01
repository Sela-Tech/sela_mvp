import React from "react";
import LeftPaneStyle from "./left.pane.style";
import { connect } from "react-redux";
import {
  fetchProjects,
  fetchLocations,
  showMap
} from "../../../../store/action-creators/homepage";
import CardHolder from "../../../../shared-components/card-holder";
import { withRouter } from "react-router";
import { getQueryString } from "../../../../helpers/utils";

import map from "./map.png";

const statuses = ["DORMANT", "ACCEPTED", "STARTED", "TERMINATED", "COMPLETED"];

class LeftPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.projects,
      locations: this.props.locations,
      location: "Unspecified",
      status: "Unspecified",
      isBigScreen: window.innerWidth > 767
    };
    this.timeout = 0;
    this.props.fetchLocations();
    this.props.fetchProjects(getQueryString(window.location.href));
  }

  componentWillMount() {
    window.addEventListener("resize", this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeListener);
    document.getElementById("root").style.overflow = "auto";
  }

  resizeListener = e => {
    this.setState({
      isBigScreen: window.innerWidth > 767
    });
  };

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
      const { location, status } = this.state,
      {history,fetchProjects} = this.props;

      if (
        location &&
        location !== "Unspecified" &&
        status &&
        status !== "Unspecified"
      ) {
        history.push(`/?location=${location}&status=${status}`);
      } else if (location) {
        if (
          location === status ||
          (location === "Unspecified" && status === "Unspecified")
        ) {
          history.push("/");
        } else if (location === "Unspecified" && status !== "Unspecified") {
          history.push(`/?status=${status}`);
        } else {
          history.push(`/?location=${location}`);
        }
      } else if (status) {
        if (
          location === status ||
          (status === "Unspecified" && location === undefined)
        ) {
          history.push("/");
        } else if (
          status === "Unspecified" &&
          location !== undefined &&
          location !== "Unspecified"
        ) {
          history.push(`/?location=${location}`);
        } else {
          history.push(`/?status=${status}`);
        }
      }

      fetchProjects(getQueryString(window.location.href));
    }, 300);
  };

  handleScroll = e => {
    e.persist();

    if (e.target.scrollTop > e.target.clientHeight) {
      document.getElementById("root").style.overflow = "auto";
    }
  };
  freezeRoot = () => {
    if (this.props.showMap === true) {
      document.getElementById("root").style.overflow = "hidden";
    } else {
      document.getElementById("root").style.overflow = "auto";
    }
  };

  unfreezeRoot = () => {
    document.getElementById("root").style.overflow = "auto";
  };

  render() {
    const { locations, location, status,isBigScreen, projects,action } = this.state,
    { showMap,toggleMap,} = this.props;

    return (
      <LeftPaneStyle
        id="leftpane"
        className={this.props.className}
        onMouseOver={this.freezeRoot}
        onMouseLeave={this.unfreezeRoot}
        onScroll={this.handleScroll}
      >
        <div className="xs-10 xs-off-1">
          <h2 id="projects-h2">Projects</h2>
          <div className={showMap ? "xs-12" : "xs-12 sm-8"}>
            <div className="xs-12 sm-5 md-5">
              <label>Select Location</label>
              <select
                className="boma-select xs-12 sm-11"
                name="location"
                onChange={this.handleSelect}
                value={location}
              >
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
            <div className="xs-12 sm-5 md-5">
              <label>Select Project Status</label>

              <select
                className="boma-select xs-12 sm-11"
                name="status"
                onChange={this.handleSelect}
                value={status}
              >
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

            { showMap && isBigScreen && (
              <div className="sm-2 t-c">
                <button
                  id="show-map"
                  name="show-map"
                  onClick={toggleMap}
                >
                  <img src={map} alt="" />
                </button>
              </div>
            )}
          </div>

          {!showMap && isBigScreen && (
            <div className="xs-4">
              <div className="xs-off-8 xs-4 t-c">
                <button
                  id="show-map"
                  name="show-map"
                  onClick={toggleMap}
                >
                  <img src={map} alt="" />
                </button>
              </div>
            </div>
          )}
        </div>

        <CardHolder projects={projects} action={action} />
      </LeftPaneStyle>
    );
  }
}

const mapStateToProps = state => {
  const { projects, locations, action } = state.home;

  return {
    projects,
    locations,
    action,
    showMap: state.home.map.show
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: query => dispatch(fetchProjects(query)),
    fetchLocations: () => dispatch(fetchLocations()),
    toggleMap: () => dispatch(showMap)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LeftPane));
