import React from "react";
import styled from "styled-components";
import { showStakeHolderModal } from "../../../../../../store/action-creators/project-funder/modal";
import { connect } from "react-redux";

const StakeholderWrapper = styled.div`

img{
  object-fit:cover;
}
  section {
    padding-bottom: 2em;
    h4 {
      font-family: Cabin;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 18px;
      color: #3d4851;
    }
  }
`;
export default connect()(({ project, dispatch }) => {
  const { owner, stakeholders } = project,
    contractors = stakeholders.filter(s => {
      return s.user.information.isContractor === true;
    }),
    funders = stakeholders.filter(s => {
      return s.user.information.isFunder === true;
    }),
    evaluators = stakeholders.filter(s => {
      return s.user.information.isEvaluator === true;
    });

  return (
    <StakeholderWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 ">
          <h3> Stakeholders </h3>

          <section className="xs-12">
            <h4>INITIATED BY</h4>
            <div
              className="xs-12 sm-4"
              onClick={() => dispatch(showStakeHolderModal(owner._id))}
            >
              <div className="card xs-12">
                <div className="xs-3">
                  <img src={owner.profilePhoto} alt="" />
                </div>
                <div className="xs-9">
                  <h4>
                    {owner.lastName} {owner.firstName}
                  </h4>
                  <p>Reputation Score: {owner.reputationScore}</p>
                  <span>{owner.organization.name}</span>
                </div>
              </div>
            </div>
          </section>

          {contractors.length > 0 && (
            <section className="xs-12">
              <h4>CONTRACTOR(S)</h4>
              {contractors.map((u, i) => {
                let id = u.user.information._id;
                return (
                  <div
                    className="xs-12 sm-4"
                    key={i}
                    onClick={() => dispatch(showStakeHolderModal(id))}
                  >
                    <div className="card xs-12">
                      <div className="xs-3">
                        <img src={u.user.information.profilePhoto} alt="" />
                      </div>
                      <div className="xs-9">
                        <h4>
                          {u.user.information.lastName}{" "}
                          {u.user.information.firstName}
                        </h4>
                        <p>
                          Reputation Score: {u.user.information.reputationScore}
                        </p>
                        <span>{u.user.information.organization.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {evaluators.length > 0 && (
            <section className="xs-12">
              <h4>EVALUATION AGENT(S)</h4>
              {evaluators.map((u, i) => {
              
                let id = u.user.information._id;

                return (
                  <div
                    className="xs-12 sm-4"
                    key={i}
                    onClick={() => dispatch(showStakeHolderModal(id))}
                  >
                    <div className="card xs-12">
                      <div className="xs-3">
                        <img src={u.user.information.profilePhoto} alt="" />
                      </div>
                      <div className="xs-9">
                        <h4>
                          {u.user.information.lastName}{" "}
                          {u.user.information.firstName}
                        </h4>
                        <p>
                          Reputation Score: {u.user.information.reputationScore}
                        </p>
                        <span>{ u.user.information.organization &&  u.user.information.organization.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          )}

          {funders.length > 0 && (
            <section className="xs-12">
              <h4>INVESTOR(S)</h4>
              {funders.map((u, i) => {
                let id = u.user.information._id;

                return (
                  <div
                    className="xs-12 sm-4"
                    key={i}
                    onClick={() => dispatch(showStakeHolderModal(id))}
                  >
                    <div className="card xs-12">
                      <div className="xs-3">
                        <img src={u.user.information.profilePhoto} alt="" />
                      </div>
                      <div className="xs-9">
                        <h4>
                          {u.user.information.lastName}{" "}
                          {u.user.information.firstName}
                        </h4>
                        <p>
                          Reputation Score: {u.user.information.reputationScore}
                        </p>
                        <span>{u.user.information.organization.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          )}
        </div>
      </div>
    </StakeholderWrapper>
  );
});
