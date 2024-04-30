import axios from "axios";

export const getAllByInfo = (info) => {
  console.log(info);

  const data = axios({
    method: "GET",
    url: `${process.env.REACT_APP_SERVER}/students`,
    params: info,
  });

  return data;
};
