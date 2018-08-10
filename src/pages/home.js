import React from "react";
import { connect } from "react-redux";
import TopBasic from "../components/home/top/basic";
import Projects from "../components/home/projects";
import Footer from "../components/home/footer";
import Helmet from "react-helmet";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home - Sela </title>
        </Helmet>

        <TopBasic />
        <Projects
          heading="Ongoing Projects"
          projects={this.state.projects.ongoing}
        />
        <Projects
          heading="Proposed Projects"
          projects={this.state.projects.proposed}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    projects: state.home.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
