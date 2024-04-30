import AccountLogList from "src/components/main/account/Account-log-list";
import AccountList from "../../components/main/account/Account-list";
import Header from "../../components/main/Header";
import { useContext, useEffect } from "react";
import { MyAccountContext } from "src/App";
import { useNavigate } from "react-router-dom";
import useToken from "src/hooks/useToken";

const Main = () => {
  const [token] = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth/grade");
      return;
    }
  }, []);

  if (!token) {
    return <div></div>;
  }

  return (
    <div className="mx-auto pt-[80px] flex flex-col gap-8 bg-[#f7f7f7]">
      <Header />
      <AccountList />
      <AccountLogList />
    </div>
  );
};

export default Main;
