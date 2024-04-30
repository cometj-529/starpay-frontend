import { useEffect, useState } from "react";
import { getAllOther } from "src/lib/account";
import DepositAccount from "./Deposit-account";
import useToken from "src/hooks/useToken";
import { Input } from "../ui/input";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const DepositAccountList = ({ onSelectAccount }) => {
  const [accounts, setAccounts] = useState([]);
  const [token, userId] = useToken();
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await getAllOther(token);
      setAccounts(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickHandler = (e) => {
    onSelectAccount(e);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }

    getData();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <Header />
      <div className="flex flex-col gap-3 px-6">
        <div className="border-b">
          <Input className="border-none" placeholder="계좌번호 입력" />
        </div>
        <div className="flex flex-col gap-3">
          {accounts.map((e) => {
            if (String(e.user.id) == String(userId)) return;

            return (
              <DepositAccount
                key={e.code}
                code={e.code}
                student={e.user.student}
                onClick={() => {
                  onClickHandler(e);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DepositAccountList;
