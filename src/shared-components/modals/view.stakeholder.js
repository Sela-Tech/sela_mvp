import React from "react";
import { connect } from "react-redux";
import StakeStyle from "./styles.modals/view.stakeholder";
import whitelogo from "../../assets/icons/sela-circle-white.svg";
// import larrow from "./assets/left-arrow.svg";
import cal from "./assets/cal.svg";
import Swiper from "react-id-swiper";
import Spinners from "../spinners";
import { fetchStakeholderInfo } from "../../store/action-creators/homepage";
import moment from "moment";
import home from "../../store/actions/home";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  const { citizenData, action, message } = state.home;
  const id = state.dashboard.stakeholder;
  const ignoreId = state.home.ignoreProjectWithID;
  return {
    citizenData,
    action,
    message,
    id,
    ignoreId
  };
};

const params = {
  slidesPerView: 2,
  spaceBetween: 5
};
export default connect(mapStateToProps)(
  class ViewStakeHolder extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        citizenData: this.props.citizenData,
        action: this.props.action,
        message: this.props.message,
        ignoreProjectWithID: this.props.ignoreId
      };

      this.props.dispatch(fetchStakeholderInfo(this.props.id));
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          citizenData: nextProps.citizenData,
          action: nextProps.action,
          message: nextProps.message,
          ignoreProjectWithID: nextProps.ignoreId
        });
      }
    }

    render() {
      const { citizenData, action, ignoreProjectWithID } = this.state;

      switch (action) {
        case home.FETCHING_CITIZEN_INFO_SUCCESSFUL:
          let projects = citizenData.projects.filter(p => {
            return p._id !== ignoreProjectWithID;
          });

          return (
            <StakeStyle className="xs-12">
              <div className="top xs-12">
                <div className="b-img">
                  <div className="rl">
                    <div className="xs-10 xs-off-1" id="text-info">
                      {/* <div className="f-l">
                    <button>
                      <img src={larrow} alt="" />
                    </button>

                    <p>SELA CITIZEN CARD</p>
                  </div>
                   */}
                      <div className="f-r">
                        <img
                          src={whitelogo}
                          alt=""
                          height="60"
                          width="60"
                          id="s-logo"
                        />
                      </div>
                    </div>
                    <div className="xs-12 t-c">
                      <img
                        src={citizenData.userInfo.profilePhoto}
                        alt=""
                        id="avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bottom xs-12">
                <div className="xs-10 xs-off-1">
                  <div className="xs-12 t-c">
                    <h4>
                      {citizenData.userInfo.lastName}{" "}
                      {citizenData.userInfo.firstName}
                    </h4>
                    <p>
                      Reputation Score: {citizenData.userInfo.reputationScore}%
                    </p>

                    <div className="xs-10 xs-off-1 s3">
                      <div className="xs-4 t-c">
                        <h5>{citizenData.projects.length}</h5>
                        <p>Projects</p>
                      </div>

                      <div className="xs-4 t-c">
                        <h5>{citizenData.uploads}</h5>
                        <p>Data Uploads</p>
                      </div>

                      <div className="xs-4 t-c">
                        <h5>{citizenData.transactions}</h5>
                        <p>Transactions</p>
                      </div>
                    </div>

                    <div className="xs-12 joined">
                      <p>
                        <img src={cal} alt="" /> Joined{" "}
                        <strong>
                          {moment(citizenData.userInfo.createdOn).format("ll")}{" "}
                        </strong>{" "}
                      </p>
                    </div>

                    <div className="xs-12" id="other-projects">
                      <p className="l">
                        Other Projects With {citizenData.userInfo.firstName}
                      </p>

                      <div className="xs-12">
                        {Boolean(projects.length) === true ? (
                          <Swiper containerClass="xs-12" {...params}>
                            {projects.map((p, i) => {
                              return (
                                <Link
                                  className="project"
                                  key={i}
                                  to={`/projects/${p._id}/description`}
                                >
                                  <img alt="" src={p["project-avatar"]} />
                                  <div className="xs-12">
                                    <p>{p.name}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </Swiper>
                        ) : (
                          <p className="l">None found.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StakeStyle>
          );
        default:
          return (
            <StakeStyle className="xs-12">
              <div className="top xs-12">
                <div className="b-img">
                  <div className="rl">
                    <div className="xs-10 xs-off-1" id="text-info">
                      {/* <div className="f-l">
                     <button>
                       <img src={larrow} alt="" />
                     </button>

                     <p>SELA CITIZEN CARD</p>
                   </div>
                    */}
                      <div className="f-r">
                        <img
                          src={whitelogo}
                          alt=""
                          height="60"
                          width="60"
                          id="s-logo"
                        />
                      </div>
                    </div>
                    <div className="xs-12 t-c">
                      <img src={"http://placehold.it/100"} alt="" id="avatar" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bottom xs-12">
                <div className="xs-10 xs-off-1">
                  <div className="xs-12 t-c">
                    <h4 id="pl"> </h4>
                    <p>Reputation Score: - %</p>

                    <div className="xs-10 xs-off-1 s3">
                      <div className="xs-4 t-c">
                        <h5>-</h5>
                        <p>Projects</p>
                      </div>

                      <div className="xs-4 t-c">
                        <h5>-</h5>
                        <p>Data Uploads</p>
                      </div>

                      <div className="xs-4 t-c">
                        <h5>-</h5>
                        <p>Transactions</p>
                      </div>
                    </div>

                    <div className="xs-12 joined">
                      <p>
                        <img src={cal} alt="" /> Joined <strong> --- </strong>{" "}
                      </p>
                    </div>

                    <div className="xs-12" id="other-projects">
                      <Spinners type="one" />
                    </div>
                  </div>
                </div>
              </div>
            </StakeStyle>
          );
      }
    }
  }
);
