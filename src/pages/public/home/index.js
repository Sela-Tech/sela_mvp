import React from "react";
import { connect } from "react-redux";
import TopBasic from "../../../shared-components/navbar";
import Helmet from "react-helmet";

import { fetchProjects } from "../../../store/action-creators/homepage";

import Home from "./home.style";

import CardHolder from "../../../shared-components/card-holder";
import Footer from "../../../shared-components/footer";

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
          <div className="p xs-12">
            <CardHolder
              heading="Ongoing Projects"
              projects={this.state.projects.ongoing}
              action={this.state.action}
            />

            <CardHolder
              heading="Proposed Projects"
              projects={this.state.projects.proposed}
              action={this.state.action}
            />
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
