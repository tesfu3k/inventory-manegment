import axios from "axios";
import {
  Check,
  Copy,
  IdCardLanyard,
  Link as LinkIcon,
  UserCheck,
  UserPlus2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
let timeOutId;

const EmployeeNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(null);
  const [copy, setCopy] = useState(false);

  const handleGenerateLink = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/invite`,
        {},
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );
      if (data.success) return setUrl(data.data.link);
      toast.error("data.message");
    } catch (error) {
      toast.error(error.message || "something went wrong pls try again later");
    }
  };

  const handleCopy = async () => {
    clearTimeout(timeOutId);
    await navigator.clipboard.writeText(url);
    setCopy(true);
    timeOutId = setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

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
        <button
          //onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 border-l-5 border-l-[rgb(59,130,246)]  rounded-xl shadow-lg bg-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.2)] px-3 py-2"
        >
          <UserCheck className="text-[rgb(59,130,246)]" />
          <span className="font-semibold">Approve Pending Employee</span>
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
            <div className="flex justify-center mb-4">
              <button
                onClick={handleGenerateLink}
                className="bg-cyan-400 text-white text-lg font-semibold  py-2 rounded-xl w-full hover:bg-cyan-400/50 active:scale-90 transition-transform duration-700"
              >
                Generate Invitation Link
              </button>
            </div>
            {url && (
              <div className="bg-cyan-100/45 rounded-2xl px-4 py-2 pb-6">
                <p className="mb-2">INVITATION LINK</p>
                <div className="flex gap-2">
                  <input
                    className="border border-cyan-400 rounded-md px-2  bg-white text-xs py-1 flex-1"
                    type="text"
                    value={url}
                    readOnly
                  />
                  <button onClick={handleCopy}>
                    {copy ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeNavBar;
