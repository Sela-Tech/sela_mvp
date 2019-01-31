import React from "react";

import styled from 'styled-components';
const H3 = styled.h3`
color: #333;
width: 100%;
`
export default () => {
  return (
    <div style={{width: "100%",height: "100vh"}}>
                <div className="center-wrapper">
                    <div className="center">
                        <H3>There was an error retrieving this project, it probably does not exist.</H3>
                    </div>
                </div>
                </div>
  );
};

