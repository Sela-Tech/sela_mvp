import React from "react";
import { connect } from "react-redux";
import Prompt from "./prompt";

import styled from "styled-components";

const Wrap = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);

  p,
  h4,
  h3,
  h2,
  h1 {
    margin: 0;
  }
  #white {
    background: white;
    height: 10em;
    border-radius: 4px;

    &.center {
      background: white;
      height: 350px;
      width: 350px;
      border-radius: 4px;
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`;
class HelpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Wrap className="center-wrapper xs-12">
        <Prompt {...this.props} />
      </Wrap>
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
)(HelpContainer);
