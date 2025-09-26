import {
  LayoutDashboard,
  LineChart,
  Package,
  Settings,
  ShoppingCart,
  User,
  Users,
} from "lucide-react";
import LogOut from "./LogOut";
import { useContext } from "react";
import { AuthContext } from "../context/contextCreator";
import { Link } from "react-router-dom";

const Navlink = [
  {
    id: 1,
    icons: LayoutDashboard,
    label: "Dashboard",
    href: "/",
  },
  {
    id: 2,
    icons: Users,
    label: "Employees",
    href: "/employees",
  },
  {
    id: 3,
    icons: Package,
    label: "Products",
    href: "/products",
  },
  {
    id: 4,
    icons: ShoppingCart,
    label: "Purchases",
    href: "/purchases",
  },
  {
    id: 5,
    icons: LineChart,
    label: "Sales",
    href: "/sales",
  },
  {
    id: 6,
    icons: User,
    label: "Customers",
    href: "/customers",
  },
  {
    id: 7,
    icons: Settings,
    label: "Settings",
    href: "/settings",
  },
];

const SideBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className=" w-[200px] text-cyan-800 h-screen flex flex-col justify-between">
      <div className="">
        <div className="border-b-1 border-cyan-100 flex gap-3 py-3 px-2 font-bold text-xl items-center">
          <Package />
          <h1 className="">InvManager</h1>
        </div>
        <div className="">
          {Navlink.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className="flex gap-3 py-2 px-3 items-center hover:bg-cyan-500/10"
            >
              <link.icons className="size-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t-1 border-cyan-100 py-2 ">
        <div className="flex items-center gap-3 px-2">
          <User className="text-md font-semibold bg-cyan-200 rounded-full box-content p-2" />
          <div className="flex flex-col ">
            <span className=" -mb-1.5 text-md font-semibold">{user.name}</span>
            <span className="text-sm opacity-80">{user.role}</span>
          </div>
        </div>

        <LogOut />
      </div>
    </div>
  );
};

export default SideBar;
