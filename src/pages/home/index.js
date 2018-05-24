import React from "react";
import { connect } from "react-redux";
import View from "./home.p";
// import {bindActionCreators} from "redux";
import Helmet from 'react-helmet';

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home - Sela  </title>
        </Helmet>

        <View {...this.props} />
      </section>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
