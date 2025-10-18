import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/contextCreator";
import SideBar from "../components/SideBar";

const AuthLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="bg-cyan-500/10 min-h-full flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
