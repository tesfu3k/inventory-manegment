import { Edit, Eye, Trash2 } from "lucide-react";

const columns = [
  {
    key: "select",
    label: "",
    className: "px-6 py-4 text-left font-medium uppercase tracking-wider",
  }, // for checkbox column
  {
    key: "employee",
    label: "Employee",
    className: "px-6 py-4 text-left font-medium uppercase tracking-wider",
  },
  {
    key: "position",
    label: "Position",
    className:
      " px-6 py-4 text-left font-medium uppercase tracking-wider hidden md:table-cell ",
  },
  {
    key: "department",
    label: "Department",
    className:
      "px-6 py-4 text-left font-medium uppercase tracking-wider hidden lg:table-cell",
  },
  {
    key: "contact",
    label: "Contact",
    className:
      "px-6 py-4 text-left font-medium uppercase tracking-wider hidden lg:table-cell",
  },
  {
    key: "salary",
    label: "Salary",
    className:
      "px-6 py-4 text-left font-medium uppercase tracking-wider hidden xl:table-cell",
  },
  {
    key: "status",
    label: "Status",
    className:
      "px-6 py-4 text-left font-medium uppercase tracking-wider hidden lg:table-cell",
  },
  {
    key: "actions",
    label: "Actions",
    className: "px-6 py-4 text-left font-medium uppercase tracking-wider",
  },
];

const employeeData = [
  {
    id: 1,
    name: "Abebe Bekele",
    position: "Senior Developer",
    department: "Engineering",
    phone: "+251 911 123 456",
    email: "abebe.bekele@company.et",
    salary: 95000, // in ETB
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Mekdes Alemu",
    position: "Product Manager",
    department: "Product",
    phone: "+251 922 234 567",
    email: "mekdes.alemu@company.et",
    salary: 110000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Samuel Tadesse",
    position: "UX Designer",
    department: "Design",
    phone: "+251 933 345 678",
    email: "samuel.tadesse@company.et",
    salary: 78000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "Hanna Getachew",
    position: "DevOps Engineer",
    department: "Engineering",
    phone: "+251 944 456 789",
    email: "hanna.getachew@company.et",
    salary: 88000,
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Saron Fikre",
    position: "HR Manager",
    department: "Human Resources",
    phone: "+251 955 567 890",
    email: "saron.fikre@company.et",
    salary: 85000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Yonas Gebremariam",
    position: "Marketing Specialist",
    department: "Marketing",
    phone: "+251 966 678 901",
    email: "yonas.gebremariam@company.et",
    salary: 65000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Selamawit Dawit",
    position: "Finance Director",
    department: "Finance",
    phone: "+251 977 789 012",
    email: "selamawit.dawit@company.et",
    salary: 125000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Bereket Tesfaye",
    position: "Junior Developer",
    department: "Engineering",
    phone: "+251 988 890 123",
    email: "bereket.tesfaye@company.et",
    salary: 70000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
  },
];

const EmployeeTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border-gray-200 overflow-hidden mt-5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200 ">
            <tr>
              {columns.map((column) => (
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
            {employeeData.map((employee) => (
              <tr key={employee.id}>
                {/* checkbox */}
                <td className="px-6 py-4">
                  <input type="checkbox" />
                </td>

                {/* employee Information*/}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        src={employee.avatar}
                        alt={employee.name}
                        className="h-12 w-12 object-cover rounded-full"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{employee.name}</div>
                      <div className="text-sm">{employee.email}</div>
                    </div>
                  </div>
                </td>

                {/* position */}
                <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                  <div className="text-sm font-medium">{employee.position}</div>
                </td>

                {/* Department */}
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div className="text-sm">{employee.department}</div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div className="text-sm">{employee.phone}</div>
                  <div className="text-sm text-cyan-500">{employee.email}</div>
                </td>

                {/* Salary */}
                <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                  <div className="text-sm font-medium">
                    {employee.salary} ETB
                  </div>
                </td>

                {/* status */}
                <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-900"
                        : "bg-red-100 text-red-900"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
