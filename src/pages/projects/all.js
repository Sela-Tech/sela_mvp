import React from "react";
import { connect } from "react-redux";
import TopBasic from "../../components/home/top/basic";
import Projects from "../../components/home/projects";
import Footer from "../../components/home/footer";
import Helmet from "react-helmet";

import styled from "styled-components";
const Wrap = styled.div`
  background-color: #f9fafc;
  height: auto;
  width: 100%;

  .p {
    margin: 3em 0;
  }
`;

const mapStateToProps = (state, props) => {
  return { projects: state.home.projects };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class ProjectsPageContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: this.props.match.params.type.replace("-", " "),
        projects: this.props.projects
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          projects: nextProps.projects
        });
      }
    }

    render() {
      const { name } = this.state,
        projects =
          this.props.match.params.type === "ongoing-projects"
            ? this.state.projects.ongoing
            : this.state.projects.proposed;
      return (
        <React.Fragment>
          <Wrap className="xs-12">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Home - Sela </title>
            </Helmet>

            <TopBasic />

            <Projects heading={name} projects={projects} type="all" />

            <Footer />
          </Wrap>
        </React.Fragment>
      );
    }
  }
);
