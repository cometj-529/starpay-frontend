import axios from "axios";

export const getAllOther = (token) => {
  const data = axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/accounts/all/other`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getMyAccount = (token) => {
  const data = axios({
    "Cache-Control": "no-store",
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/accounts/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const getAccountByCode = (code) => {
  const data = axios({
    "Cache-Control": "no-store",
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/accounts/other?code=${code}`,
  });

  return data;
};

export const getMyAccountLog = (token, page, size, sort) => {
  const data = axios({
    "Cache-Control": "no-store",
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/accounts/me/log?page=${page}&size=${size}&sort=${sort}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const deposit = (token, body) => {
  const data = axios({
    method: "PUT",
    url: `${process.env.REACT_APP_SERVER}/accounts/deposit`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: body,
  });

  return data;
};
