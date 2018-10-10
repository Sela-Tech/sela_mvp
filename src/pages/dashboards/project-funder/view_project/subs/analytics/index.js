import React from "react";
import AStyle from "./a.styles";

export default class Analytics extends React.Component {
  render() {
    return (
      <AStyle className="xs-12">
        <div className="xs-12" id="top">
          <div className="f-l">
            <h3>Project Health Overview</h3>
          </div>
          <div className="f-r">
            <input type="date" />
          </div>
        </div>
      </AStyle>
    );
  }
}
