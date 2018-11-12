import styled from "styled-components";

export default styled.div`
  background: #ffffff;
  border: 1px solid #eaedf3;
  box-sizing: border-box;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  position: relative;
  .sp {
    padding: 2% 3% 15px;
    border-bottom: 1px solid #eaedf3;

    h3 {
      margin: 10px 0;
      font-family: ProximaNova;
      line-height: 28px;
      font-weight: 400;
      font-size: 18px;
      color: #3e3f42;
    }
    @media (max-width: 767px) {
      .date {
        margin-bottom: 15px;
      }
    }
  }

  .link {
    color: cornflowerblue;
  }
  .container {
    height: 500px;
    overflow: auto;
    padding: 3%;
    position: relative;
    h4 {
      font-family: ProximaNova;
      font-style: normal;
      font-weight: 300;
      line-height: 18px;
      font-size: 12px;
      text-transform: uppercase;
      color: #9ea0a5;
    }

    .row {
      &.b {
        padding-top: 10px;
        padding-bottom: 25px;
        border-bottom: 1px solid #eaedf3;
      }
      h3,
      p {
        margin: 0;
        overflow-wrap: break-word;
      }
      h3 {
        font-family: ProximaNova;
        line-height: 22px;
        font-size: 14px;
        color: #3e3f42;
        font-weight: 300;

        &#cash {
          font-weight: 400;
          color: #6fcf97;
        }
      }

      p {
        font-family: ProximaNova;
        line-height: normal;
        font-size: 12px;
        color: #a5a5a5;
        margin-top: 5px;
        font-weight: 300;
      }
    }
  }

  .det {
    span {
      display: block;
    }
  }
`;
