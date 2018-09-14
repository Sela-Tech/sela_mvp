import React from "react";
import { connect } from "react-redux";
import Footer from "../../../../shared-components/footer";

import Helmet from "react-helmet";
import ViewAllProjectsStyle from "./view-all-projects.style";
import Navbar from "../../../../shared-components/navbar";
import CardHolder from "../../../../shared-components/card-holder";

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
          <ViewAllProjectsStyle className="xs-12">
            <Helmet>
              <meta charSet="utf-8" />
              <title>Home - Sela </title>
            </Helmet>

            <Navbar />

            <CardHolder heading={name} projects={projects} type="all" />

            <Footer />
          </ViewAllProjectsStyle>
        </React.Fragment>
      );
    }
  }
);
