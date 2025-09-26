import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/contextCreator";

const PublicLayout = () => {
  const { user } = useContext(AuthContext);
  if (user) return <Navigate to="/" />;

  return (
    <div>
      PublicLayout
      <Outlet />
    </div>
  );
};

export default PublicLayout;
