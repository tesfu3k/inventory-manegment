import Cards from "../components/Cards";
import DashboardNavBar from "../components/DashboardNavBar";

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

const DashboardStats = [
  { id: 1, icons: UserCog, title: "Total Employees", value: "0" },
  { id: 2, icons: Users, title: "Total Customers", value: "0" },
  { id: 3, icons: Truck, title: "Total Suppliers", value: "0" },
  { id: 4, icons: Boxes, title: "Total Products", value: "0" },
  { id: 5, icons: ShoppingCart, title: "Today Sales", value: "0" },
  { id: 6, icons: ClipboardList, title: "Today Purchases", value: "0" },
];

const DashBoard = () => {
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
