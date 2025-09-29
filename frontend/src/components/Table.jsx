import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  Plus,
  Download,
  Upload,
} from "lucide-react";

const EmployeeTable = () => {
  // Sample employee data
  const [employees] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Developer",
      department: "Engineering",
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@company.com",
      salary: 95000,
      status: "Active",
      avatar: "/Portrait_Placeholder.png",
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
      avatar: "/Portrait_Placeholder.png",
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
      avatar: "/Portrait_Placeholder.png",
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
      avatar: "/Portrait_Placeholder.png",
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
      avatar: "/Portrait_Placeholder.png",
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
      avatar: "/Portrait_Placeholder.png",
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
      avatar: "/Portrait_Placeholder.png",
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
      avatar: "/Portrait_Placeholder.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isAdminView, setIsAdminView] = useState(true);

  // Get unique departments and statuses for filter options
  const departments = [...new Set(employees.map((emp) => emp.department))];
  const statuses = [...new Set(employees.map((emp) => emp.status))];

  // Filter employees based on search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        !filterDepartment || employee.department === filterDepartment;
      const matchesStatus = !filterStatus || employee.status === filterStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, filterDepartment, filterStatus]);

  const handleAction = (action, employeeId) => {
    console.log(`${action} action for employee ID: ${employeeId}`);
    // Implement actual actions here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Employee Management
            </h1>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Upload size={16} />
                Import
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download size={16} />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus size={16} />
                Add Employee
              </button>
            </div>
          </div>

          {/* Admin Toggle */}
          <div className="flex items-center gap-2 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAdminView}
                onChange={(e) => setIsAdminView(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Admin View (Show Salaries)
              </span>
            </label>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[160px]"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white min-w-[120px]"
              >
                <option value="">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  {isAdminView && (
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                  )}
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Employee Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-full object-cover"
                            src={employee.avatar}
                            alt={employee.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {employee.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Position */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.position}
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.department}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.phone}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </td>

                    {/* Salary (Admin only) */}
                    {isAdminView && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${employee.salary.toLocaleString()}
                        </div>
                      </td>
                    )}

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAction("view", employee.id)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleAction("edit", employee.id)}
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                          title="Edit Employee"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleAction("delete", employee.id)}
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

          {/* Empty State */}
          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                No employees found
              </div>
              <div className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}
        </div>

        {/* Pagination (placeholder) */}
        {filteredEmployees.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing 1 to {filteredEmployees.length} of{" "}
              {filteredEmployees.length} results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
