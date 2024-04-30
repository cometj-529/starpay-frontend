import { QrScanner } from "@yudiel/react-qr-scanner";
import QRCode from "qrcode.react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyAccountContext } from "src/App";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";
import useToken from "src/hooks/useToken";

const QR = () => {
  const [token] = useToken();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [isStop, setIsStop] = useState(false);
  const { myAccount } = useContext(MyAccountContext);

  const onDecode = async (e) => {
    setIsStop(true);

    try {
      const { code } = JSON.parse(e);

      navigate(`/deposit/detail?code=${code}`);
    } catch (err) {
      alert(err.response.data);
    }
  };

  const onOpenChange = (e) => {
    setIsStop(e);
  };

  const D = { code: myAccount.code };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-14 bg-gray-200">
      {!isStop && (
        <QrScanner
          onDecode={onDecode}
          stopDecoding={isStop}
          onError={(e) => console.log(e)}
          scanDelay={1000}
        />
      )}

      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>내 QR 보기</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>내 QR</DialogTitle>
            <div className="flex items-center justify-center">
              <QRCode className="w-full h-full" value={JSON.stringify(D)} />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QR;
