import { Edit, Eye, Trash2 } from "lucide-react";
import Table from "../components/Table";
import { purchaseColumns, purchaseData } from "../data/data";

const Purchases = () => {
  const renderData = () => {
    return purchaseData.map((purchase) => (
      <tr key={purchase.id}>
        {/* checkbox */}
        <td className="px-4 py-2">
          <input type="checkbox" />
        </td>

        {/* Purchase / Invoice # */}
        <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">
          <div className="text-sm font-medium">{purchase.purchaseId}</div>
        </td>

        {/* Supplier */}
        <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
          <div className="text-sm">{purchase.supplier}</div>
        </td>

        {/* products */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{purchase.products}</div>
        </td>

        {/* employee */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{purchase.employee}</div>
        </td>

        {/* Quantity */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{purchase.quantity}</div>
        </td>

        {/* Total */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{purchase.total}</div>
        </td>

        {/* status */}
        <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              purchase.status === "In Stock"
                ? "bg-green-100 text-green-900"
                : purchase.status === "Low Stock"
                ? "bg-yellow-100 text-yellow-900"
                : "bg-red-100 text-red-900"
            }`}
          >
            {purchase.status}
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
      <Table renderData={renderData} colData={purchaseColumns} />
    </div>
  );
};

export default Purchases;
