import React from "react";
import { connect } from "react-redux";
import StakeholderStyle from "./stakeholder.style";
// import moment from "moment";

class Stakeholders extends React.Component {
  state = {};

  render() {
    return (
      <StakeholderStyle className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l c-sm-screen">
            <h3>Stakeholders</h3>
          </div>

          <div className="f-r c-sm-screen">
            <button className="blue-btn"> Add Stakeholder</button>
          </div>
        </div>

        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
            <div className="xs-12 sm-2">
              <h4> Status</h4>
            </div>
            <div className="xs-12 sm-7">
              <h4> Stakeholder Details</h4>
            </div>

            <div className="xs-12 sm-3">
              <h4> </h4>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-2">
              <button className="completed">Pending Acceptance</button>
            </div>
            <div className="xs-12 sm-7">
              <h3> John Doe </h3>
              <p> Contractor</p>
            </div>

            <div className="xs-12 sm-3">
              {/* <h3>{moment().format("HH:mm DD MMM YYYY")} </h3> */}
            </div>
          </div>
        </div>
      </StakeholderStyle>
    );
  }
}

export default connect()(Stakeholders);
