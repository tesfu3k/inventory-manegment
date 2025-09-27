import { useContext } from "react";
import { AuthContext } from "../context/contextCreator";
import { Smile } from "lucide-react";

const DashboardNavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="text-cyan-800 flex justify-between py-5 max-md:flex-col max-md:gap-4">
      <div>
        <div className="flex gap-3 items-center ">
          <h1 className="text-3xl font-semibold max-md:text-lg">
            Welcome back, {user.name}
          </h1>
          <Smile className="max-md:hidden" />
        </div>
        <p className="opacity-90 max-md:text-sm">
          Here's what's happening with your business today.
        </p>
      </div>
      <div className="max-md:text-sm ">
        <p className="opacity-80 max-md:hidden">Today</p>
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
