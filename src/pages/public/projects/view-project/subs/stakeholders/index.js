import React from "react";
import styled from "styled-components";

const StakeholderWrapper = styled.div`
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
export default () => {
  return (
    <StakeholderWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 ">
          <h3> Stakeholders </h3>

          <section className="xs-12">
            <h4>INITIATED BY</h4>
            <div className="xs-12 sm-4">
              <div className="card xs-12">
                <div className="xs-3">
                  <img src={"http://placehold.it/200"} alt="pic" />
                </div>
                <div className="xs-9">
                  <h4>Hawa Mohammed</h4>
                  <p>Reputation Score: 80%</p>
                  <span>Director, Sustainability Int'l</span>
                </div>
              </div>
            </div>
          </section>

          <section className="xs-12">
            <h4>CONTRACTOR(S)</h4>
            <div className="xs-12 sm-4">
              <div className="card xs-12">
                <div className="xs-3">
                  <img src={"http://placehold.it/200"} alt="pic" />
                </div>
                <div className="xs-9">
                  <h4>Hawa Mohammed</h4>
                  <p>Reputation Score: 80%</p>
                  <span>Director, Sustainability Int'l</span>
                </div>
              </div>
            </div>
          </section>

          <section className="xs-12">
            <h4>EVALUATION AGENT(S)</h4>
            <div className="xs-12 sm-4">
              <div className="card xs-12">
                <div className="xs-3">
                  <img src={"http://placehold.it/200"} alt="pic" />
                </div>
                <div className="xs-9">
                  <h4>Hawa Mohammed</h4>
                  <p>Reputation Score: 80%</p>
                  <span>Director, Sustainability Int'l</span>
                </div>
              </div>
            </div>
          </section>

          <section className="xs-12">
            <h4>INVESTOR(S)</h4>
            <div className="xs-12 sm-4">
              <div className="card xs-12">
                <div className="xs-3">
                  <img src={"http://placehold.it/200"} alt="pic" />
                </div>
                <div className="xs-9">
                  <h4>Hawa Mohammed</h4>
                  <p>Reputation Score: 80%</p>
                  <span>Director, Sustainability Int'l</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </StakeholderWrapper>
  );
};
