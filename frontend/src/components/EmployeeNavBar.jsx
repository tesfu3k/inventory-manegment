import {
  IdCardLanyard,
  Link as LinkIcon,
  UserPlus2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-cyan-800 flex justify-between lg:items-center py-5 max-md:flex-col max-md:gap-4 sticky top-0 bg-[rgb(230,248,252)] z-10">
      <div className="flex gap-3 items-center ">
        <Users className="" />
        <h1 className="text-3xl font-semibold max-md:text-lg">
          Employee Manegment
        </h1>
      </div>
      <div className="flex gap-4 text-lg max-md:justify-evenly">
        <Link
          to="record"
          className="flex items-center gap-3 border-l-5 border-l-[rgb(59,130,246)]  rounded-xl shadow-lg bg-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.2)] px-3 py-2"
        >
          <UserPlus2 className="text-[rgb(59,130,246)]" />
          <h3 className="font-semibold">Add Employee</h3>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 border-l-5 border-l-[rgb(59,130,246)]  rounded-xl shadow-lg bg-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.2)] px-3 py-2"
        >
          <IdCardLanyard className="text-[rgb(59,130,246)]" />
          <span className="font-semibold">Invite Employee</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 right-0 h-screen bg-black/30 flex justify-center items-center">
          <div className="bg-white w-full max-w-md p-10 rounded-xl border border-cyan-500 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-red-400/25 absolute right-2 top-2 hover:bg-red-200 hover:cursor-pointer"
            >
              <X className="text-red-500" />
            </button>
            <div className="flex gap-2 items-center justify-center mb-4">
              <LinkIcon className="text-cyan-400" />
              <h1 className="text-2xl font-semibold">Invite New Employee</h1>
            </div>
            <p className="text-justify mb-4">
              Generate and share an invitation link to onboard new employees.
            </p>
            <div className="flex justify-center">
              <button className="bg-cyan-400 text-white text-lg font-semibold  py-2 rounded-xl w-full">
                Generate Invitation Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeNavBar;
