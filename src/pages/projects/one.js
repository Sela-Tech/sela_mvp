import React from "react";
import { connect } from "react-redux";
import TopWrapper from "../../components/home/top/wrapper";
import TopProject from "../../components/home/top/project";
import Footer from "../../components/home/footer";
import Helmet from "react-helmet";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "K-Dere Oil Spill Clean-up",
      project: {
        projectTitle: "K-Dere Oil Spill Clean-up",
        projectPicture: "https://picsum.photos/1200/1200/?random",
        projectFunder: "Sustainability International",
        fundingTarget: "$10,000.00",
        amountRaised: "$5,000.00",
        percentage: 73
      }
    };
  }

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
    const { name, project } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sela Project - {name} </title>
        </Helmet>

        <TopWrapper projectPicture={project.projectPicture}>
          <TopProject {...project} />
        </TopWrapper>

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
