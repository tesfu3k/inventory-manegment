import { Edit, Eye, Trash2 } from "lucide-react";
import ProductNavBar from "../components/ProductNavBar";
import Table from "../components/Table";
import { productColumns, productData } from "../data/data.js";
const Products = () => {
  const renderData = () => {
    return productData.map((product) => (
      <tr key={product.id}>
        {/* checkbox */}
        <td className="px-4 py-2">
          <input type="checkbox" />
        </td>

        {/* product Information*/}
        <td className="px-4 py-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 object-cover rounded-full"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">{product.name}</div>
              <div className="text-sm">{product.email}</div>
            </div>
          </div>
        </td>

        {/* catagory */}
        <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">
          <div className="text-sm font-medium">{product.category}</div>
        </td>

        {/* Supplier */}
        <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
          <div className="text-sm">{product.supplier}</div>
        </td>

        {/* Price */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{product.price}</div>
        </td>

        {/* Stock */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{product.stock}</div>
        </td>

        {/* status */}
        <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              product.status === "In Stock"
                ? "bg-green-100 text-green-900"
                : product.status === "Low Stock"
                ? "bg-yellow-100 text-yellow-900"
                : "bg-red-100 text-red-900"
            }`}
          >
            {product.status}
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
              title="Edit Employee"
            >
              <Edit size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
              title="Delete Employee"
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
