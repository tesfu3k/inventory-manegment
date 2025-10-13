import { useState } from "react";
import {
  UserCog,
  Clock,
  UserCheck,
  UserPlus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function EmployeeDemo() {
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [employeeToView, setEmployeeToView] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+251-912-345-678",
    position: "Software Engineer",
    department: "IT",
    salary: "45000",
    isActive: true,
  });

  const employees = [
    {
      _id: "1",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      firstName: "John",
      lastName: "Doe",
      position: "Software Engineer",
      department: "IT",
      phone: "+251-912-345-678",
      email: "john.doe@company.com",
      salary: "45000",
      isActive: true,
      pendingApproval: false,
    },
    {
      _id: "2",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      firstName: "Jane",
      lastName: "Smith",
      position: "HR Manager",
      department: "Human Resources",
      phone: "+251-911-234-567",
      email: "jane.smith@company.com",
      salary: "38000",
      isActive: true,
      pendingApproval: false,
    },
    {
      _id: "3",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      firstName: "Mike",
      lastName: "Johnson",
      position: "Sales Executive",
      department: "Sales",
      phone: "+251-913-456-789",
      email: "mike.j@company.com",
      salary: "32000",
      isActive: false,
      pendingApproval: true,
    },
  ];

  const openEditSidebar = (employee) => {
    setEditFormData({
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      email: employee.email || "",
      phone: employee.phone || "",
      position: employee.position || "",
      department: employee.department || "",
      salary: employee.salary || "",
      isActive: employee.isActive ?? true,
    });
    setIsEditSidebarOpen(true);
    setEmployeeToView(null);
  };

  const closeEditSidebar = () => {
    setIsEditSidebarOpen(false);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveEdit = () => {
    setIsSaving(true);
    setTimeout(() => {
      alert("Employee updated successfully!");
      setIsSaving(false);
      closeEditSidebar();
    }, 1000);
  };

  const openViewModal = (employee) => {
    setEmployeeToView(employee);
  };

  const closeViewModal = () => {
    setEmployeeToView(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Stats */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-cyan-800 mb-4">
          Employee Management
        </h1>
        <div className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {[
            { icon: UserCog, title: "Total Employees", value: "92" },
            { icon: Clock, title: "Pending Employees", value: "32" },
            { icon: UserCheck, title: "Active Employees", value: "48" },
            { icon: UserPlus, title: "New Hires", value: "92", per: "/month" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm p-4 border border-cyan-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-cyan-800">
                    {stat.value}
                    {stat.per && (
                      <span className="text-sm text-cyan-600">{stat.per}</span>
                    )}
                  </p>
                </div>
                <stat.icon className="text-cyan-600" size={32} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-cyan-200">
            <thead className="bg-cyan-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                  <input type="checkbox" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider hidden md:table-cell">
                  Position
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider hidden lg:table-cell">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider hidden xl:table-cell">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider hidden 2xl:table-cell">
                  Salary
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider hidden 2xl:table-cell">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-cyan-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-cyan-100">
              {employees.map((employee) => (
                <tr
                  key={employee._id}
                  className="hover:bg-cyan-50 transition-colors"
                >
                  <td className="px-4 py-2">
                    <input type="checkbox" />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          src={employee.avatar}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-cyan-900">
                          {employee.firstName} {employee.lastName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm font-medium text-cyan-900">
                      {employee.position}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
                    <div className="text-sm text-cyan-700">
                      {employee.department}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
                    <div className="text-sm text-cyan-700">
                      {employee.phone}
                    </div>
                    <div className="text-sm text-cyan-500">
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
                    <div className="text-sm font-medium text-cyan-900">
                      {employee.salary} ETB
                    </div>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.pendingApproval
                          ? "bg-yellow-100 text-yellow-900"
                          : employee.isActive
                          ? "bg-green-100 text-green-900"
                          : "bg-red-100 text-red-900"
                      }`}
                    >
                      {employee.pendingApproval
                        ? "Pending"
                        : employee.isActive
                        ? "Active"
                        : "InActive"}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                        title="View Details"
                        onClick={() => openViewModal(employee)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
                        title="Edit Employee"
                        onClick={() => openEditSidebar(employee)}
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

      {/* View Details Modal */}
      {employeeToView && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-cyan-800 font-semibold">
                Employee Details
              </h2>
              <button
                onClick={closeViewModal}
                className="rounded-lg p-2 text-cyan-600 hover:bg-cyan-50 transition-colors"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Employee Avatar and Basic Info */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-cyan-200">
              <div className="flex-shrink-0">
                <img
                  src={employeeToView.avatar}
                  alt={`${employeeToView.firstName} ${employeeToView.lastName}`}
                  className="h-24 w-24 object-cover rounded-full border-4 border-cyan-100"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-cyan-800">
                  {employeeToView.firstName} {employeeToView.lastName}
                </h3>
                <p className="text-cyan-600 font-medium">
                  {employeeToView.position}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      employeeToView.pendingApproval
                        ? "bg-yellow-100 text-yellow-900"
                        : employeeToView.isActive
                        ? "bg-green-100 text-green-900"
                        : "bg-red-100 text-red-900"
                    }`}
                  >
                    {employeeToView.pendingApproval
                      ? "Pending Approval"
                      : employeeToView.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-cyan-800 mb-3">
                  Contact Information
                </h4>

                <div>
                  <label className="block text-sm font-medium text-cyan-600 mb-1">
                    Email
                  </label>
                  <p className="text-cyan-800">{employeeToView.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-600 mb-1">
                    Phone
                  </label>
                  <p className="text-cyan-800">{employeeToView.phone}</p>
                </div>
              </div>

              {/* Work Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-cyan-800 mb-3">
                  Work Information
                </h4>

                <div>
                  <label className="block text-sm font-medium text-cyan-600 mb-1">
                    Department
                  </label>
                  <p className="text-cyan-800">{employeeToView.department}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-cyan-600 mb-1">
                    Salary
                  </label>
                  <p className="text-cyan-800 font-semibold">
                    {employeeToView.salary} ETB
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-cyan-200 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  closeViewModal();
                  openEditSidebar(employeeToView);
                }}
                className="flex-1 rounded-xl bg-cyan-600 py-2 text-white hover:bg-cyan-700 cursor-pointer transition-colors"
              >
                Edit Employee
              </button>
              <button
                type="button"
                onClick={closeViewModal}
                className="flex-1 rounded-xl border border-cyan-800 py-2 cursor-pointer hover:bg-cyan-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sidebar */}
      {isEditSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 transition-opacity"
            onClick={closeEditSidebar}
          />

          {/* Sidebar */}
          <div
            className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-2xl transform transition-transform duration-300 ${
              isEditSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-cyan-200 px-6 py-4">
                <h2 className="text-xl font-semibold text-cyan-800">
                  Edit Employee
                </h2>
                <button
                  onClick={closeEditSidebar}
                  className="rounded-lg p-2 text-cyan-600 hover:bg-cyan-50 transition-colors"
                  disabled={isSaving}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-800 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleEditFormChange}
                      className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                      placeholder="Enter first name"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-800 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={editFormData.lastName}
                      onChange={handleEditFormChange}
                      className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                      placeholder="Enter last name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-800 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditFormChange}
                      className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                      placeholder="Enter email"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-800 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editFormData.phone}
                      onChange={handleEditFormChange}
                      className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                      placeholder="Enter phone number"
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-800 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={editFormData.position}
                      onChange={handleEditFormChange}
                      className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                      placeholder="Enter position"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-800 mb-1">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={editFormData.department}
                      onChange={handleEditFormChange}
                      className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                      placeholder="Enter department"
                    />
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-800 mb-1">
                      Salary (ETB)
                    </label>
                    <input
                      type="number"
                      name="salary"
                      value={editFormData.salary}
                      onChange={handleEditFormChange}
                      className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                      placeholder="Enter salary"
                    />
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      id="isActive"
                      checked={editFormData.isActive}
                      onChange={handleEditFormChange}
                      className="h-4 w-4 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
                    />
                    <label
                      htmlFor="isActive"
                      className="text-sm font-medium text-cyan-800"
                    >
                      Active Employee
                    </label>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-cyan-200 px-6 py-4">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeEditSidebar}
                    className="flex-1 rounded-xl border border-cyan-800 py-2 cursor-pointer hover:bg-cyan-50 transition-colors"
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    disabled={isSaving}
                    className="flex-1 rounded-xl bg-cyan-600 py-2 text-white hover:bg-cyan-700 cursor-pointer disabled:cursor-not-allowed disabled:bg-cyan-400 transition-colors"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
