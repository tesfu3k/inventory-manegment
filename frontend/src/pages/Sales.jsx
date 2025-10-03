import { Edit, Eye, Trash2 } from "lucide-react";
import { salesColumns, salesData } from "../data/data";
import Table from "../components/Table";

const Sales = () => {
  const renderData = () => {
    return salesData.map((sale) => (
      <tr key={sale.id}>
        {/* checkbox */}
        <td className="px-4 py-2">
          <input type="checkbox" />
        </td>

        {/* sale / Invoice # */}
        <td className="px-4 py-2 whitespace-nowrap ">
          <div className="text-sm font-medium">{sale.saleId}</div>
        </td>

        {/* Supplier */}
        <td className="px-4 py-2 whitespace-nowrap ">
          <div className="text-sm">{sale.customer}</div>
        </td>

        {/* products */}
        <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">
          <div className="text-sm font-medium">{sale.products}</div>
        </td>

        {/* employee */}
        <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
          <div className="text-sm font-medium">{sale.employee}</div>
        </td>

        {/* Quantity */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{sale.quantity}</div>
        </td>

        {/* Total */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{sale.total}</div>
        </td>

        {/* status */}
        <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              sale.status === "In Stock"
                ? "bg-green-100 text-green-900"
                : sale.status === "Low Stock"
                ? "bg-yellow-100 text-yellow-900"
                : "bg-red-100 text-red-900"
            }`}
          >
            {sale.status}
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
              title="Edit Sale"
            >
              <Edit size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
              title="Delete Sale"
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
      <Table renderData={renderData} colData={salesColumns} />
    </div>
  );
};

export default Sales;
