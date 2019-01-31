const token = "x-access-token";

export const retrieveToken = () => {
  const ls =
    localStorage.getItem(token) === null
      ? undefined
      : localStorage.getItem(token);
  const ss =
    sessionStorage.getItem(token) === null
      ? undefined
      : sessionStorage.getItem(token);

  return ls || ss || undefined;
};

export const setToken = (type, tokenValue) => {
  if (type === "ss") {
    sessionStorage.setItem(token, tokenValue);
  } else {
    localStorage.setItem(token, tokenValue);
  }
};

export const clearToken = () => {
  sessionStorage.removeItem(token);
  localStorage.removeItem(token);
};
