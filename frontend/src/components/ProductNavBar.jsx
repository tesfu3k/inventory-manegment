import { Package2, PackagePlus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const ProductNavBar = () => {
  return (
    <div>
      <div className="text-cyan-800 flex justify-between lg:items-center py-5 max-md:flex-col max-md:gap-4 sticky top-0 bg-[rgb(230,248,252)]">
        <div className="flex gap-3 items-center ">
          <Package2 className="" />
          <h1 className="text-3xl font-semibold max-md:text-lg">
            Product Manegment
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative">
            <Search className=" absolute  left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full sm:w-72  pl-10 pr-4 py-4 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
              type="text"
              placeholder="Search Products…"
            />
          </div>

          <Link
            to="record"
            className="flex items-center gap-3 border-l-5 border-l-green-500 p-4 rounded-xl shadow-lg bg-green-200 hover:bg-green-200/50 "
          >
            <PackagePlus className="text-green-500" />
            <h3 className="font-semibold">Add Product</h3>
          </Link>
        </div>
      </div>

      {/* -- Filters -- */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white shadow-sm rounded-lg p-4 mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-cyan-500 font-medium">
              Category
            </label>
            <select className="w-40 mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm focus:ring-cyan-400 focus:outline-none">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home & Garden</option>
              <option>Sports</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-cyan-500 font-medium">
              Supplier
            </label>
            <select className="w-40 mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm focus:ring-cyan-400 focus:outline-none">
              <option>All Suppliers</option>
              <option>Supplier A</option>
              <option>Supplier B</option>
              <option>Supplier C</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-cyan-500 font-medium">
              Availability
            </label>
            <select className="w-40 mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm focus:ring-cyan-400 focus:outline-none">
              <option>All</option>
              <option>In stock</option>
              <option>Low stock</option>
              <option>Out of stock</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-cyan-500 font-medium">Sort By:</label>
          <select className="w-40 mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm focus:ring-cyan-400 focus:outline-none">
            <option>Date Added</option>
            <option>Price</option>
            <option>Stock</option>
            <option>Name</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductNavBar;
