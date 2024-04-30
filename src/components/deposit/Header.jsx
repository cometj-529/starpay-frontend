import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to="/">
          <ChevronLeft />
        </Link>
        <div className="text-2xl font-bold">이체</div>
      </div>
    </header>
  );
};

export default Header;
