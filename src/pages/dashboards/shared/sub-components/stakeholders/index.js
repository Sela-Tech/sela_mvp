import React from "react";
import connect from "react-redux/lib/connect/connect";
import StakeholderStyle from "./stakeholder.style";
// import { fetchProject } from "../../../../../store/action-creators/project";
import {
  showAddStakeholderModal,
  showStakeHolderModal
} from "../../../../../store/action-creators/modal";

class Stakeholders extends React.Component {
  state = {
    stakeholders: this.props.stakeholders
  };

  showSH = id => this.props.dispatch(showStakeHolderModal(id));

  showAddSH = () =>
    this.props.dispatch(showAddStakeholderModal(this.props.projectId));

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      // if (nextProps.type === "ADD_STAKEHOLDER_S") {
      //   this.props.dispatch(fetchProject(this.props.projectId));
      // }

      this.setState({
        stakeholders: nextProps.stakeholders
      });
    }
  }

  render() {
    const { stakeholders } = this.state;

    return (
      <StakeholderStyle className="xs-12">
        <div className="xs-12 sp">
          <div className="f-l c-sm-screen">
            <h3>Stakeholders</h3>
          </div>

          <div className="f-r c-sm-screen">
            <button className="blue-btn" onClick={this.showAddSH}>
              Add Stakeholder
            </button>
          </div>
        </div>

        <div className="xs-12 container">
          <div className="xs-12 row hide-sm-laptop">
            <div className="xs-12 sm-4">
              <h4> Status</h4>
            </div>
            <div className="xs-12 sm-4">
              <h4> Stakeholder Details</h4>
            </div>

            <div className="xs-12 sm-4  ">
              <h4> </h4>
            </div>
          </div>
          { stakeholders && Boolean(stakeholders.length) ? (
            stakeholders.map((s, i) => {
              return (
                <div className="xs-12 row b" key={i}>
                  <div className="xs-12 sm-4">
                    <button className="completed">
                      {s.user.agreed
                        ? "Accepted Invitation"
                        : " Pending Acceptance"}
                    </button>
                  </div>
                  <div className="xs-12 sm-4">
                    <h3>
                      {s.user.information.lastName}{" "}
                      {s.user.information.firstName}
                    </h3>
                    {s.user.information.isFunder && <p> Project Funder </p>}
                    {s.user.information.isContractor && (
                      <p> Project Contractor </p>
                    )}
                    {s.user.information.isEvaluator && (
                      <p> Project Evaluator </p>
                    )}
                  </div>

                  <div className="xs-12 sm-4">
                    <button
                      className="more"
                      onClick={() => this.showSH(s.user.information._id)}
                    >
                      More
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No stakeholders found</p>
          )}
        </div>
      </StakeholderStyle>
    );
  }
}

const mapStateToProps = state => {
  return {
    projectId: state.projects.single.info._id,
    type: state.projects.stakeholder.action.type,
    stakeholders: state.projects.single.info.stakeholders
  };
};

export default connect(mapStateToProps)(Stakeholders);
