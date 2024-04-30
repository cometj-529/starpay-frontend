import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DepositAccountList from "src/components/deposit/Deposit-account-list";
import DepositDetail from "./detail";

const Deposit = () => {
  const [selectedAccount, setSelectedAccount] = useState({});
  const navigate = useNavigate();

  const onSelectAccount = (e) => {
    setSelectedAccount(e);
    navigate("/deposit/detail");
  };

  return (
    <div className="pt-8 h-full">
      <Routes>
        <Route
          path="/"
          element={<DepositAccountList onSelectAccount={onSelectAccount} />}
        />
        <Route
          path="/detail"
          element={<DepositDetail account={selectedAccount} />}
        />
      </Routes>
    </div>
  );
};

export default Deposit;
