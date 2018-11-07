import React from "react";
import { connect } from "react-redux";
import DocStyle from "./doc.style";
import moment from "moment";
import search from "./search.svg";
import up from "./up.svg";

class Documents extends React.Component {
  render() {
    return (
      <DocStyle className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l xs-12 sm-9">
            <div className="xs-12 md-3">
              <h3>Related Documents</h3>
            </div>

            <div className="xs-12 md-5">
              <form>
                <div className="xs-12" id="search">
                  <input name="search" placeholder="Search Documents" />
                  <button>
                    <img src={search} alt="" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="f-r c-sm-screen">
            <button className="blue-btn">Upload</button>
          </div>
        </div>

        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
            <div className="xs-12 sm-4">
              <h4> File</h4>
            </div>
            <div className="xs-12 sm-5">
              <h4> Date Added </h4>
            </div>

            <div className="xs-12 sm-3">
              <h4> </h4>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-4">
              <div className="xs-12 sm-4">
                <img src={"http://placehold.it/100"} alt="100" />
              </div>
              <div className="xs-12 sm-8">
                <p>SpillData.jpg</p>
              </div>
            </div>
            <div className="xs-12 sm-5">
              <p>{moment().format("DD MMM YYYY")} </p>
            </div>

            <div className="xs-12 sm-3">
              <select
                className="xs-9"
                name="date"
                onChange={this.handleDateUpdate}
              >
                <option value="" hidden>
                  Actions
                </option>
                <option value="delete">Delete</option>
                <option value="view">View</option>
              </select>
              <div className="xs-2">
                <button id="download">
                  <img src={up} alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </DocStyle>
    );
  }
}

export default connect()(Documents);
