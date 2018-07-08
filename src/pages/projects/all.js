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
      projects: [
        {
          id: 1,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
      flow of commerce`,
          percentage: 60
        },
        {
          id: 2,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
      flow of commerce`,
          percentage: 60
        },
        {
          id: 3,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
     flow of commerce`,
          percentage: 60
        },
        {
          id: 4,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
     flow of commerce`,
          percentage: 60
        },
        {
          id: 5,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
    flow of commerce`,
          percentage: 60
        },
        {
          id: 6,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
    flow of commerce`,
          percentage: 60
        },
        {
          id: 7,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
   flow of commerce`,
          percentage: 60
        },
        {
          id: 8,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
   flow of commerce`,
          percentage: 60
        },
        {
          id: 9,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
      flow of commerce`,
          percentage: 60
        }
      ]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({});
    }
  }

  render() {
    const { name, projects } = this.state;
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
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsPageContainer);
