import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

import LogIn from "./pages/LogIn";
import DashBoard from "./pages/DashBoard";

import AuthLayout from "./layout/AuthLayout";
import PublicLayout from "./layout/PublicLayout";
import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./context/contextCreator";

const App = () => {
  const { setUser } = useContext(AuthContext);
  useEffect(() => {
    const fatchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        if (data.success) setUser(data.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fatchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<DashBoard />} />
      </Route>
    </Routes>
  );
};

export default App;
