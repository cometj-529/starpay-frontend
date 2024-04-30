import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Separator } from "src/components/ui/separator";

const Pwd = ({ pw, onChangePw, pwConf, setPwConf, isSamePw, onJoin }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link to="/auth/class" className="block w-6 h-6">
          <ArrowLeft />
        </Link>
      </div>
      <Separator className="bg-gray-500" />
      <div className="flex flex-col gap-5">
        <div className="font-semibold tracking-wider text-xl">
          비밀번호를 입력해주세요
        </div>
        <Input
          onChange={(e) => onChangePw(e.target.value)}
          value={pw}
          placeholder="비밀번호 입력"
        />
        <Input
          onChange={(e) => setPwConf(e.target.value)}
          value={pwConf}
          placeholder="비밀번호 확인"
          className={`${
            pw !== "" && pwConf !== ""
              ? isSamePw
                ? "border-green-500"
                : "border-red-500"
              : ""
          }`}
        />
        <Button
          className="flex items-center justify-center bg-[#5369e7] text-white w-full h-12 mt-6"
          onClick={onJoin}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default Pwd;
