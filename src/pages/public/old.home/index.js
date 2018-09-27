import React from "react";
import { connect } from "react-redux";
import TopBasic from "../../../shared-components/navbar";
import Helmet from "react-helmet";

import { fetchProjects } from "../../../store/action-creators/homepage";

import Home from "./home.style";

import CardHolder from "../../../shared-components/card-holder";
import Footer from "../../../shared-components/footer";
import SimpleMap from "./map";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.projects
    };
    this.props.fetchProjects();
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        projects: nextProps.projects,
        action: nextProps.action
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Home className="xs-12">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Home - Sela </title>
          </Helmet>
          <TopBasic />
          <div className="xs-12 " style={{ height: "auto" }}>
            <div className="xs-12 sm-6">
              <div className="xs-12 sm-11 sm-off-1">
                <div className="xs-10 xs-off-1">
                  <h2 id="projects-h2">Projects</h2>

                  <div className="xs-6">
                    <select
                      className="boma-select xs-12 sm-11"
                      name="project-location"
                      onChange={() => {}}
                    >
                      <option value="" default hidden>
                        Select Location
                      </option>
                      <option value="PortHarcourt"> Port Harcourt</option>
                      <option value="PortHarcourt"> Port Harcourt</option>
                      <option value="PortHarcourt"> Port Harcourt</option>
                    </select>
                  </div>
                  <div className="xs-6">
                    <select
                      className="boma-select xs-12 sm-11"
                      name="project-type"
                      onChange={() => {}}
                    >
                      <option value="" default hidden>
                        Select Project Type
                      </option>
                      <option value="ongoing"> Ongoing</option>
                      <option value="proposed"> Proposed</option>
                    </select>
                  </div>
                </div>

                <CardHolder
                  projects={this.state.projects}
                  action={this.state.action}
                />
              </div>
            </div>
            
            <div className="xs-12 sm-6 " style={{ height: "100vh" }}>
              <SimpleMap projects={this.state.projects} />
            </div>
          </div>

          <Footer />
        </Home>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.home.projects,
    action: state.home.action
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchProjects: () => dispatch(fetchProjects())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
