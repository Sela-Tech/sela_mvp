import styled from "styled-components";

export const Form = styled.form`
  background: white;
  padding: 1.5em;

  button {
    width: 100%;
    color: white;
    background: #156edc;
    font-size: 15px;
    height: 50px;
    border-radius: 5px;
    border: 0;
  }
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

  .form-control {
    padding: 0.75em 0;
    overflow: unset;
  }
  #select-contractor {
    > div {
      overflow: auto;
    }
  }
`;
