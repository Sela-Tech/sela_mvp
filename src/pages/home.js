import React from "react";
import { connect } from "react-redux";
import TopBasic from "../components/home/top/basic";
import Projects from "../components/home/projects";
import Footer from "../components/home/footer";
import Helmet from "react-helmet";

import { fetchProjects } from "../store/action-creators/homepage";

import styled from "styled-components";
const Wrap = styled.div`
  background-color: #f9fafc;
  height: auto;
  width: 100%;

  .p {
    margin: 3em 0;
  }
`;

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.projects
    };
    this.props.fetchProjects();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        projects: nextProps.projects
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Wrap className="xs-12">
          <Helmet>
            <meta charSet="utf-8" />
            <title>Home - Sela </title>
          </Helmet>

          <TopBasic />
          <div className="p xs-12">
            <Projects
              heading="Ongoing Projects"
              projects={this.state.projects.ongoing}
            />
            <Projects
              heading="Proposed Projects"
              projects={this.state.projects.proposed}
            />
          </div>

          <Footer />
        </Wrap>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    projects: state.home.projects
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
