import Cards from "../components/Cards";
import DashboardNavBar from "../components/DashboardNavBar";
import axios from "axios";

import {
  UserCog, // Total Employees
  Users, // Total Customers
  Truck, // Total Suppliers
  Boxes, // Total Products
  ShoppingCart, // Today Sales
  ClipboardList, // Today Purchases
} from "lucide-react";
import SaleVsPurchase from "../components/SaleVsPurchase";
import QuickActions from "../components/QuickActions";
import { useEffect, useState } from "react";

const DashBoard = () => {
  const [dashboardStatus, setDashboardStatus] = useState({
    totalCustomers: "",
    totalEmployees: "",
    todayTotalPurchase: "",
    totalSupplier: "",
    todayTotalSale: "",
    totalProduct: "",
  });
  useEffect(() => {
    try {
      const fatchDahboardStatus = async () => {
        const { data } = await axios.get(
          "http://localhost:3000/api/employees/dashbord-status",
          { withCredentials: true }
        );

        if (data.success) return setDashboardStatus(data.status);
      };

      fatchDahboardStatus();
    } catch (error) {
      console.error(error, "fail to fach dashbord status");
    }
  }, []);
  const DashboardStats = [
    {
      id: 1,
      icons: UserCog,
      title: "Total Employees",
      value: dashboardStatus.totalEmployees,
    },
    {
      id: 2,
      icons: Users,
      title: "Total Customers",
      value: dashboardStatus.totalCustomers,
    },
    {
      id: 3,
      icons: Truck,
      title: "Total Suppliers",
      value: dashboardStatus.totalSupplier,
    },
    {
      id: 4,
      icons: Boxes,
      title: "Total Products",
      value: dashboardStatus.totalProduct,
    },
    {
      id: 5,
      icons: ShoppingCart,
      title: "Today Sales",
      value: (
        <>
          {dashboardStatus.todayTotalSale}{" "}
          <span className="text-sm text-cyan-800/50 ml-1">ETB</span>
        </>
      ),
    },
    {
      id: 6,
      icons: ClipboardList,
      title: "Today Purchases",
      value: (
        <>
          {dashboardStatus.todayTotalPurchase}{" "}
          <span className="text-sm text-cyan-800/50">ETB</span>
        </>
      ),
    },
  ];
  return (
    <div className="px-10">
      <DashboardNavBar />

      {/* <DashboardBody /> */}
      <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-1 max-md:grid-cols-2 xl:gap-6 2xl:grid-cols-6">
        {DashboardStats.map((card) => (
          <Cards
            key={card.id}
            icons={card.icons}
            value={card.value}
            title={card.title}
          />
        ))}
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-4">
        <SaleVsPurchase />
        <QuickActions />
      </div>
    </div>
  );
};

export default DashBoard;
