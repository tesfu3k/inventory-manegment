import { useContext } from "react";
import { AuthContext } from "../context/contextCreator";
import { Smile } from "lucide-react";

const DashboardNavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="text-cyan-800 flex justify-between py-5 px-10">
      <div>
        <div className="flex gap-3 items-center">
          <h1 className="text-3xl font-semibold ">Welcome back, {user.name}</h1>
          <Smile />
        </div>
        <p className="opacity-90">
          Here's what's happening with your business today.
        </p>
      </div>
      <div className="">
        <p className="opacity-80">Today</p>
        <p className="font-semibold">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default DashboardNavBar;
