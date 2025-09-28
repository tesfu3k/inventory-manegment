import { Users } from "lucide-react";
import Cards from "./Cards";

const EmployeeNavBar = () => {
  return (
    <div className="text-cyan-800 flex justify-between lg:items-center py-5 max-md:flex-col max-md:gap-4 sticky top-0 bg-[rgb(230,248,252)]">
      <div className="flex gap-3 items-center ">
        <Users className="" />
        <h1 className="text-3xl font-semibold max-md:text-lg">Employees</h1>
      </div>
      <div className="flex gap-4 text-lg">
        <button className="border p-2 rounded-2xl">👤 Add New Employee</button>
        <button className="border p-2 rounded-2xl">
          ➕ Invite New Employee
        </button>
      </div>
    </div>
  );
};

export default EmployeeNavBar;
