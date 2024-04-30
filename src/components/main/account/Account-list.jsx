import { useContext } from "react";
import Account from "./Account";
import { MyAccountContext } from "src/App";

const AccountList = () => {
  const { myAccount } = useContext(MyAccountContext);

  return (
    <div className="px-6">
      <Account user={myAccount.user} balance={myAccount.balance} />
    </div>
  );
};

export default AccountList;
