import { useState } from "react";
import { EmployeeContext } from "./contextCreator";

const EmployeeContextProvider = ({ children }) => {
  const [employeesStatus, setEmployeesStatus] = useState({
    totalEmployees: "",
    pendingEmployees: "",
    activeEmployees: "",
    newHires: "",
  });

  return (
    <EmployeeContext.Provider value={{ employeesStatus, setEmployeesStatus }}>
      {children}
    </EmployeeContext.Provider>
  );
};
export default EmployeeContextProvider;
