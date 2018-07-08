import React from "react";
import { connect } from "react-redux";
import TopWrapper from "../components/home/top/wrapper";
import TopHome from "../components/home/top/home";
import Projects from "../components/home/projects";
import Footer from "../components/home/footer";
import Helmet from "react-helmet";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [
        {
          id: 2,
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
          id: 6,
          title: "Imo Bridge Construction",
          funder: "Berger and Sons Ltd.",
          description: `Construction of a bridge to connect the hinterlands for easier
      flow of commerce`,
          percentage: 60
        }
      ]
    };
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home - Sela </title>
        </Helmet>
        <TopWrapper>
          <TopHome />
        </TopWrapper>

        <Projects heading="Ongoing Projects" projects={this.state.projects} />
        <Projects heading="Proposed Projects" projects={this.state.projects} />
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
)(HomePageContainer);
