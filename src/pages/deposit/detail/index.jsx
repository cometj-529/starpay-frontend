import { Delete } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MyAccountContext } from "src/App";
import Header from "src/components/deposit/detail/Header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/components/ui/alert-dialog";
import { Button } from "src/components/ui/button";
import { toast } from "src/components/ui/use-toast";
import useToken from "src/hooks/useToken";
import { deposit, getAccountByCode } from "src/lib/account";

const DepositDetail = ({ account }) => {
  const [amount, setAmount] = useState(0);
  const [viewAmount, setViewAmount] = useState("0");
  const { myAccount, getAccount } = useContext(MyAccountContext);
  const [isLoading, setIsLoading] = useState(true);
  const [useAccount, setUseAccount] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [token] = useToken();

  const _getAccountByCode = async (code) => {
    try {
      const { data } = await getAccountByCode(code);
      setUseAccount(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(account).length === 0) {
      const accountCode = searchParams.get("code");
      if (accountCode) {
        _getAccountByCode(accountCode);
        return;
      }
      navigate("/");
    } else {
      setUseAccount(account);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setViewAmount(amount.toLocaleString("ko-KR"));
  }, [amount]);

  const vibrate = () => {
    if (navigator.vibrate) {
      navigator.vibrate(20);
    } else {
      console.log("no");
    }
  };

  const onClickKeyPadBtn = (key) => {
    vibrate();

    if (key === "delete") {
      setAmount(Number(String(amount).slice(0, -1)));
      return;
    }

    if (Number(String(amount) + key) > 100000) return;

    setAmount(Number(String(amount) + key));
  };

  const onClickDepositBtn = async () => {
    try {
      const sendData = {
        code: useAccount.code,
        amount,
      };

      if (sendData.amount <= 0) {
        toast({
          variant: "destructive",
          title: "잘못된 입력!",
          description: "금액을 입력해주세요",
        });
        return;
      }

      const { data } = await deposit(token, sendData);
      getAccount();
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "잘못된 입력!",
        description: `${err.response.data}`,
      });
    }
  };

  if (Object.keys(useAccount).length === 0 || isLoading) {
    return <div></div>;
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <Header code={useAccount.code} name={useAccount.user.student.name} />
      <div className="px-6 flex flex-col h-full justify-around">
        <div className="text-4xl text-center flex items-center justify-center h-48 ">
          {amount === 0 ? (
            <div className="text-gray-300">보낼금액</div>
          ) : (
            <div className="flex items-center font-bold">
              {viewAmount}
              <div>원</div>
            </div>
          )}
        </div>
        <div className="w-full mx-auto flex gap-1 bg-gray-200 px-4 py-2 text-sm rounded-md">
          <div>{myAccount.user.student.name}</div>
          <div>:</div>
          <div>
            {myAccount.balance.toLocaleString("ko-KR")}
            <span>원</span>
          </div>
        </div>
        <div className="flex-1 min-h-36 max-h-52 grid grid-cols-3 grid-rows-4 text-2xl">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("1")}
          >
            1
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("2")}
          >
            2
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("3")}
          >
            3
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("4")}
          >
            4
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("5")}
          >
            5
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("6")}
          >
            6
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("7")}
          >
            7
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("8")}
          >
            8
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("9")}
          >
            9
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("00")}
          >
            00
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("0")}
          >
            0
          </div>
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => onClickKeyPadBtn("delete")}
          >
            <Delete />
          </div>
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="h-12 bg-[#5369e7] text-white rounded-b-none">
            다음
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {useAccount.user.student.name}님에게 {viewAmount}원
              이체하시겠습니까?
            </AlertDialogTitle>
            <AlertDialogDescription>
              받는계좌 : {useAccount.code}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex gap-1 items-center">
              <AlertDialogCancel className="w-1/3">취소</AlertDialogCancel>
              <AlertDialogAction
                className="w-2/3 bg-[#5369e7]"
                onClick={onClickDepositBtn}
              >
                이체하기
              </AlertDialogAction>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DepositDetail;
