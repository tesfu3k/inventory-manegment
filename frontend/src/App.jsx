import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

import LogIn from "./pages/LogIn";
import DashBoard from "./pages/DashBoard";

import AuthLayout from "./layout/AuthLayout";
import PublicLayout from "./layout/PublicLayout";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/contextCreator";
import Employees from "./pages/Employees";
import Products from "./pages/Products";
import Purchases from "./pages/Purchases";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import AddEmployee from "./pages/AddEmployee";
import AddProduct from "./pages/AddProduct";

const App = () => {
  const { setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fatchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        if (data.success) setUser(data.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fatchUser();
  }, [setUser]);

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
      </Route>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="products" element={<Products />} />
        <Route path="purchases" element={<Purchases />} />
        <Route path="sales" element={<Sales />} />
        <Route path="customers" element={<Customers />} />
        <Route path="settings" element={<Settings />} />
        <Route path="employees/record" element={<AddEmployee />} />
        <Route path="products/record" element={<AddProduct />} />
      </Route>
    </Routes>
  );
};

export default App;
