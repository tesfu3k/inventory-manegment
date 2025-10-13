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

  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const emptyEditForm = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    salary: "",
    startDate: "",
    department: "",
    position: "",
    phone: "",
    address: "",
    pendingApproval: false,
    isActive: false,
  };
  const [editForm, setEditForm] = useState(emptyEditForm);
  const [isSaving, setIsSaving] = useState(false);

  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [modalAction, setModalAction] = useState(null);
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

  const openEditModal = (employee) => {
    setEmployeeToEdit(employee);
    setEditForm({
      firstName: employee.firstName || "",
      lastName: employee.lastName || "",
      email: employee.email || "",
      gender: employee.gender || "",
      salary: employee.salary ?? "",
      startDate: employee.startDate
        ? new Date(employee.startDate).toISOString().split("T")[0]
        : "",
      department: employee.department || "",
      position: employee.position || "",
      phone: employee.phone || "",
      address: employee.address || "",
      pendingApproval: Boolean(employee.pendingApproval),
      isActive: Boolean(employee.isActive),
    });
    setIsSaving(false);
  };

  const closeEditModal = () => {
    setEmployeeToEdit(null);
    setEditForm(emptyEditForm);
    setIsSaving(false);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!employeeToEdit) return;

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "gender",
      "salary",
      "startDate",
      "department",
      "position",
      "phone",
      "address",
    ];

    const missingField = requiredFields.find(
      (field) => !`${editForm[field]}`.trim()
    );

    if (missingField) {
      toast.error("Enter all required fields");
      return;
    }

    try {
      setIsSaving(true);
      const payload = {
        ...editForm,
        salary: Number(editForm.salary),
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${employeeToEdit._id}`,
        payload,
        {
          withCredentials: true,
          validateStatus: (status) => status < 500,
        }
      );

      if (data.success) {
        toast.success(data.message || "Employee updated successfully");
        await fetchEmployees();
        await fetchStatus();
        closeEditModal();
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

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteConfirmation("");
    setModalAction(employee.isActive ? "deactivate" : "delete");
  };

  const closeDeleteModal = () => {
    setEmployeeToDelete(null);
    setDeleteConfirmation("");
    setIsDeleting(false);
    setModalAction(null);
  };

  const handleConfirmAction = async () => {
    if (!employeeToDelete) return;

    const confirmationToken = (
      employeeToDelete.firstName ||
      employeeToDelete.lastName ||
      employeeToDelete.email ||
      "CONFIRM"
    )
      .toString()
      .toUpperCase();

    if (deleteConfirmation.trim().toUpperCase() !== confirmationToken)
      return toast.error(
        `Please type ${confirmationToken} to confirm ${
          modalAction === "deactivate" ? "status change" : "deletion"
        }`
      );

    try {
      setIsDeleting(true);
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${employeeToDelete._id}`,
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );
      if (data.success) {
        toast.success(
          data.message ||
            (modalAction === "deactivate"
              ? "Employee marked as inactive"
              : "Employee deleted successfully")
        );
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
              {/* <div className="text-sm">{employee.email}</div> */}
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
              onClick={() => openEditModal(employee)}
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
      {/* <img src="/Portrait_Placeholder.png" alt="Logo" /> */}
      {/* <EmployeeTableTest /> */}

      {employeeToEdit && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-cyan-800 text-center mb-4">
              Edit Employee
            </h2>
            <p className="text-sm text-cyan-600 text-center mb-6">
              Update the employee details and save your changes.
            </p>
            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={editForm.firstName}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={editForm.lastName}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={editForm.gender}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  >
                    <option value="" disabled>
                      Select gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={editForm.department}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Position <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={editForm.position}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Salary <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    name="salary"
                    value={editForm.salary}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={editForm.startDate}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-cyan-500 font-medium">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex items-center gap-3 text-cyan-700 font-medium">
                  <input
                    type="checkbox"
                    name="pendingApproval"
                    checked={editForm.pendingApproval}
                    onChange={handleEditChange}
                  />
                  Pending Approval
                </label>
                <label className="flex items-center gap-3 text-cyan-700 font-medium">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={editForm.isActive}
                    onChange={handleEditChange}
                  />
                  Active
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 rounded-xl border border-cyan-800 py-3 text-cyan-800 hover:bg-cyan-50 active:scale-95"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 rounded-xl bg-cyan-800 py-3 text-white hover:bg-cyan-600 active:scale-95 disabled:cursor-not-allowed disabled:bg-cyan-400"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {employeeToDelete && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl text-red-800 mb-4 text-center font-semibold">
              {modalAction === "deactivate"
                ? "Mark Employee Inactive"
                : "Confirm Deletion"}
            </h2>
            <p className="text-sm text-cyan-700 mb-4 text-justify">
              {modalAction === "deactivate" ? (
                <>
                  This will change{" "}
                  <span className="font-semibold text-red-800">
                    {employeeToDelete.firstName} {employeeToDelete.lastName}
                  </span>{" "}
                  to an inactive status. Type{" "}
                  <span className="text-red-800 font-semibold">
                    {(
                      employeeToDelete.firstName ||
                      employeeToDelete.lastName ||
                      employeeToDelete.email ||
                      "CONFIRM"
                    )
                      .toString()
                      .toUpperCase()}
                  </span>{" "}
                  below to confirm.
                </>
              ) : (
                <>
                  This will permanently remove{" "}
                  <span className="font-semibold text-red-800">
                    {employeeToDelete.firstName} {employeeToDelete.lastName}
                  </span>{" "}
                  from your employees list. Type{" "}
                  <span className="text-red-800 font-semibold">
                    {(
                      employeeToDelete.firstName ||
                      employeeToDelete.lastName ||
                      employeeToDelete.email ||
                      "CONFIRM"
                    )
                      .toString()
                      .toUpperCase()}
                  </span>{" "}
                  below to confirm.
                </>
              )}
            </p>
            {(() => {
              const confirmationToken = (
                employeeToDelete.firstName ||
                employeeToDelete.lastName ||
                employeeToDelete.email ||
                "CONFIRM"
              )
                .toString()
                .toUpperCase();
              const isDeactivate = modalAction === "deactivate";
              const isDisabled =
                deleteConfirmation.trim().toUpperCase() !== confirmationToken ||
                isDeleting;
              const primaryButtonLabel = isDeactivate
                ? isDeleting
                  ? "Updating..."
                  : "Mark Inactive"
                : isDeleting
                ? "Deleting..."
                : "Delete";
              const primaryButtonClasses = `flex-1 rounded-xl py-2 text-white active:scale-95 disabled:cursor-not-allowed ${
                isDeactivate
                  ? "bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300"
                  : "bg-red-600 hover:bg-red-500 disabled:bg-red-400"
              }`;
              return (
                <>
                  <input
                    type="text"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder={`Type ${confirmationToken} to confirm`}
                    className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                  />
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={closeDeleteModal}
                      className="flex-1 rounded-xl border border-cyan-800 py-2  cursor-pointer hover:bg-cyan-50 active:scale-95"
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmAction}
                      disabled={isDisabled}
                      className={primaryButtonClasses}
                    >
                      {primaryButtonLabel}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
