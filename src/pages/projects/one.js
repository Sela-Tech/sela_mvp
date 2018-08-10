import React from "react";
import { connect } from "react-redux";
import TopWrapper from "../../components/home/top/wrapper";
import TopProject from "../../components/home/top/project";
import Footer from "../../components/home/footer";
import Helmet from "react-helmet";
import styled from "styled-components";

const More = styled.div`
  .selector * {
    text-align: center;
  }

  button {
    width: 100%;
    padding: 1.75em 0;
    font-size: 1em;
    color: #8796a1;
    background: transparent;
    border: 0;
    font-weight: 300;

    border-bottom: 2px solid rgba(135, 149, 161, 0.05);
  }

  .project-description {
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
      margin: 0;
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
      project: this.findOne(this.props.match.params.id)
    };
  }

  findOne = id => {
    const { proposed, ongoing } = this.props.projects,
      checkedProposed = proposed.filter(p => {
        return `${p.id}` === `${id}`;
      }),
      checkedOngoing = ongoing.filter(p => {
        return `${p.id}` === `${id}`;
      });

    return checkedProposed.length > 0 ? checkedProposed[0] : checkedOngoing[0];
  };

  componentDidMount() {
    document.getElementById("root").scrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        project: nextProps.project
      });
    }
  }

  render() {
    const { project } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sela Project - {project.title} </title>
        </Helmet>

        <TopWrapper projectPicture={project.picture}>
          <TopProject {...project} />
        </TopWrapper>

        <More className="xs-12">
          <div className="sm-off-3 sm-6 selectors">
            <div className="sm-4">
              <button>Project Description</button>
            </div>
            <div className="sm-4">
              <button>Transactions</button>
            </div>
            <div className="sm-4">
              <button>Project Updates</button>
            </div>
          </div>

          <div className="project-description xs-10 xs-off-1">
            <h3> Project Description </h3>
            <p>
              This is where the project description goes. This is where the
              project description goes. This is where the project description
              goes. This is where the project description goes. This is where
              the project description goes. This is where the project
              description goes. This is where the project description goes.
            </p>
            <p>
              The project is described here. The project is described here. The
              project is described here. The project is described here. The
              project is described here. The project is described here. The
              project is described here. The project is described here. The
              project is described here. The project is described here.
            </p>
            <p>
              What is the project all about? It’s all stated here. What is the
              project all about? It’s all stated here. What is the project all
              about? It’s all stated here. What is the project all about? It’s
              all stated here. What is the project all about? It’s all stated
              here. What is the project all about? It’s all stated here. What is
              the project all about? It’s all stated here.
            </p>
          </div>

          <div className="project-transactions xs-10 xs-off-1">
            <h3> Transactions </h3>
            <p>
              This is where the project description goes. This is where the
              project description goes. This is where the project description
              goes. This is where the project description goes. This is where
              the project description goes. This is where the project
              description goes. This is where the project description goes.
            </p>
            <p>
              The project is described here. The project is described here. The
              project is described here. The project is described here. The
              project is described here. The project is described here. The
              project is described here. The project is described here. The
              project is described here. The project is described here.
            </p>
            <p>
              What is the project all about? It’s all stated here. What is the
              project all about? It’s all stated here. What is the project all
              about? It’s all stated here. What is the project all about? It’s
              all stated here. What is the project all about? It’s all stated
              here. What is the project all about? It’s all stated here. What is
              the project all about? It’s all stated here.
            </p>
          </div>
        </More>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    projects: state.home.projects
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageContainer);
