import axios from "axios";

export const join = (body) => {
  const data = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/auth/join`,
    data: body,
  });

  return data;
};

export const login = (body) => {
  const data = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/auth/login`,
    data: body,
  });

  return data;
};

export const check = (body) => {
  const data = axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER}/auth/check`,
    data: body,
  });

  return data;
};
