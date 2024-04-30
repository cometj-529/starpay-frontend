import { Route, Routes, useNavigate } from "react-router-dom";
import Grade from "./grade";
import { useContext, useEffect, useState } from "react";
import Class from "./class";
import { getAllByInfo } from "src/lib/student";
import Snumber from "./snumber";
import Pwd from "./pwd";
import { check, join, login } from "src/lib/user";
import Confirm from "./confirm";
import { useCookies } from "react-cookie";
import Login from "./login/login";
import { MyAccountContext } from "src/App";
import { toast } from "src/components/ui/use-toast";

const Auth = () => {
  const initData = {
    student: "",
    pw: "",
  };

  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);

  const [pw, setPw] = useState("");
  const [pwConf, setPwConf] = useState("");
  const [isSamePw, setIsSamePw] = useState(false);
  const [sGrade, setSGrade] = useState("");
  const [sClass, setSClass] = useState("");
  const [sNumber, setSNumber] = useState("");
  const [student, setStudent] = useState({});
  const [info, setInfo] = useState(initData);
  const [students, setStudents] = useState([]);
  const { getAccount } = useContext(MyAccountContext);

  const navigate = useNavigate();

  useEffect(() => {
    logout();
    if (info === initData) {
      navigate("/auth/grade");
    }
  }, []);

  useEffect(() => {
    if (pw === "" && pwConf === "") return;
    setIsSamePw(pw === pwConf);
  }, [pw, pwConf]);

  const logout = () => {
    removeCookie("access_token", { path: "/" });
  };

  const onJoin = async () => {
    try {
      const sendData = {
        student: String(student.code),
        pw,
      };

      const { data } = await join(sendData);
      setCookie("access_token", data, {
        path: "/",
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      });
      // getAccount();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async () => {
    try {
      const sendData = {
        student: String(student.code),
        pw,
      };

      const { data } = await login(sendData);
      setCookie("access_token", data, {
        path: "/",
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      });
      getAccount();
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "잘못된 입력!",
        description: "비밀번호를 확인해주세요",
      });
    }
  };

  const userCheck = async () => {
    try {
      const sendData = {
        student: String(student.code),
      };

      const { data } = await check(sendData);

      if (data) {
        navigate("/auth/login");
        return;
      }

      navigate("/auth/pwd");
    } catch (err) {
      console.log(err);
    }
  };

  const getStudents = async () => {
    try {
      const sendData = {
        sGrade,
        sClass,
      };

      console.log(sendData);

      const data = await getAllByInfo(sendData);
      console.log(data.data);
      setStudents(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangePw = (e) => {
    setPw(e);
    setInfo({ ...info, pw: e });
  };

  const onChangeSGrade = (e) => {
    setSGrade(e);
  };

  const onChangeSClass = (e) => {
    setSClass(e);
  };

  const onChangeSNumber = (e) => {
    setSNumber(e);
    const findStudent = students.find((ee) => ee.code === e);
    setStudent(findStudent);
  };

  const onClickConfirmBtn = (e) => {
    setInfo({ ...info, student: student.code });
    userCheck();
  };

  return (
    <div className="px-6 py-8">
      <Routes>
        <Route
          path="/grade"
          element={<Grade sGrade={sGrade} onChangeSGrade={onChangeSGrade} />}
        />
        <Route
          path="/class"
          element={
            <Class
              sClass={sClass}
              onChangeSClass={onChangeSClass}
              getStudents={getStudents}
            />
          }
        />
        <Route
          path="/number"
          element={
            <Snumber
              sNumber={sNumber}
              onChangeSNumber={onChangeSNumber}
              students={students}
            />
          }
        />
        <Route
          path="/confirm"
          element={
            <Confirm
              name={student.name}
              onClickConfirmBtn={onClickConfirmBtn}
            />
          }
        />
        <Route
          path="/pwd"
          element={
            <Pwd
              pw={pw}
              onChangePw={onChangePw}
              pwConf={pwConf}
              setPwConf={setPwConf}
              isSamePw={isSamePw}
              onJoin={onJoin}
            />
          }
        />
        <Route
          path="/login"
          element={<Login pw={pw} onChangePw={onChangePw} onLogin={onLogin} />}
        />
      </Routes>
    </div>
  );
};

export default Auth;
