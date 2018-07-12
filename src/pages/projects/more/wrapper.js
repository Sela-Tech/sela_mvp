import React from "react";
import styled from "styled-components";

const MoreWrapper = styled.div`
  nav {
    background: rgba(229, 229, 229, 0.05);
    border-radius: 2px 0px 0px 0px;

    border-bottom: 2px solid rgba(135, 149, 161, 0.05);

    li {
      list-style-type: none;
      display: inline-block;

      button {
        padding: 1em 2em;
        border: 0;
        line-height: normal;
        font-size: 15px;
        font-weight: 300;
        letter-spacing: 0.02em;
        color: #8795a1;
        &:active,
        &:focus,
        &:hover {
          color: #156edc;
        }
        width: 100%;
      }
    }
  }

  .project-description,
  .funding-details,
  .transactions,
  .updates {
    min-height: calc(100vh - 140px);
    width: 100vw;
  }
`;

class More extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "project-description"
    };
  }

  handleSelect = e => {
    this.setState({
      type: e.target.name
    });
  };

  render() {
    const This = key => {
      switch (key) {
        case "project-description":
          return <div className={key}>project description</div>;
        case "funding-details":
          return <div className={key}>funding details</div>;
        case "transactions":
          return <div className={key}>transactions</div>;
        case "updates":
          return <div className={key}>updates</div>;
        default:
          return null;
      }
    };
    return (
      <MoreWrapper className="xs-12">
        <nav className="xs-12">
          <li className="xs-6 md-2">
            <button
              onClick={this.handleSelect}
              name="project-description"
              autoFocus
            >
              Project description
            </button>
          </li>
          <li className="xs-6 md-2">
            <button onClick={this.handleSelect} name="funding-details">
              Funding details
            </button>
          </li>
          <li className="xs-6 md-2">
            <button onClick={this.handleSelect} name="transactions">
              Transactions
            </button>
          </li>
          <li className="xs-6 md-2">
            <button onClick={this.handleSelect} name="updates">
              Updates
            </button>
          </li>
        </nav>
        <div className="xs-10 xs-off-1">{This(this.state.type)}</div>
      </MoreWrapper>
    );
  }
}

export default More;
