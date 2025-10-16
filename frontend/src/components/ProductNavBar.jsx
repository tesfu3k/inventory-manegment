import axios from "axios";
import { Package2, PackagePlus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductNavBar = ({ onFiltersChange, onSortChange }) => {
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/inventory/products/category`,
          { withCredentials: true }
        );
        if (data.success) return setCategorys(data.data);
      } catch (error) {
        console.error("Failed to fetch category", error);
      }
    };
    fetchCategory();
  }, []);
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
              onChange={(e) =>
                onFiltersChange((prev) => ({ ...prev, query: e.target.value }))
              }
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
            <select
              onChange={(e) =>
                onFiltersChange((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="w-40 mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm focus:ring-cyan-400 focus:outline-none"
            >
              <option value="">All Categories</option>

              {categorys.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-cyan-500 font-medium">
              Availability
            </label>
            <select
              onChange={(e) =>
                onFiltersChange((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-40 mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm focus:ring-cyan-400 focus:outline-none"
            >
              <option value="">All</option>
              <option value={"In Stock"}>In stock</option>
              <option value={"Low Stock"}>Low stock</option>
              <option value={"Out of Stock"}>Out of stock</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-xs text-cyan-500 font-medium">Sort By:</label>
          <select
            onChange={(e) => onSortChange(e.target.value)}
            className="w-40 mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm focus:ring-cyan-400 focus:outline-none"
          >
            <option value="date_desc">Date Added (Newest)</option>
            <option value="date_asc">Date Added (Oldest)</option>
            <option value="price_asc">Price (Low → High)</option>
            <option value="price_desc">Price (High → Low)</option>
            <option value="stock_asc">Stock (Low → High)</option>
            <option value="stock_desc">Stock (High → Low)</option>
            <option value="name_asc">Name (A → Z)</option>
            <option value="name_desc">Name (Z → A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductNavBar;
