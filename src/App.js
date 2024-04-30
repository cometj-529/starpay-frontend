import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Main from "./pages/main";
import QR from "./pages/qr";
import Join from "./pages/auth";
import { CookiesProvider } from "react-cookie";
import Deposit from "./pages/deposit";
import useToken from "./hooks/useToken";
import { createContext, useEffect, useState } from "react";
import { getMyAccount } from "./lib/account";
import { Toaster } from "./components/ui/toaster";

export const MyAccountContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [myAccount, setMyAccount] = useState();
  const [token] = useToken();

  const getAccount = async () => {
    try {
      if (!token) return;

      setIsLoading(true);

      const data = await getMyAccount(token);

      setMyAccount(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccount();
  }, [token]);

  useEffect(() => {
    getAccount();
  }, []);

  if (isLoading) return <div></div>;

  return (
    <MyAccountContext.Provider value={{ myAccount, getAccount }}>
      <div className="max-w-[1024px] h-screen mx-auto overflow-auto">
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/auth/*" element={<Join />} />
              <Route path="/qr" element={<QR />} />
              <Route path="/deposit/*" element={<Deposit />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </CookiesProvider>
      </div>
    </MyAccountContext.Provider>
  );
}

export default App;
