import { useState, useMemo } from "react";
import {
  Edit,
  Eye,
  Trash2,
  Search,
  ChevronUp,
  ChevronDown,
  Filter,
  UserPlus,
} from "lucide-react";

const initialEmployeeData = [
  {
    id: 1,
    name: "Abebe Bekele",
    position: "Senior Developer",
    department: "Engineering",
    phone: "+251 911 123 456",
    email: "abebe.bekele@company.et",
    salary: 95000,
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

const EmployeeTableTest = () => {
  const [employees, setEmployees] = useState(initialEmployeeData);
  const [selectedEmployees, setSelectedEmployees] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Get unique departments for filter
  const departments = useMemo(() => {
    const depts = [...new Set(employees.map((emp) => emp.department))];
    return ["All", ...depts];
  }, [employees]);

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter((employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || employee.status === statusFilter;
      const matchesDepartment =
        departmentFilter === "All" || employee.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (typeof aVal === "string") {
          aVal = aVal.toLowerCase();
          bVal = bVal.toLowerCase();
        }

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [employees, searchTerm, statusFilter, departmentFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(
        new Set(filteredAndSortedEmployees.map((emp) => emp.id))
      );
    } else {
      setSelectedEmployees(new Set());
    }
  };

  const handleSelectEmployee = (employeeId) => {
    const newSelected = new Set(selectedEmployees);
    if (newSelected.has(employeeId)) {
      newSelected.delete(employeeId);
    } else {
      newSelected.add(employeeId);
    }
    setSelectedEmployees(newSelected);
  };

  const handleViewEmployee = (employee) => {
    alert(`Viewing details for ${employee.name}`);
  };

  const handleEditEmployee = (employee) => {
    alert(`Editing ${employee.name}`);
  };

  const handleDeleteEmployee = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      setEmployees((prev) =>
        prev.filter((emp) => emp.id !== employeeToDelete.id)
      );
      setSelectedEmployees((prev) => {
        const newSelected = new Set(prev);
        newSelected.delete(employeeToDelete.id);
        return newSelected;
      });
    }
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedEmployees.size > 0) {
      setEmployees((prev) =>
        prev.filter((emp) => !selectedEmployees.has(emp.id))
      );
      setSelectedEmployees(new Set());
    }
  };

  const SortableHeader = ({ column, children }) => (
    <th
      className={`px-6 py-4 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors ${
        column.className || ""
      }`}
      onClick={() => column.sortable !== false && handleSort(column.key)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {column.sortable !== false &&
          sortConfig.key === column.key &&
          (sortConfig.direction === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          ))}
      </div>
    </th>
  );

  const columns = [
    { key: "select", label: "", sortable: false, className: "w-12" },
    { key: "name", label: "Employee", className: "" },
    { key: "position", label: "Position", className: "hidden md:table-cell" },
    {
      key: "department",
      label: "Department",
      className: "hidden lg:table-cell",
    },
    {
      key: "phone",
      label: "Contact",
      className: "hidden lg:table-cell",
      sortable: false,
    },
    { key: "salary", label: "Salary", className: "hidden xl:table-cell" },
    { key: "status", label: "Status", className: "hidden lg:table-cell" },
    { key: "actions", label: "Actions", className: "w-32", sortable: false },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mt-5">
      {/* Header with controls */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-800">Employees</h2>
            <span className="text-sm text-gray-500">
              {filteredAndSortedEmployees.length} of {employees.length}{" "}
              employees
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {selectedEmployees.size > 0 && (
              <button
                onClick={handleBulkDelete}
                className="px-3 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete Selected ({selectedEmployees.size})
              </button>
            )}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Toggle Filters"
            >
              <Filter className="w-5 h-5" />
            </button>

            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Add Employee</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {showFilters && (
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <SortableHeader key={column.key} column={column}>
                  {column.key === "select" ? (
                    <input
                      type="checkbox"
                      checked={
                        selectedEmployees.size ===
                          filteredAndSortedEmployees.length &&
                        filteredAndSortedEmployees.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  ) : (
                    column.label
                  )}
                </SortableHeader>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedEmployees.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Search className="w-12 h-12 text-gray-300" />
                    <p className="text-lg font-medium">No employees found</p>
                    <p className="text-sm">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAndSortedEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.has(employee.id)}
                      onChange={() => handleSelectEmployee(employee.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="h-12 w-12 object-cover rounded-full border-2 border-gray-100"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${employee.name}&background=6366f1&color=fff`;
                          }}
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

                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.position}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-900">
                      {employee.department}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-gray-900">
                      {employee.phone}
                    </div>
                    <div className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      {employee.email}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap hidden xl:table-cell">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.salary.toLocaleString()} ETB
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {employee.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleViewEmployee(employee)}
                        className="text-indigo-600 hover:text-indigo-900 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditEmployee(employee)}
                        className="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        title="Edit Employee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee)}
                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-2">
                Delete Employee
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete{" "}
                  <strong>{employeeToDelete?.name}</strong>? This action cannot
                  be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTableTest;
