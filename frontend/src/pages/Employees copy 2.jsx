import Cards from "../components/Cards";
import EmployeeNavBar from "../components/EmployeeNavBar";
import {
  UserCog,
  Clock,
  UserCheck,
  UserPlus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import EmployeeSearchBar from "../components/EmployeeSearchBar";
import { toast } from "react-hot-toast";
import { employeeColumns } from "../data/data.js";
import Table from "../components/Table";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState({
    totalEmployees: "",
    pendingEmployees: "",
    activeEmployees: "",
    newHires: "",
  });

  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    salary: "",
    isActive: true,
  });

  const employeeStatus = [
    {
      id: 1,
      icons: UserCog,
      title: "Total Employees",
      value: status.totalEmployees,
    },
    {
      id: 2,
      icons: Clock,
      title: "Pending Employees",
      value: status.pendingEmployees,
    },
    {
      id: 3,
      icons: UserCheck,
      title: "Active Employees",
      value: status.activeEmployees,
    },
    {
      id: 4,
      icons: UserPlus,
      title: "New Hires ",
      value: status.newHires,
      per: "/month",
    },
  ];

  const fetchEmployees = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/all`,
        { withCredentials: true }
      );
      setEmployees(data.data || []);
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/status`,
        { withCredentials: true }
      );
      setStatus((prev) => ({ ...prev, ...(data.status || {}) }));
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
    fetchStatus();
  }, [fetchEmployees, fetchStatus]);

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteConfirmation("");
  };

  const closeDeleteModal = () => {
    setEmployeeToDelete(null);
    setDeleteConfirmation("");
    setIsDeleting(false);
  };

  const openEditSidebar = (employee) => {
    setEmployeeToEdit(employee);
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
  };

  const closeEditSidebar = () => {
    setIsEditSidebarOpen(false);
    setTimeout(() => {
      setEmployeeToEdit(null);
      setEditFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        salary: "",
        isActive: true,
      });
    }, 300);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveEdit = async () => {
    if (!employeeToEdit) return;

    try {
      setIsSaving(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${
          employeeToEdit._id
        }`,
        editFormData,
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );
      if (data.success) {
        toast.success(data.message || "Employee updated successfully");
        await fetchEmployees();
        await fetchStatus();
        closeEditSidebar();
        return;
      }
      toast.error(data.message || "Failed to update employee");
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!employeeToDelete) return;

    if (
      deleteConfirmation.trim().toUpperCase() !==
      employeeToDelete.firstName.toUpperCase()
    )
      return toast.error(
        `Please type ${employeeToDelete.firstName} to confirm deletion`
      );

    try {
      setIsDeleting(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${
          employeeToDelete._id
        }`,
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );
      if (data.success) {
        toast.success(data.message || "Employee deleted successfully");
        await fetchEmployees();
        await fetchStatus();
        closeDeleteModal();
        return;
      }
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const renderData = () => {
    return employees.map((employee) => (
      <tr key={employee._id}>
        {/* checkbox */}
        <td className="px-4 py-2">
          <input type="checkbox" />
        </td>

        {/* employee Information*/}
        <td className="px-4 py-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <img
                src={employee.avatar}
                alt={
                  `${employee.firstName || ""} ${
                    employee.lastName || ""
                  }`.trim() || "Employee"
                }
                className="h-12 w-12 object-cover rounded-full"
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">
                {employee.firstName} {employee.lastName}
              </div>
            </div>
          </div>
        </td>

        {/* position */}
        <td className="px-4 py-2 whitespace-nowrap hidden md:table-cell">
          <div className="text-sm font-medium">{employee.position}</div>
        </td>

        {/* Department */}
        <td className="px-4 py-2 whitespace-nowrap hidden lg:table-cell">
          <div className="text-sm">{employee.department}</div>
        </td>

        {/* Contact */}
        <td className="px-4 py-2 whitespace-nowrap hidden xl:table-cell">
          <div className="text-sm">{employee.phone}</div>
          <div className="text-sm text-cyan-500">{employee.email}</div>
        </td>

        {/* Salary */}
        <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
          <div className="text-sm font-medium">{employee.salary} ETB</div>
        </td>

        {/* status */}
        <td className="px-4 py-2 whitespace-nowrap hidden 2xl:table-cell">
          <span
            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              employee.pendingApproval === true
                ? "bg-yellow-100 text-yellow-900"
                : employee.isActive === true
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
              onClick={() => openEditSidebar(employee)}
            >
              <Edit size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
              title="Delete Employee"
              onClick={() => openDeleteModal(employee)}
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
      <EmployeeNavBar />
      <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {employeeStatus.map((card) => (
          <Cards
            key={card.id}
            icons={card.icons}
            value={card.value}
            title={card.title}
            per={card.per}
          />
        ))}
      </div>
      <EmployeeSearchBar />
      <Table renderData={renderData} colData={employeeColumns} />

      {/* Delete Modal */}
      {employeeToDelete && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl text-red-800 mb-4 text-center font-semibold">
              Confirm Deletion
            </h2>
            <p className="text-sm text-cyan-700 mb-4 text-justify">
              This will permanently remove{" "}
              <span className="font-semibold text-red-800">
                {employeeToDelete.firstName} {employeeToDelete.lastName}
              </span>{" "}
              from your employees list. Type{" "}
              <span className="text-red-800 font-semibold">
                {employeeToDelete.firstName.toUpperCase()}
              </span>{" "}
              below to confirm
            </p>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder={`Type ${employeeToDelete.firstName.toUpperCase()} to confirm`}
              className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
            />
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="flex-1 rounded-xl border border-cyan-800 py-2  cursor-pointer hover:bg-cyan-50 active:scale-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={
                  deleteConfirmation.trim().toUpperCase() !==
                    employeeToDelete.firstName.toUpperCase() || isDeleting
                }
                className="flex-1 rounded-xl bg-red-600 py-2 text-white hover:text-red-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-400 active:scale-95"
              >
                {isDeleting ? "Deleting..." : "Delete"}
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
};

export default Employees;
