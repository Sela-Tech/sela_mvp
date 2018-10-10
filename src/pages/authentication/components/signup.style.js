import styled from "styled-components";

export default styled.div`
  .profile-photo {
    height: 200px;
    width: 200px;
    background: #e0e0e0;
    border-radius: 200px;
    cursor: pointer;
    display: block;
    margin: auto;
    position: relative;

    @media (max-width: 767px) {
      margin: 1.5em auto 0;
    }
    span {
      display: block;
      color: #bbbaba;
      font-size: 2.3em;
      font-weight: 600;
    }
    input {
      height: 0;
      width: 0;
      overflow: hidden;
      border: 0;
      padding: 0;
    }
  }

  form {
    #profilePhoto {
      height: 100%;
      display: block;
      border-radius: 100%;
      width: 100%;
      background: transparent;
      position: absolute;
      top: 0;
      object-fit: cover;
      object-position: center;
    }
  }
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

      @media (max-width: 1023px) {
        height: 2em;
        width: 100%;

        .checkbox-part {
          height: 100%;
          display: table;

          label {
            height: 100%;
            display: table-cell;
            vertical-align: middle;
          }
        }
      }

      @media (min-width: 1024px) {
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

  #phone-wrapper {
    background: #eff5fb;
    padding: 1em;
    border-radius: 50%;
    height: 10em;
    width: 10em;
    display: table;
    text-align: center;
    margin: auto;

    #phone {
      display: table-cell;
      vertical-align: middle;

      img {
        margin-bottom: 0;
        height: 5em;
        width: 5em;
      }
    }
  }

  #success-icon {
    position: relative;
    top: 0.25em;
    margin-right: 0.25em;
  }

  #video-wrapper {
    video {
      margin-top: 2em;
      object-fit: cover;
    }
  }

  #list {
    padding: 0;
    li {
      list-style-type: none;
      overflow: auto;
      margin: 2em 0;

      .xs-10 {
        p {
          text-align: left;
          margin: 0 0 1em;
        }
        .space {
          margin: 1em 0;
          a {
            text-align: left;
            display: block;
            padding: 0.5em 0;
          }
        }
      }
      .round {
        background: #f5f9fc;
        margin: 0;
        width: 2.4em;
        line-height: 2.4em;
        height: 2.4em;
        border-radius: 3em;

        span {
          line-height: normal;
          font-size: 14px;
          text-align: center;
          color: #156edc;
        }
      }
    }
  }

  .sp-text-styles {
    p {
      strong {
        font-size: 1.025em;
      }

      &.type-1 {
      }

      &.type-2 {
        line-height: 1.7em;
        font-weight: 300;
      }
    }
  }

  #open-chat {
    background: #1ecd97;
    border-radius: 4px;
    color: white;
    display: inline-block;
    padding: 1em 3em;
    margin: 1em auto;
  }
`;
