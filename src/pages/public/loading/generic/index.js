import React from "react";
import styled from "styled-components";
import Spinner from "../../../../shared-components/spinners";

const Wrp = styled.div`
  height: 100vh;
  width: 100vw;
  background: #fbfbfb;
`;
const GenericLoading = () => {
  return (
    <Wrp className="xs-12">
      <div className="c-w i-h">
        <div className="c i-h t-c">
          <Spinner type="two"  color="rgba(242,153,74,0.97)"/>
        </div>
      </div>
    </Wrp>
  );
};

export default GenericLoading;
