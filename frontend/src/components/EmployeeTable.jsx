import { Edit, Eye, Trash2 } from "lucide-react";

const employeeData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Senior Developer",
    department: "Engineering",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@company.com",
    salary: 95000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Product Manager",
    department: "Product",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@company.com",
    salary: 110000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "UX Designer",
    department: "Design",
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@company.com",
    salary: 78000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David Williams",
    position: "DevOps Engineer",
    department: "Engineering",
    phone: "+1 (555) 456-7890",
    email: "david.williams@company.com",
    salary: 88000,
    status: "Inactive",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 5,
    name: "Jessica Brown",
    position: "HR Manager",
    department: "Human Resources",
    phone: "+1 (555) 567-8901",
    email: "jessica.brown@company.com",
    salary: 85000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Robert Kim",
    position: "Marketing Specialist",
    department: "Marketing",
    phone: "+1 (555) 678-9012",
    email: "robert.kim@company.com",
    salary: 65000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 7,
    name: "Lisa Thompson",
    position: "Finance Director",
    department: "Finance",
    phone: "+1 (555) 789-0123",
    email: "lisa.thompson@company.com",
    salary: 125000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 8,
    name: "Alex Turner",
    position: "Junior Developer",
    department: "Engineering",
    phone: "+1 (555) 890-1234",
    email: "alex.turner@company.com",
    salary: 70000,
    status: "Active",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face",
  },
];

const EmployeeTable = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border-gray-200 overflow-hidden mt-5">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ">
                Employee
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ">
                Position
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ">
                Department
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ">
                Salary
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider ">
                Actions
              </th>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{employee.position}</div>
                </td>

                {/* Department */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{employee.department}</div>
                </td>

                {/* Contact */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">{employee.phone}</div>
                  <div className="text-sm text-cyan-500">{employee.email}</div>
                </td>

                {/* Salary */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    {employee.salary} ETB
                  </div>
                </td>

                {/* status */}
                <td className="px-6 py-4 whitespace-nowrap">
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
                    <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors">
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
