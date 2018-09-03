import React from "react";
import { connect } from "react-redux";
import TopWrapper from "../../components/home/top/wrapper";
import TopProject from "../../components/home/top/project";
import Footer from "../../components/home/footer";
import Helmet from "react-helmet";
import styled from "styled-components";

import TransactionHistory from "../../components/dashboards/project-funder/project/transaction-history";
import { fetchProject } from "../../store/action-creators/homepage";
import Spinner from "../../components/spinners";
import Updates from "../../components/home/updates";

const More = styled.div`
  .selector * {
    text-align: center;
  }
  .border {
    border-bottom: 2px solid rgba(135, 149, 161, 0.05);
  }
  button {
    width: 100%;
    padding: 1.75em 0;
    font-size: 1em;
    color: #8796a1;
    background: transparent;
    border: 0;
    font-weight: 300;

    &.active {
      border-bottom: 2px solid #156edc;
    }
  }

  .project-description {
    text-align: center;
  }
  .project-description,
  .project-transactions,
  .project-updates {
    padding: 4em 0;
    h3 {
      font-family: Cabin;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 24px;
      letter-spacing: 0.02em;
      color: #156edc;
      text-align: center;
      margin: 1em 0;
    }
    p {
      line-height: 26px;
      font-size: 16px;
      font-weight: 300;
      color: #22292f;
    }
  }
`;

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: {
        description: "active",
        transaction: "",
        update: ""
      },
      project: {}
    };
    this.props.find(this.props.match.params.id);
  }

  componentDidMount() {
    document.getElementById("root").scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        project: nextProps.project,
        loaded: Boolean(Object.keys(nextProps.project).length)
      });
    }
  }

  scroll = e => {
    this.setState({
      activeButton: {
        [e.target.name]: "active"
      }
    });
  };

  render() {
    const { project, loaded } = this.state;

    if (loaded) {
      return (
        <React.Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Sela Project - {project.title || ""} </title>
          </Helmet>

          <TopWrapper projectPicture={project.picture}>
            <TopProject {...project} />
          </TopWrapper>

          <More className="xs-12">
            <div className="xs-12 border">
              <div className="sm-off-3 sm-6 selectors">
                <div className="sm-4">
                  <button
                    className={this.state.activeButton.description}
                    name="description"
                    onClick={this.scroll}
                  >
                    Project Description
                  </button>
                </div>
                <div className="sm-4">
                  <button
                    className={this.state.activeButton.transaction}
                    name="transaction"
                    onClick={this.scroll}
                  >
                    Transactions
                  </button>
                </div>
                <div className="sm-4">
                  <button
                    className={this.state.activeButton.update}
                    name="update"
                    onClick={this.scroll}
                  >
                    Project Updates
                  </button>
                </div>
              </div>
            </div>

            <div className="project-description xs-10 xs-off-1">
              <h3> Project Description </h3>
              <p>{project.description}</p>
            </div>

            <div className="project-transactions xs-10 xs-off-1">
              <h3> Transactions </h3>
              <TransactionHistory
                transactions={project.transactions}
                showDefaultTitle={false}
                link={"/project/" + project.id + "/transactions"}
                borderless={true}
              />
            </div>

            <div className="project-updates xs-10 xs-off-1">
              <h3> Project Updates </h3>
              <Updates tasks={project.tasks} />
            </div>
          </More>

          <Footer />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Sela Project - Loading </title>
          </Helmet>

          <TopWrapper projectPicture={project.picture}>
            <div className="center-wrapper" style={{ height: "50vh" }}>
              <div className="center">
                <Spinner type="two" />
                <p
                  id="loading-text"
                  style={{
                    color: "#eaeaea",
                    display: "block",
                    margin: "25px 0"
                  }}
                >
                  Fetching Project Data...
                </p>
              </div>
            </div>
          </TopWrapper>

          <More>
            <div className="xs-12 border">
              <div className="sm-off-3 sm-6 selectors">
                <div className="sm-4">
                  <button>Project Description</button>
                </div>
                <div className="sm-4">
                  <button name="transaction">Transactions</button>
                </div>
                <div className="sm-4">
                  <button>Project Updates</button>
                </div>
              </div>
            </div>
          </More>

          <Footer />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    project: state.home.project
  };
};

const mapDispatchToProps = dispatch => {
  return {
    find: id => dispatch(fetchProject(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
