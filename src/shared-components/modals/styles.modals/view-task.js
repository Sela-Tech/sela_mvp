import styled from "styled-components";
export const ViewTaskWrapper = styled.div`
  background: #eff5fb;

  .status {
    padding: 1.5em 0;
  }
  > p {
    font-size: 1em;
    text-align: center;
    color: #828282;
    padding: 0 2em;
    font-weight: 100;
  }

  .left {
    background: white;
  }
  .left,
  .right {
    padding: 3em 1.5em;
    min-height: 450px;
  }

  h2,
  p,
  h4 {
    text-align: left;
    margin: 0;
  }

  h2 {
    line-height: normal;
    font-size: 1.35em;
    font-weight: 300;
    color: #333333;
    margin: 2em 0;
  }

  h4,
  p,
  h3 {
    font-weight: 300;
    font-size: 1em;
    margin: 0.2em 0;
  }

  p {
    line-height: normal;
    color: #4f4f4f;
  }

  h4 {
    line-height: normal;
    color: #adb5bd;
  }

  h3 {
    color: #4f4f4f;
    margin: 2em 0 1em;
    text-align: left;
  }

  .grey-border {
    padding: 0.5em;
    background: #ffffff;
    border: 3px solid #f1f3f5;
    border-radius: 17px;

    button {
      font-weight: 300;
      font-size: 14px;
      border: 0;
      line-height: normal;
      padding: 0.25em 0;
      color: #adb5bd;
      background: transparent;
      &.active {
        background: #eff5fb;
        border-radius: 9px;
        color: #156edc;
      }
    }
  }

  .grey {
    background: #eff5fb;
    height: 100%;
  }

  #eval-subs {
    overflow: auto;
    max-height: 11em;
  }

  .desc {
    margin-bottom: 1.5em;
    color: #888;
  }

  #stat {
    margin: 0.5em 0;
  }
`;
