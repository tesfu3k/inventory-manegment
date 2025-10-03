import { Edit, Eye, Trash2 } from "lucide-react";
import { customerColumns, customerData } from "../data/data";
import Table from "../components/Table";

const Customers = () => {
  const renderData = () => {
    return customerData.map((customer) => (
      <tr key={customer.id}>
        {/* checkbox */}
        <td className="px-4 py-2">
          <input type="checkbox" />
        </td>

        {/* customer / Invoice # */}
        <td className="px-4 py-2 whitespace-nowrap ">
          <div className="text-sm font-medium">{customer.customerId}</div>
        </td>

        {/* Name */}
        <td className="px-4 py-2 whitespace-nowrap ">
          <div className="text-sm">{customer.name}</div>
        </td>

        {/* contact Info */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm">{customer.phone}</div>
          <div className="text-sm text-cyan-500">{customer.email}</div>
        </td>

        {/* adress */}
        <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
          <div className="text-sm font-medium">{customer.address}</div>
        </td>

        {/* total purchase */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{customer.totalPurchases}</div>
        </td>

        {/* Balance */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm font-medium">{customer.balance}</div>
        </td>

        {/* status */}
        <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              customer.status === "Active"
                ? "bg-green-100 text-green-900"
                : "bg-red-100 text-red-900"
            }`}
          >
            {customer.status}
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
              title="Edit customer"
            >
              <Edit size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
              title="Delete customer"
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
      <Table renderData={renderData} colData={customerColumns} />
    </div>
  );
};

export default Customers;
