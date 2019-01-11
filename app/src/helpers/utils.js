import { createBrowserHistory } from "history";

export const detectAuthType = match => {
  switch (match.path) {
    case "/signin":
      return "Signin";
    case "/signup":
      return "Signup";
    default:
      return "Login";
  }
};

export const validator = (val, type) => {
  switch (type) {
    case "email":
      return val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false; // returns a boolean

    case "password":
      return val.length >= 6;

    case "phoneNumber":
      return val.match(/^\d+$/) ? true : false; // returns a boolean

    default:
      return val && val.match(/\S+/) ? true : false;
  }
};

export const history = createBrowserHistory();

export function getQueryString(str) {
  return str.split("?")[1];
}

export function extractMessage(res) {
  let message;
  if (res && res.response) {
    message = res.response.message || res.response.data.message;
  } else {
    message = "Connection Error";
  }
  return message;
}