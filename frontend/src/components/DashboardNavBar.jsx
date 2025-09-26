import { useContext } from "react";
import { AuthContext } from "../context/contextCreator";

const DashboardNavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="text-cyan-800 flex justify-between py-5 px-10">
      <div className="">
        <h1 className="text-3xl font-semibold">Welcome back, {user.name}</h1>
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
