import React from "react";
import ViewProjectStyle from "./view-project.style";
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import Navbar from "../../../../shared-components/navbar";

import { Line } from "rc-progress";
import Description from "./subs/description";
import Stakeholders from "./subs/stakeholders";
import Updates from "./subs/updates";

const DetermineWhatToShow = ({ show, id }) => {
  switch (show) {
    case "updates":
      return <Updates />;
    case "stakeholders":
      return <Stakeholders />;
    default:
      return <Description id={id} />;
  }
};

class ViewProject extends React.Component {
  state = {
    id: this.props.match.params.id
  };

  render() {
    const { id } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <ViewProjectStyle className="xs-12">
          <div className="xs-12" id="header">
            <div className="xs-10 xs-off-1">
              <div className="xs-12">
                <div className="f-l">
                  <Link to="/">Back To Projects</Link>
                </div>
              </div>

              <div className="xs-12 sm-8 sm-off-2 t-c">
                <h1>K-Dere Oil Spill Clean Up</h1>
                <p>Sustainability International</p>

                <div className="xs-12">
                  <video
                    poster={"http://placehold.it/200"}
                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    alt="vid"
                  />
                </div>

                <div className="xs-12 info">
                  <div className="xs-12 sm-4 l">
                    <h3>
                      $5,000.00 <span>raised</span>
                    </h3>
                  </div>

                  <div className="xs-12 sm-5 t-c">
                    <h4>
                      50% <span>of</span> $10,000.00 <span> goal</span>
                    </h4>
                    <Line
                      percent={20}
                      strokeWidth="4"
                      trailWidth="4"
                      strokeColor="#156EDC"
                      trailColor="#F2F2F2"
                    />
                  </div>
                  <div className="xs-12 sm-3 r">
                    <h3>
                      36 <span>investors</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xs-12" id="tabs">
            <div className="xs-10 xs-off-1">
              <div className="xs-12 sm-7">
                <div className="xs-12 sm-6 md-3">
                  <NavLink
                    to={`/projects/${id}/description`}
                    name="description"
                    onClick={this.select}
                  >
                    Project description
                  </NavLink>
                </div>
                <div className="xs-12 sm-6 md-3">
                  <NavLink to={`/projects/${id}/stakeholders`}>
                    Stakeholders
                  </NavLink>
                </div>
                <div className="xs-12 sm-6 md-3">
                  <NavLink to={`/projects/${id}/updates`}>
                    Project Updates
                  </NavLink>
                </div>
                <div className="xs-12 sm-6 md-3">
                  <NavLink to={`/projects/${id}/transactions`}>
                    Transaction
                  </NavLink>
                </div>
              </div>

              <div className="xs-12 sm-5">
                <div className="f-r">
                  <NavLink to="invest" id="invest">
                    Invest
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <div className="xs-12 variable">
            <DetermineWhatToShow show={this.props.match.params.show} id={id} />
          </div>
        </ViewProjectStyle>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(ViewProject);
