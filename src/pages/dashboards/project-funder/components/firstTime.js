import React from "react";

import styled from "styled-components";

const Wrap = styled.div`
  position: fixed;
  background: rgba(255, 255, 255, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .white {
    background: white;
  }
`;

export default class FirstTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (localStorage.getItem("firstTime") === undefined) {
      // set internal state to true if it's first time
      this.setState({ FirstTime: true });
      //update local storage firstTime detector
      localStorage.setItem("firstTime", false);
    }
  }

  render() {
    if (this.state.FirstTime === true) {
      return (
        <Wrap className="xs-12">
          <div className="xs-12 center-wrapper">
            <div className="center">
              <div className="white xs-12 sm-6 sm-off-4 md-4 md-off-4">
                <p>adaspdosdpaosp</p>
              </div>
            </div>
          </div>
        </Wrap>
      );
    } else {
      return null;
    }
  }
}
