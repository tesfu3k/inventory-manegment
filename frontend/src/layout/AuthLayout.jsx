import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/contextCreator";

const AuthLayout = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/log-in" replace />;
  }

  return (
    <div>
      AuthLayout
      <Outlet />
    </div>
  );
};

export default AuthLayout;
