import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";

const useToken = () => {
  const [cookies] = useCookies();

  const token = cookies["access_token"];

  if (!!token) {
    const subject = jwtDecode(token).sub;

    return [cookies["access_token"], subject];
  }

  return [undefined, undefined];
};

export default useToken;
