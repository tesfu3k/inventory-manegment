import { Edit, Eye, Trash2 } from "lucide-react";

const EmployeeTable = ({ renderData, colData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border-gray-200 overflow-hidden mt-5">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200 ">
            <tr>
              {colData.map((column) => (
                <td className={column.className}>
                  {column.key === "select" ? (
                    <input type="checkbox" />
                  ) : (
                    column.label
                  )}
                </td>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {renderData()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
