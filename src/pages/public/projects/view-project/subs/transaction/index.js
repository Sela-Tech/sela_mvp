import React from "react";
import styled from "styled-components";
import Transactions from "../../../../../dashboards/shared/mini-views/dashboard/sub-components/transactions";

const TranWrapper = styled.div`
  padding-bottom: 2em;
  h4 {
    font-family: Cabin;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    font-size: 18px;
    color: #3d4851;
  }

  > div > div {
    box-shadow: none !important;
    border: 0 !important;
  }
`;

export default ({ id }) => {
  return (
    <TranWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
        <Transactions id={id} homePageDeep={true} />
      </div>
    </TranWrapper>
  );
};
