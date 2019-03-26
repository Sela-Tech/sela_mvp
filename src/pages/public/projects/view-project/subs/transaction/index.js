import React from "react";
import styled from "styled-components";
import Transactions from "../../../../../dashboards/shared/mini-views/dashboard/sub-components/transactions";

const TranWrapper = styled.div`
  padding-bottom: 2em;
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
