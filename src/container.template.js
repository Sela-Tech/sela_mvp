import React from "react";
import { connect } from "react-redux";
import View from "./view";
import {bindActionCreators} from "redux";

class Name extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section>
        <Helmet>
          <meta charSet="utf-8" />
          <title> </title>
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

export default connect(mapStateToProps, mapDispatchToProps)(Name);
