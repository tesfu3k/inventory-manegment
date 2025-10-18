import { PackagePlus, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="bg-white p-4 flex flex-col gap-4 rounded-2xl text-cyan-800 ">
      <h1 className="border-b border-cyan-800/15 text-center text-xl font-semibold">
        Quick Actions
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
        <Link
          to="#"
          className="flex items-center gap-3 border-l-5 border-l-[rgb(59,130,246)] p-4 rounded-xl shadow-lg bg-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.2)]"
        >
          <Users className="text-[rgb(59,130,246)]" />
          <h3 className="font-semibold">Invite Employee</h3>
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 border-l-5 border-l-green-500 p-4 rounded-xl shadow-lg bg-green-200 hover:bg-green-200/50"
        >
          <PackagePlus className="text-green-500" />
          <h3 className="font-semibold">Add Product</h3>
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 border-l-5 border-l-[rgb(148,38,217)] p-4 rounded-xl shadow-lg bg-[rgba(148,38,217,0.3)] hover:bg-[rgba(148,38,217,0.2)]"
        >
          <TrendingUp className="text-[rgb(148,38,217)]" />
          <h3 className="font-semibold">New Sale</h3>
        </Link>
        <Link
          to="#"
          className="flex items-center gap-3 border-l-5 border-l-[rgb(217,145,38)] p-4 rounded-xl shadow-lg bg-[rgba(217,145,38,0.3)] hover:bg-[rgba(217,145,38,0.2)]"
        >
          <ShoppingCart className="text-[#d99126]" />
          <h3 className="font-semibold">New Purchase</h3>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
