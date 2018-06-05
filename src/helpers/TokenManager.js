export const retrieveToken = () => {
  const ls =
    localStorage.getItem("token") === null
      ? undefined
      : localStorage.getItem("token");
  const ss =
    sessionStorage.getItem("token") === null
      ? undefined
      : sessionStorage.getItem("token");
  return ls || ss || undefined;
};

export const setToken = (type, token) => {
  if (type === "ss") {
    sessionStorage.setItem("token", token);
  } else {
    localStorage.setItem("token", token);
  }
};
