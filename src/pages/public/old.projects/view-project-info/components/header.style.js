import styled from "styled-components";

export default styled.div`
  .project {
    #picture-of-project {
      margin-bottom: 1em;
    }
    #initiated-by {
      margin: 0.3em 0 1em;
    }
    .initiated {
      h4 {
        padding-top: 0 !important;
      }
      h5 {
        margin: 0.3em 0 !important;
        font-size: 18px;
      }
      p {
        margin: 0.2em 0;
        font-size: 18px;
        color: #8795a1;
      }
      img {
        height: 60px;
        width: 60px;
        object-fit: contain;
        border-radius: 60px;
      }
    }
    .content {
      #progress {
        padding: 0 1em 0 0;
      }
      h3,
      h4,
      h5 {
        font-family: ProximaNova, sans-serif !important;
        margin: 0;
      }
      h3 {
        color: white;
        font-weight: 100;
        font-size: 17px;
        span {
          color: #156edc;
          font-weight: 500;
          font-size: 25px;
        }
      }
      h4,
      h5 {
        color: #f9fafc;
        font-weight: 100;
      }

      #title {
        line-height: normal;
        font-size: 28px;
        color: #ffffff;
        font-weight: 300;
        padding-top: 2em;
        margin-bottom: 0.5em;
      }

      #funder {
        line-height: normal;
        font-size: 18px;
        color: #f9fafc;
        padding-top: 0.5em;
      }

      .inner {
        padding-top: 0;
        h4 {
          padding-top: 1.5em;
          line-height: normal;
          font-size: 18px;
          letter-spacing: 0.02em;
          color: #f9fafc;
        }

        h3 {
          line-height: normal;

          font-size: 20px;
          letter-spacing: 0.03em;
          color: #ffffff;
        }
      }
    }
    .c {
      text-align: center;
    }

    #donate-btn {
      margin: 3em auto;
      background: #f1c157;
      border-radius: 4px;
      height: 3em;
      padding: 0em 5em;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      text-align: center;
      border: 0;
      color: #22292f;
      transition: 100ms;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;
