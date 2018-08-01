import styled from "styled-components";

export const Form = styled.form`
  > p#info {
    font-size: 1em;
    text-align: center;
    color: #4f4f4f;
    padding: 0 2em;
    font-weight: 300;
  }

  #date-part {
    overflow: unset !important;
  }

  padding: 1.5em 0;
  input[type="text"],
  textarea {
    background: #ffffff;
    border: 1.5px solid #f1f3f5;
    border-radius: 5px;
    width: 100%;
    font-size: 1em;
    padding: 1em;
    line-height: normal;
    color: #bdbdbd;
    transition: 150ms;
    font-weight: 300;
    &:focus,
    &:active {
      border-color: #156edc;
    }
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #bdbdbd;
  }

  #dash {
    color: #bdbdbd;
    font-size: 2em;
    padding: 0;
    margin: 0.3em 0;
  }

  .date-wrpr {
    text-align: left;
    padding: 0.5em;
    max-height: 65px;
    position: relative;

    &:focus-within {
      border-color: #156edc;
    }
    label {
      padding: 0.5em;
    }

    &.show {
      label {
        font-size: 12px;
        padding: 0;
      }
      #c-one {
        position: absolute;
        top: 1em;
        right: 0;
        bottom: 0;

        img {
          top: 0;
        }
      }
    }

    img {
      position: relative;
      top: 0.5em;
    }

    label {
      color: #bdbdbd;
      cursor: pointer;
      display: inline-block;
      transition: 100ms;
    }

    background: #ffffff;
    border: 3px solid #f1f3f5;
    border-radius: 5px;

    input[type="date"] {
      border: 0;
    }
  }

  textarea {
    min-height: 6em;
  }

  .form-control {
    padding: 0.75em 0;
    overflow: auto;
  }
  #c-one {
    float: right;
    position: relative;
  }

  #create-project-btn {
    width: 100%;
    background: #156edc;
    height: 55px;
    border-radius: 5px;
    border: 0;
    font-size: 1em;
    color: white;
    letter-spacing: 1px;
  }
  .adjusted {
    input {
      padding: 0;
      border: 0;
    }
  }
`;
