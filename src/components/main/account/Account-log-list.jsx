import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { MyAccountContext } from "src/App";
import useToken from "src/hooks/useToken";
import { getMyAccountLog } from "src/lib/account";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const AccountLogList = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { myAccount } = useContext(MyAccountContext);
  const [token] = useToken();

  const getAccountLog = async () => {
    try {
      setIsLoading(true);
      const { data } = await getMyAccountLog(token, page, 10);

      setLogs(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccountLog();
  }, [page]);

  const pageUp = () => {
    setPage(page + 1);
  };

  const pageDown = () => {
    setPage(page - 1);
  };

  if (isLoading) return <div></div>;

  return (
    <div className="min-h-[calc(100vh-68px)] bg-white">
      <div className="flex items-center px-6 py-4 sticky top-[68px] left-0 bg-white shadow-sm">
        {logs.first ? (
          <button className="text-gray-300">
            <ChevronLeft />
          </button>
        ) : (
          <button onClick={pageDown}>
            <ChevronLeft />
          </button>
        )}
        {logs.last ? (
          <button className="text-gray-300">
            <ChevronRight />
          </button>
        ) : (
          <button onClick={pageUp}>
            <ChevronRight />
          </button>
        )}
      </div>
      <div className="h-full px-6">
        {logs.content.map((e) => {
          if (e.receiverAccount.code === myAccount.code) {
            return (
              <div
                key={e.code}
                className="flex gap-3 justify-between border-b py-4"
              >
                <div className="text-xs text-gray-700">
                  {dayjs(e.depositAt).format("MM. DD")}
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-medium leading-[18px]">
                    {e.senderAccount.user.student.name}({e.senderAccount.code})
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold">
                    {e.amount.toLocaleString("ko-KR")}원
                  </div>
                  <div className="text-sm text-gray-600">
                    {e.receiverBalance.toLocaleString("ko-KR")}원
                  </div>
                </div>
              </div>
            );
          } else if (e.senderAccount.code === myAccount.code) {
            return (
              <div
                key={e.code}
                className="flex gap-3 justify-between border-b py-4"
              >
                <div className="text-xs text-gray-700">
                  {dayjs(e.depositAt).format("MM. DD")}
                </div>
                <div className="flex-1">
                  <div className="text-[17px] font-medium leading-[18px]">
                    {e.receiverAccount.user.student.name}(
                    {e.receiverAccount.code})
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold">
                    -{e.amount.toLocaleString("ko-KR")}원
                  </div>
                  <div className="text-sm text-gray-600">
                    {e.senderBalance.toLocaleString("ko-KR")}원
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default AccountLogList;
