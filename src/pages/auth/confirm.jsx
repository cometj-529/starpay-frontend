import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";
import { Separator } from "src/components/ui/separator";

const Confirm = ({ name, onClickConfirmBtn }) => {
  const navigate = useNavigate();

  const onClickCancelBtn = () => {
    navigate("/auth/grade", { replace: true });
  };

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
          번호를 선택해주세요
        </div>
        <div className="text-center text-xl p-5">
          <span className="font-bold">{name}</span>님이 맞으신가요?
        </div>
        <div>
          <Button
            className="flex items-center justify-center bg-[#5369e7] text-white w-full h-12 mt-6"
            onClick={onClickConfirmBtn}
          >
            예
          </Button>
          <Button
            className="flex items-center justify-center bg-[#5369e7] text-white w-full h-12 mt-6"
            onClick={onClickCancelBtn}
          >
            아니요
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
