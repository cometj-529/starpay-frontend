import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ name, code }) => {
  return (
    <header className="w-full px-6 flex items-center relative">
      <Link to="/deposit">
        <ChevronLeft />
      </Link>
      <div className="flex flex-col items-center absolute left-[50%] -translate-x-1/2">
        <div className="font-bold">{name}</div>
        <div className="text-xs">{code}</div>
      </div>
    </header>
  );
};

export default Header;
