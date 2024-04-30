const DepositAccount = ({ code, student, onClick }) => {
  return (
    <div className="flex gap-2 items-center" onClick={onClick}>
      <div className="w-11 h-11 rounded-full bg-gray-500"></div>
      <div>
        <div>{student.name}</div>
        <div className="text-xs text-gray-500">{code}</div>
      </div>
    </div>
  );
};

export default DepositAccount;
