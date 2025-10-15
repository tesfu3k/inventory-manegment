import { Edit, Eye, Trash2 } from "lucide-react";
import ProductNavBar from "../components/ProductNavBar";
import Table from "../components/Table";
import { productColumns } from "../data/data.js";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fatchProduct = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/inventory/products`,
        {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        }
      );
      if (data.success) {
        setProducts(data.data);
        return;
      }
      if (!data.success) return toast.error(data.message);
    };
    fatchProduct();
  }, []);
  const renderData = () => {
    return products.map((product) => (
      <tr key={product._id}>
        {/* checkbox */}
        <td className="px-4 py-2">
          <input type="checkbox" />
        </td>

        {/* product Information*/}
        <td className="px-4 py-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <img
                src="/product.jpg"
                alt={product.name}
                className="h-12 w-12 object-cover rounded-full"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">{product.name}</div>
            </div>
          </div>
        </td>

        {/* catagory */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{product.catagory}</div>
        </td>

        {/* Unit price */}
        <td className="px-4 py-2 whitespace-nowrap hidden sm:table-cell">
          <div className="text-sm">{product.unitPrice}</div>
        </td>

        {/* Stock quantity */}
        <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
          <div className="text-sm font-medium">{product.stockQuantity}</div>
        </td>

        {/* status */}
        <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              product.stockQuantity === 0
                ? "bg-red-100 text-red-900"
                : product.stockQuantity <= product.lowStockThreshed
                ? "bg-yellow-100 text-yellow-900"
                : "bg-green-100 text-green-900"
            }`}
          >
            {product.stockQuantity === 0
              ? "Out of Stock"
              : product.stockQuantity <= product.lowStockThreshed
              ? "Low Stock"
              : "In Stock"}
          </span>
        </td>

        {/* Actions */}
        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
          <div className="flex space-x-2">
            <button
              className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            <button
              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
              title="Edit Product"
            >
              <Edit size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
              title="Delete Product"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="px-10 text-cyan-800">
      <ProductNavBar />
      <Table renderData={renderData} colData={productColumns} />
    </div>
  );
};

export default Products;
