import { IdCardLanyard, UserPlus2, Users } from "lucide-react";
import { Link } from "react-router-dom";

const EmployeeNavBar = () => {
  return (
    <div className="text-cyan-800 flex justify-between lg:items-center py-5 max-md:flex-col max-md:gap-4 sticky top-0 bg-[rgb(230,248,252)]">
      <div className="flex gap-3 items-center ">
        <Users className="" />
        <h1 className="text-3xl font-semibold max-md:text-lg">Employees</h1>
      </div>
      <div className="flex gap-4 text-lg ">
        <Link
          to="#"
          className="flex items-center gap-3 border-l-5 border-l-[rgb(59,130,246)]  rounded-xl shadow-lg bg-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.2)] px-3 py-2"
        >
          <UserPlus2 className="text-[rgb(59,130,246)]" />
          <h3 className="font-semibold">Add Employee</h3>
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 border-l-5 border-l-[rgb(59,130,246)]  rounded-xl shadow-lg bg-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.2)] px-3 py-2"
        >
          <IdCardLanyard className="text-[rgb(59,130,246)]" />
          <h3 className="font-semibold">Invite Employee</h3>
        </Link>
      </div>
    </div>
  );
};

export default EmployeeNavBar;
