import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Separator } from "src/components/ui/separator";

const Class = ({ sClass, onChangeSClass, getStudents }) => {
  const navigate = useNavigate();

  const goNext = () => {
    if (sClass === "") return;
    getStudents();

    navigate("/auth/number");
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link to="/auth/grade" className="block w-6 h-6">
          <ArrowLeft />
        </Link>
      </div>
      <Separator className="bg-gray-500" />
      <div className="flex flex-col gap-5">
        <div className="font-semibold tracking-wider text-xl">
          과/반을 선택해주세요
        </div>
        <div className="flex gap-1 border p-2">
          <Select
            className="flex-1"
            onValueChange={(e) => onChangeSClass(e)}
            defaultValue={sClass}
          >
            <SelectTrigger>
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent
              ref={(ref) =>
                ref?.addEventListener("touchend", (e) => e.preventDefault())
              }
            >
              <SelectItem value="1">소프트웨어개발과 1</SelectItem>
              <SelectItem value="2">소프트웨어개발과 2</SelectItem>
              <SelectItem value="3">인공지능소프트웨어과</SelectItem>
              <SelectItem value="4">게임개발과</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="flex items-center justify-center bg-[#5369e7] text-white w-full h-12 mt-6"
          onClick={goNext}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default Class;
