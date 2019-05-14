import styled from "styled-components";

export default styled.div`
  .graph-container{
    height: auto;
    margin-top: 0em;
    background-color: white;
    padding: 1.5em;
    border-radius: 5px;

    > p{
       padding: 0;
      margin: 0;
      font-size: 1.25em;
      color: #555;
      font-weight: 500;
    }

    .one, .two{
      height: 500px;
    }

  }

  .help{
    height: 1.25em;
    width: 1.25em;
    margin-left: 0.5em;
    position: relative;
    top: 0.3em;
  }

  #top {
    h3 {
      margin: 12px 0;
      font-family: Acumin Pro;
      line-height: 20px;
      font-size: 14px;
      color: #000000;
    }
  }

  #cards {
    margin-top: 1em;
  }
  .a-info-card {
    min-height: 165px;
    margin: 0.5em 0;
    background: #ffffff;
    border: 1px solid #eaedf3;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    padding: 1em;

    .progress {
      p {
        font-family: Acumin Pro;
        line-height: 18px;
        font-size: 12px;
        color: #9ea0a5;
        font-weight: 300;
        margin-bottom: 0;
      }
    }
    h3,
    h4,
    h2 {
      margin: 0;
    }

    .space {
      padding: 0.6em 0 0.2em;
    }
    h3 {
      font-weight: 100;
      font-family: Acumin Pro;
      line-height: 24px;
      font-size: 14px;
      color: #3e3f42;
    }

    h2 {
      font-family: Acumin Pro;
      line-height: 35px;
      font-size: 24px;
      color: #3e3f42;
      font-weight: 300;
    }

    span {
      font-weight: 300;
      font-family: Acumin Pro;
      line-height: 22px;
      font-size: 0.95em;
      text-align: right;
      color: #34aa44;
      padding-top: 10px;
      display: block;
    }
  }

  #bottom-info {
    margin-top: 1em;

    .corner {
      box-sizing: border-box;
      font-size: 0.95em;
      font-weight: 300;
    }

    #bar-chart {
      .f-l {
        #blue {
          height: 8px;
          width: 8px;
          background: #1665d8;
          border-radius: 2px;
        }
        span {
          margin: 0 10px;
          font-family: Acumin Pro;
          line-height: 28px;
          font-size: 13.5px;
          color: #777;
          display: inline-block;
          font-weight: 100;
        }

        #grey {
          height: 8px;
          width: 8px;
          background: #eaecee;
          border-radius: 2px;
        }

        h5 {
          font-family: Acumin Pro;
          line-height: 28px;
          font-size: 16px;
          color: #3e3f42;
          display: inline-block;
          font-weight: 300;
        }
      }
    }

    .white {
      background: white;
      padding: 1.5em;

      h5,
      h4,
      h3,
      h2,
      h1,
      p {
        margin: 0;
      }

      .text-info {
        h5 {
          font-family: Acumin Pro;
          line-height: 20px;
          font-size: 14px;
          color: #000000;
          font-weight: 400;
          margin-bottom: 7px;
        }

        p {
          font-family: Acumin Pro;
          line-height: 18px;
          font-size: 12px;
          text-transform: uppercase;
          color: #9ea0a5;
          font-weight: 300;
        }

        a {
          font-family: Acumin Pro;
          line-height: 22px;
          font-size: 14px;
          text-align: center;
          color: #9ea0a5;
          font-weight: 100;
        }
      }

      #chart-info {
        margin-top: 1.5em;
        margin-bottom: 0.3em;

        h1 {
          font-family: Acumin Pro;
          line-height: 40px;
          font-size: 30px;
          text-align: left;
          color: #3e3f42;
          font-weight: 300;
        }

        p {
          font-family: Acumin Pro;
          line-height: 18px;
          font-size: 12px;
          color: #9ea0a5;
          font-weight: 100;
        }

        .has-bar {
          border-bottom: 1px solid #eaedf3;
          margin: 0.25em 0;
        }

        .colors {
          padding: 1.25em 0;

          span,
          p {
            display: inline-block;
          }
          p {
            font-family: Acumin Pro;
            line-height: 18px;
            font-size: 12px;
            text-transform: uppercase;
            color: #3e3f42;
            font-weight: 400;
          }

          span {
            width: 6px;
            height: 6px;
            border-radius: 6px;
            margin-right: 7px;

            &#yellow {
              background: #facf55;
            }
            &#blue {
              background: #1665d8;
            }
            &#green {
              background: lightgreen;
            }
          }
        }
      }
    }
  }
`;
