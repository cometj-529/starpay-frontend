import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Separator } from "src/components/ui/separator";

const Login = ({ pw, onChangePw, onLogin }) => {
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
        <Button
          className="flex items-center justify-center bg-[#5369e7] text-white w-full h-12 mt-6"
          onClick={onLogin}
        >
          로그인
        </Button>
      </div>
    </div>
  );
};

export default Login;
