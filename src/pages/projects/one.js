import React from "react";
import { connect } from "react-redux";
import TopWrapper from "../../components/home/top/wrapper";
import TopProject from "../../components/home/top/project";
import Footer from "../../components/home/footer";
import Helmet from "react-helmet";
// import More from "./more/wrapper";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project: this.findOne(this.props.match.params.id)
    };
  }

  findOne = id => {
    const { proposed, ongoing } = this.props.projects,
      checkedProposed = proposed.filter(p => {
        return `${p.id}` === `${id}`;
      }),
      checkedOngoing = ongoing.filter(p => {
        return `${p.id}` === `${id}`;
      });

    return checkedProposed.length > 0 ? checkedProposed[0] : checkedOngoing[0];
  };

  componentDidMount() {
    document.getElementById("root").scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        project: nextProps.project
      });
    }
  }

  render() {
    const { project } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sela Project - {project.title} </title>
        </Helmet>

        <TopWrapper projectPicture={project.picture}>
          <TopProject {...project} />
        </TopWrapper>

        {/* <More /> */}

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
