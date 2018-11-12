import React from "react";
import { connect } from "react-redux";
import TWrap from "./transactions.style";
import moment from "moment";
import { showAddTransactionModal } from "../../../../../store/action-creators/project-funder/modal";
import { fetchProject } from "../../../../../store/action-creators/project-funder/project";

class Transactions extends React.Component {
  state = {
    date: "",
    transactions: this.props.homePage
      ? this.props.transactions
      : this.props.transactionsForHomePage
  };

  showAddTransactionModal = () =>
    this.props.dispatch(showAddTransactionModal(this.props.projectId));

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.type === "ADD_TRANSACTION_SUCCESSFUL") {
        this.props.dispatch(fetchProject(this.props.projectId));
      }

      this.setState({
        transactions:
          nextProps.homePageDeep === true
            ? nextProps.transactionsForHomePage
            : nextProps.transactions
      });
    }
  }

  handleDateUpdate = e => this.setState({ date: e.target.value });

  render() {
    const { date, transactions } = this.state;

    console.log(this.props);
    return (
      <TWrap className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l c-sm-screen">
            <h3>Transaction History</h3>
          </div>
          {this.props.homePageDeep !== true && (
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

              <button
                className="blue-btn"
                onClick={this.showAddTransactionModal}
              >
                Add Transaction
              </button>
            </div>
          )}
        </div>
        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
            <div className="xs-12 sm-4">
              <h4>AMOUNT</h4>
            </div>

            {/*}            <div className="xs-12 sm-3">
              <h4>TRANSACTION</h4>
    </div> */}

            <div className="xs-12 sm-4">
              <h4>Date</h4>
            </div>
            <div className="xs-12 sm-4">
              <h4>DETAILS</h4>
            </div>
          </div>

          {Boolean(transactions.length > 0) ? (
            transactions.map((t, i) => {
              return (
                <div className="xs-12 row b" key={i}>
                  <div className="xs-12 sm-4">
                    <h3 id="cash">
                      {t.value} {t.currency}
                    </h3>
                  </div>
                  {/*                   
                  
                  <div className="xs-12 sm-3">
                    <h3>{t.memo}</h3>
                    <p>{t.receiver}</p>
                  </div>
                   */}
                  <div className="xs-12 sm-4 ">
                    <h3>
                      <a
                        target="_blank"
                        className="link"
                        href={`https://etherscan.io/tx/${t.hash}`}
                      >
                        See On Etherscan
                      </a>
                    </h3>
                  </div>
                  <div className="xs-12 sm-4 det">
                    <p>
                      Sender: <span>{t.sender}</span>
                    </p>

                    <p>
                      Receiver: <span>{t.receiver}</span>
                    </p>
                    <p>
                      Sent:
                      <span>
                        {moment(t.createdOn).format("HH:mm DD MMM YYYY")}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Records Found.</p>
          )}
        </div>
      </TWrap>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.projects.single.info._id,
    transactions: state.projects.single.info.transactions,
    transactionsForHomePage: state.home.project.transactions,
    type: state.transactions.type
  };
};

export default connect(mapStateToProps)(Transactions);
