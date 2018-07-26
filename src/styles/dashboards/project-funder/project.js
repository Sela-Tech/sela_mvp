import styled from "styled-components";

export const ProjectWrapper = styled.div`
  height: 100%;
  .top-title {
    margin-top: 0;
    margin-bottom: 0.85em;
    font-weight: 300;
    line-height: normal;
    font-size: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #a3a3a3;
  }
  #top {
    padding: 10vh 0 1.5vh;
    h3 {
      text-align: left;
    }

    #in-progress {
      padding: 1em;
        margin: 1em 0;
      .pd{
          padding: .75em 0;
      }

      background: #ffffff;
      border: 2px solid #f1f3f5;
      border-radius: 17px;

      .m{
          text-align:center;
      }
      span {
        line-height: normal;
        font-size: .9em;
        text-align; center;
        font-weight: 300;
        color: #828282;
        margin: auto;
        display: block;
      }
    }

    #status{
        background: #EFF5FB;
        border-radius: 9px;
        line-height: normal;
        font-size: 1em;
        color: #156EDC;
        border : 0;
        padding: .75em 1.5em;
    }
  }
`;
