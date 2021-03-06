import styled from "styled-components";

export default styled.div`
  .uploaded-by {
    border-bottom: 1px solid #eee;

    button {
      border: 0;
      height: 70px;
      width: 100%;
      font-size: 14px;
      font-weight: 300;
      &.active {
        color: rgba(242, 153, 74, 0.97);;
      }
    }

    @media (min-width: 768px) {
      button {
        border-right: 1px solid #eee;
      }
    }
  }

  select {
    height: 40px;
    margin: 7px auto;
    text-indent: 1em;
    background: #ffffff;
    border: 1px solid #e2e5ed;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 14px;
    color: #777;
    font-weight: 300;
  }

  #search {
    height: 40px;
    margin: 7px 0;
    padding: 0 1em;
    background: #ffffff;
    border: 1px solid #e2e5ed;
    box-sizing: border-box;
    border-radius: 4px;

    input {
      width: 85%;
      height: 100%;
      border: 0;
      font-size: 14px;
      font-weight: 300;
      display: block;
      float: left;
    }
    button {
      height: 100%;
      width: 15%;
      background: transparent;
      border: 0;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: center;
        height: 20px;
      }
    }
  }

  background: #ffffff;
  box-sizing: border-box;
  position: relative;

  .sp {
    padding: 2% 3% 15px;
    border-bottom: 1px solid #eaedf3;

    label {
      font-size: 12px;
      color: #929292;
      font-weight: 300;
    }

    h3 {
      margin: 10px 0;
      font-family: Acumin Pro;
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

  .container {
    overflow: auto;
    padding: 3%;
    position: relative;
    h4 {
      font-family: Acumin Pro;
      font-style: normal;
      font-weight: 300;
      line-height: 18px;
      font-size: 12px;
      text-transform: uppercase;
      color: #9ea0a5;
    }

    .row {
      img {
        display: inline-block;
        height: 80px;
        width: 80px;
        margin-right: 15px;
        object-fit: cover;
      }

      p {
        display: inline-block;
      }

      button,
      a {
        font-size: 12px;
        height: 45px;
        font-weight: 300;
        padding: 0 15px;
        border-radius: 5px;
        border: 0;
        display: inline-block;
        line-height: 45px;
        margin-left: 1em;
        color: #999;

        &.more {
          border: 1px solid #ccc;
        }
      }
      .completed {
        background: #7b96f7;
        color: white;
      }

      .ongoing {
        background: #effbf2;
        color: #219653;
      }

      .not-started {
        background: pink;
        color: #eb5757;
      }

      &.b {
        padding-top: 10px;
        padding-bottom: 25px;
        border-bottom: 1px solid #eaedf3;
      }
      h3,
      p {
        margin: 0;
      }
      h3 {
        font-family: Acumin Pro;
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
        font-family: Acumin Pro;
        line-height: normal;
        font-size: 14px;
        color: #3e3f42;
        margin-top: 30px;
        font-weight: 300;
      }
    }
  }

  // select {
  //   height: 45px;
  //   text-indent: 1em;
  //   font-size: 15px;
  //   font-weight: 300;
  //   border: 0;
  //   box-shadow: 0px 0px 5px 0px #ccc;
  //   background: white;
  //   border-radius: 5px;
  // }

  #download {
    background: transparent;
    img {
      object-fit: contain;
      height: 20px;
      width: 20px;
      display: block;
      float: right;
    }
  }

  .v-button{
    background: #03A9F4;
    border-radius: 4px;
    color: white !important;
    font-size: 0.8em !important;
    text-align: center;
    padding: 0.25em 0.85em 0;
    display: inline-block;
    font-weight: 300;
  }
`;
