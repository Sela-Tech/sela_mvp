export default (val, type) => {
  switch (type) {
    case "email":
      return val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false; // returns a boolean

    case "password":
      return val.length >= 6;

    case "phoneNumber":
      return val.match(/^\d+$/) ? true : false; // returns a boolean

    default:
      return val.match(/\S+/) ? true : false;
  }
};
