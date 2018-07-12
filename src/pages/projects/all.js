import React from "react";
import { connect } from "react-redux";
import TopWrapper from "../../components/home/top/wrapper";
import TopHome from "../../components/home/top/home";
import Projects from "../../components/home/projects";
import Footer from "../../components/home/footer";
import Helmet from "react-helmet";

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home - Sela </title>
        </Helmet>

        <TopWrapper>
          <TopHome />
        </TopWrapper>

        <Projects heading={name} projects={projects} type="all" />
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { projects: state.home.projects };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPageContainer);
