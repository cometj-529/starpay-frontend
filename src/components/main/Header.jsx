import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyAccountContext } from "src/App";

const Header = () => {
  const { myAccount } = useContext(MyAccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(myAccount).length === 0) {
      navigate("/");
    }
  }, []);

  return (
    <header className="fixed pt-5 pb-2 top-0 left-0 w-full px-6 flex justify-between items-center bg-[#f7f7f7]">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold">{myAccount.user.student.name}</div>
        <div className="px-4 py-2 bg-gray-100 rounded-3xl text-sm font-bold">
          내 계좌
        </div>
      </div>
      <Link to="/qr">
        <div className="w-10 h-10 rounded-full bg-gray-500"></div>
      </Link>
    </header>
  );
};

export default Header;
