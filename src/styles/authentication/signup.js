import styled from "styled-components";

export default styled.div`
  #signup-info-text {
    > * {
      font-size: 1em;
      line-height: 1.5em;
      @media (min-width: 767px) {
        display: block;
      }
    }
  }

  .signup-type-button {
    border: 0;
    margin: 0.5em 0;
    cursor: pointer;

    .inner {
      border-radius: 4px;
      display: table;
      padding: 0.5em 0;
      background: #eff5fb;

      @media(max-width:1023px){
        height: 2em;
        width: 100%;
     
        .checkbox-part{
          height: 100%;
          display: table;

          label{
            height: 100%;
            display: table-cell;
            vertical-align: middle;
          }
        }
      }

      @media(min-width: 1024px){
        height: auto;
        width: auto;
      }

      overflow: auto;
      &.active {
        background: #156edc;
        h3,
        p {
          color: white !important;
        }
      }
    }

    .checkbox-part {
      /* The container */
      .l-container {
        display: block;
        position: relative;
      }

      /* Hide the browser's default checkbox */
      .l-container input {
        opacity: 0;
        cursor: pointer;
        position: absolute;
      }

      /* Create a custom checkbox */
      .checkmark {
        position: relative;
        height: 25px;
        width: 25px;
        border-radius: 50px;
        background-color: #fefefe;
        display: block;
        margin: auto;
        cursor: pointer;
      }

      /* On mouse-over, add a grey background color */
      .l-container:hover input ~ .checkmark {
        background-color: #eee;
      }

      /* When the checkbox is checked, add a blue background */
      .l-container input:checked ~ .checkmark {
        // background-color: #2196f3;
      }

      /* Create the checkmark/indicator (hidden when not checked) */
      .checkmark:after {
        content: "";
        position: absolute;
        display: none;
      }

      /* Show the checkmark when checked */
      .l-container input:checked ~ .checkmark:after {
        display: block;
      }

      /* Style the checkmark/indicator */
      .l-container .checkmark:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid #156edc;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
    }

    h3,
    p {
      margin: 0.15em 0;
    }

    h3 {
      line-height: normal;
      font-size: 1.1em;
      font-weight: 400;
      text-align: center;
      color: #23212a;
    }

    p {
      line-height: normal;
      font-size: 0.9em;
      fon-weight: 300;
      text-align: center;
      letter-spacing: -0.15px;
      color: #23212a;
      mix-blend-mode: normal;
      opacity: 0.8;
    }

    @media (max-width: 1023px) {
      .text-part {
        * {
          text-align: left;
        }
      }
    }

    @media (min-width: 1024px) {
      .text-part {
        padding: 2em 1em 0;
        min-height: 10em;

        p {
          padding-top: 1em;
        }
      }

      &:nth-child(1) {
        .inner {
          margin-right: 2.5%;
        }
      }

      &:nth-child(2) {
        .inner {
          margin-right: 2.5%;
          margin-left: 2.5%;
        }
      }

      &:nth-child(3) {
        .inner {
          margin-left: 2.5%;
        }
      }
    }
  }

  @media (min-width: 1023px) {
    #firstname {
      width: 97.5%;
      float: left;
    }
  }

  #submit-part {
    text-align: left;
    input[type="submit"] {
      padding: 1.5em 0;
      width: 100%;
      text-align: center;
    }

    p,
    p > * {
      font-size: 1em;
    }
  }

  .link {
    font-size: 1em !important;
  }

  input:disabled {
    background: #cbd3da !important;
    color: white !important;
    cursor: not-allowed;
  }
`;
