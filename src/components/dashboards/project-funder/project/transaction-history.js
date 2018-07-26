import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
const TransactionWrapper = styled.div`
  height: auto;
  ul {
    padding: 0.85em;
    background: #ffffff;
    border: 2px solid #f1f3f5;
    border-radius: 17px;
    margin: 0;
    max-height: 400px;
    overflow-y: -moz-scrollbars-vertical;
    overflow-y: scroll;
    overflow-x: hidden;

    li {
      display: block;
      position: relative;
      padding: 0.5em;
      img:hover {
        filter: grayscale(100%) contrast(50%);
      }

      .memo,
      .name,
      .amount,
      .date {
        margin: 0;
        padding: 0;
      }

      .memo {
        font-size: 16px;
        color: #3f3f3f;
        font-weight: 400;
      }

      .name {
        font-size: 13px;
        font-weight: 300;
        color: #a5a5a5;
      }

      .amount {
        font-size: 16px;
        text-align: right;
        color: #6fcf97;
      }

      .date {
        font-size: 13px;
        text-align: right;
        font-weight: 300;
        color: #a5a5a5;
      }
    }
  }

  #see-all {
    float: right;
    line-height: normal;
    font-size: 17px;
    margin: 01.75em 0;
    font-weight: 300;
    color: #156edc;

    .chevron {
      display: inline-block;
      position: relative;
      top: 0.15em;
      margin: 0 0.5em;
    }
    .chevron::before {
      border-style: solid;
      border-width: 0.15em 0.15em 0 0;
      content: "";
      display: inline-block;
      height: 0.4em;
      left: 0.15em;
      position: relative;
      top: 0.15em;
      transform: rotate(-45deg);
      vertical-align: top;
      width: 0.4em;
      border-color: #156edc;
    }

    .chevron.right:before {
      left: 0;
      transform: rotate(45deg);
    }
  }
`;

const Transaction = ({ data }) => {
  return (
    <li className="xs-12">
      <div className="xs-8">
        <h4 className="memo">{data.memo}</h4>
        <h5 className="name">{data.name}</h5>
      </div>
      <div className="xs-4">
        <p className="amount">{data.amount}</p>
        <p className="date">{moment(data.date).format("HH:mm MMMM D")}</p>
      </div>
    </li>
  );
};

const TransactionHistory = ({ className, transactions }) => {
  return (
    <TransactionWrapper className={className}>
      <div className="xs-12">
        <h3 className=" top-title ">TRANSACTION HISTORY</h3>
        <ul className="xs-12">
          {transactions.map((p, i) => {
            return <Transaction data={p} key={i} />;
          })}
        </ul>
        <div className="xs-12">
          <Link id="see-all" to="/transactions">
            See all transactions
            <span className="chevron right" />
          </Link>
        </div>
      </div>
    </TransactionWrapper>
  );
};

export default TransactionHistory;
