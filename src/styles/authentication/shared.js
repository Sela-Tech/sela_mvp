import styled from "styled-components";

export default styled.div`
  height: 100%;
  width: 100%;
  display: table;
  background: white;

  .special-error {
    font-size: 0.85em;
    color: coral;
    margin: 0.5em 0 0;
    text-align: left;
  }

  p {
    font-weight: 300;
  }
  input.form-control {
    background: #f4f4f4;
    border-radius: 4px;
    line-height: normal;
    font-size: 1em;
    color: rgba(35, 33, 42, 0.4878);
    border: 0;
    padding: 1em;
    width: 100%;
    font-weight: 400;
    transition: 300ms;
    font-weight: 300;
    &:active,
    &:focus {
      box-shadow: 0 0 1px 0 #2d9cdb;
    }

    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 1em;
      color: rgba(35, 33, 42, 0.4878);
    }
    ::-moz-placeholder {
      /* Firefox 19+ */
      font-size: 1em;
      color: rgba(35, 33, 42, 0.4878);
    }
    :-ms-input-placeholder {
      /* IE 10+ */
      font-size: 1em;
      color: rgba(35, 33, 42, 0.4878);
    }
    :-moz-placeholder {
      /* Firefox 18- */
      font-size: 1em;
      color: rgba(35, 33, 42, 0.4878);
    }
  }

  .form-group {
    margin: 0.8em 0;
  }

  .link {
    color: #2d9cdb;
  }

  .link,
  label {
    line-height: normal;
    font-size: 0.9em;
    font-weight: 100;
  }

  .container {
    height: 100%;
    width: 100%;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    padding: 3em 0;

    #logo {
      height: 5em;
      width: 5em;
      margin-bottom: 2em;
    }

    h2 {
      line-height: normal;
      font-size: 1.5em;
      text-align: center;
      color: #0a1f46;
      font-weight: 400;
    }

    #submit-btn {
      background: #1ecd97;
      border-radius: 4px;
      padding: 1.5em 0;
      max-width: 15em;
      width: 100%;
      font-size: 1em;
      color: white;
      border: 0;
      font-weight: 300;
    }

    .extremes {
      padding: 0.95em 0;

      div:nth-child(1) {
        text-align: left;
        input[type="checkbox"] {
          background: #f2f2f2;
        }
        label {
          letter-spacing: 0.18px;
          color: #828282;
        }
      }
      div:nth-child(2) {
        text-align: right;
      }
    }
  }
`;
