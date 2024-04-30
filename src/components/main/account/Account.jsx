import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "src/components/ui/dropdown-menu";

const Account = ({ user, balance }) => {
  const name = user.student.name;

  return (
    <div className="w-full bg-[#9bf9ca] rounded-3xl px-6 py-8">
      <div>
        <div className="flex justify-end">
          <div className="flex items-center justify-center w-5 h-2 overflow-hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="stroke-1 fill-[#5f565c] text-[#5f565c]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link to="/auth/grade" className="text-red-600">
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#84c7a4] rounded-full"></div>
          <div>
            <div className="text-sm text-[#5f565c]">{name}의 계좌 ★</div>
            <div className="font-bold text-xl">
              {balance.toLocaleString("ko-KR")}원
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Link to="/deposit">
          <div className="px-4 py-[7px] bg-[#63b68b] rounded-3xl text-sm font-bold text-[#32483c]">
            이체
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Account;
