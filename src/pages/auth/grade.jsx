import { ArrowLeft, MoveLeft } from "lucide-react";
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

const Grade = ({ sGrade, onChangeSGrade }) => {
  const navigate = useNavigate();

  const goNext = () => {
    if (sGrade === "") return;

    navigate("/auth/class");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="h-6"></div>
      <Separator className="bg-gray-500" />
      <div className="flex flex-col gap-5">
        <div className="font-semibold tracking-wider text-xl">
          학년을 선택해주세요
        </div>
        <div className="flex items-center gap-2 border p-2">
          <Select
            className="flex-1"
            onValueChange={(e) => onChangeSGrade(e)}
            defaultValue={sGrade}
          >
            <SelectTrigger>
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent
              ref={(ref) =>
                ref?.addEventListener("touchend", (e) => e.preventDefault())
              }
            >
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
          <div className="w-10 text-center">학년</div>
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

export default Grade;
