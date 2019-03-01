import styled from "styled-components";

export default styled.div`
  .bar {
    margin: 0.5em 0 1em;
    border: 1px solid rgba(135, 149, 161, 0.25);
  }
  margin-bottom: 3em;
  h5 {
    line-height: normal;
    font-size: 14.75px;
    font-weight: 400;
    letter-spacing: 0.02em;
    color: #3d4851;
  }

  h4 {
    line-height: normal;
    font-weight: 100;
    color: #8795a1;

    span {
      font-weight: 300;
      color: #22292f;
    }
    font-size: 15px;
  }

  h4.name {
    font-family: Acumin Pro;
    font-size: 16.5px !important;
    letter-spacing: 0.02em !important;
    font-weight: 400 !important;
    color: #3d4851 !important;
  }

  p.desc {
    font-family: Acumin Pro;
    line-height: 24px;
    font-size: 16px;
    letter-spacing: 0.02em;
    color: #3d4851;
    margin: 0;
    font-weight: 100;
  }

  .status-btn {
    margin-top: 19px;

    border: 0;
    font-weight: 300;
    padding: 10px 20px;
    line-height: normal;
    font-size: 12px;
    color: #156edc;
    background: #eff5fb;
    border-radius: 5px;
  }
`;
