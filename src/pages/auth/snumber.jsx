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

const Snumber = ({ sNumber, onChangeSNumber, students }) => {
  const navigate = useNavigate();

  const goNext = () => {
    if (sNumber === "") return;

    navigate("/auth/confirm");
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
        <div className="flex gap-1 border p-2">
          <Select
            className="flex-1"
            onValueChange={(e) => onChangeSNumber(e)}
            defaultValue={sNumber}
          >
            <SelectTrigger>
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent
              ref={(ref) =>
                ref?.addEventListener("touchend", (e) => e.preventDefault())
              }
            >
              {students.map((e) => (
                <SelectItem key={e.code} value={e.code}>
                  {e.snumber}
                </SelectItem>
              ))}
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

export default Snumber;
