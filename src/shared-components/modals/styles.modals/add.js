import styled from "styled-components";

export const Form = styled.form`
  #date-part {
    overflow: unset !important;
  }

  #label-image {
    height: 250px;
    width: 100%;
    background: silver;
    cursor: pointer;
    position: relative;
    img {
      position: absolute;
      background: transparent;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
    p {
      font-size: 2em;
      color: white;
      font-weight: 900;
    }
  }
  input[type="file"] {
    height: 0.1px;
    width: 0.1px;
    overflow: hidden;
  }

  padding: 1.5em 0;
  input[type="text"],
  textarea,
  select {
    background: #ffffff;
    border: 1.5px solid #f1f3f5;
    border-radius: 5px;
    width: 100%;
    font-size: 1em;
    padding: 0.85em;
    line-height: normal;
    color: #bdbdbd;
    transition: 150ms;
    font-weight: 100;
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
    background: #ffffff;
    border: 2px solid #f1f3f5;
    border-radius: 5px;

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
          right: 1px;
          height: 14px;
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

    input[type="date"] {
      border: 0;
    }
  }

  textarea {
    min-height: 5em;
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
