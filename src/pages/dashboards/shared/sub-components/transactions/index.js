import React from "react";
import { connect } from "react-redux";
import TWrap from "./transactions.style";
import moment from "moment";

class Transactions extends React.Component {
  state = {
    date: ""
  };

  handleDateUpdate = e => this.setState({ date: e.target.value });

  render() {
    const { date } = this.state;

    return (
      <TWrap className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l c-sm-screen">
            <h3>Transaction History</h3>
          </div>

          <div className="f-r c-sm-screen">
            <select
              className="date"
              name="date"
              value={date}
              onChange={this.handleDateUpdate}
            >
              <option value="30">Last 30 days </option>
              <option value="60">Last 60 days </option>
              <option value="90">Last 90 days </option>
              <option value="120">Last 120 days </option>
              <option value="150">Last 150 days </option>
              <option value="250">Last 250 days </option>
              <option value="365">Last 365 days </option>
            </select>

            <button className="blue-btn"> Add Transaction</button>
          </div>
        </div>
        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
            <div className="xs-12 sm-3">
              <h4>TRANSACTION</h4>
            </div>
            <div className="xs-12 sm-3">
              <h4>AMOUNT</h4>
            </div>
            <div className="xs-12 sm-3">
              <h4>CATEGORY</h4>
            </div>
            <div className="xs-12 sm-3">
              <h4>DETAILS</h4>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>

          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>
          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>
          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>
          <div className="xs-12 row b">
            <div className="xs-12 sm-3">
              <h3>Transaction Memo Listed Here</h3>
              <p>Ese Family Trust</p>
            </div>
            <div className="xs-12 sm-3">
              <h3 id="cash">$10,500</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>Evaluation Team</h3>
            </div>
            <div className="xs-12 sm-3">
              <h3>{moment().format("HH:mm DD MMM YYYY")} </h3>
            </div>
          </div>
        </div>
      </TWrap>
    );
  }
}

export default connect()(Transactions);
