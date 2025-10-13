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
  X,
} from "lucide-react";
import EmployeeSearchBar from "../components/EmployeeSearchBar";
import { toast } from "react-hot-toast";
import { employeeColumns } from "../data/data.js";
import Table from "../components/Table";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const INITIAL_EMPLOYEE_FORM_STATE = {
  _id: "",
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
  const [updateEmployeeData, setUpdateEmpolyeeData] = useState(
    INITIAL_EMPLOYEE_FORM_STATE
  );
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

  const hydrateUpdateEmployeeData = (employee) => {
    if (!employee) return;
    setUpdateEmpolyeeData({
      _id: employee._id ?? "",
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
  };

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setDeleteConfirmation("");
    hydrateUpdateEmployeeData(employee);
    setIsSaving(false);
  };

  const closeDeleteModal = () => {
    setEmployeeToDelete(null);
    setDeleteConfirmation("");
    setIsDeleting(false);

    // setUpdateEmpolyeeData(INITIAL_EMPLOYEE_FORM_STATE);
    setIsSaving(false);
  };

  const openEditModel = (employee) => {
    setEmployeeToEdit(employee);
    hydrateUpdateEmployeeData(employee);
    setIsEditSidebarOpen(true);
  };

  const closeEditModel = () => {
    setEmployeeToEdit(null);
    setUpdateEmpolyeeData(INITIAL_EMPLOYEE_FORM_STATE);
    setIsEditSidebarOpen(false);
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

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setUpdateEmpolyeeData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!employeeToEdit) return;
    if (!updateEmployeeData._id) {
      toast.error(
        "Missing employee id. Please reopen the editor and try again."
      );
      return;
    }

    try {
      setIsSaving(true);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/employees/${
          updateEmployeeData._id
        }`,
        updateEmployeeData,
        { withCredentials: true, validateStatus: (status) => status < 500 }
      );
      console.log(data);
    } catch (error) {
      toast.error(
        error.message || "Something went wrong. Please try again later"
      );
    } finally {
      setIsSaving(false);
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
              onClick={() => openEditModel(employee)}
              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors"
              title="Edit Employee"
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

      {/* Open employee delete form */}
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

      {/* Open Employee Edit form */}
      {employeeToEdit && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-500 ${
              isEditSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            onClick={closeEditModel}
          />

          {/* Sidebar */}
          <div
            className={`fixed right-0 top-0 z-50 bg-white w-full h-full max-w-md shadow-2xl transition-transform duration-500 ease-in-out ${
              isEditSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col p-2 h-full">
              {/* Header */}
              <div className="flex justify-between items-center border-b-4 pb-3 text-cyan-500">
                <h1 className="text-xl text-cyan-800 font-semibold">
                  Edit Employee
                </h1>

                <button
                  onClick={closeEditModel}
                  className="bg-red-100 hover:cursor-pointer hover:bg-red-200 active:scale-90"
                >
                  <X className="text-red-800" />
                </button>
              </div>

              {/* Body */}
              <form
                onSubmit={handleEditSubmit}
                className="flex-1 overflow-y-auto px-6 py-4"
              >
                {" "}
                <div className="space-y-6">
                  <p className="text-md text-cyan-600 text-center mb-6">
                    Update the employee details and save your changes.
                  </p>

                  <div className="flex gap-3">
                    {" "}
                    {/* First Name */}
                    <div>
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={updateEmployeeData.firstName}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter first name"
                      />
                    </div>
                    {/* last Name */}
                    <div>
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="lastName"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={updateEmployeeData.lastName}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* gender */}
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <select
                        type="gender"
                        id="gender"
                        name="gender"
                        value={updateEmployeeData.gender}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Select gender"
                      >
                        <option value="" disabled>
                          Select gender
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    {/* email */}
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={updateEmployeeData.email}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {" "}
                    {/* phone */}
                    <div>
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="phone"
                      >
                        Phone number
                      </label>
                      <input
                        type="phone"
                        id="phone"
                        name="phone"
                        value={updateEmployeeData.phone}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter phone number"
                      />
                    </div>
                    {/* Address  */}
                    <div>
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        type="address"
                        id="address"
                        name="address"
                        value={updateEmployeeData.address}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter Address "
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {/* Position */}
                    <div>
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="position"
                      >
                        Position
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={updateEmployeeData.position}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter position"
                      />
                    </div>

                    {/* Department */}
                    <div>
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="department"
                      >
                        Department
                      </label>
                      <input
                        type="text"
                        id="department"
                        name="department"
                        value={updateEmployeeData.department}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter department"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {" "}
                    {/* Salary */}
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="salary"
                      >
                        Salary (ETB)
                      </label>
                      <input
                        type="number"
                        id="salary"
                        min={0}
                        name="salary"
                        value={updateEmployeeData.salary}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Enter salary"
                      />
                    </div>
                    {/* Start Date */}
                    <div className="flex-1">
                      <label
                        className="block text-sm font-medium text-cyan-800 mb-1"
                        htmlFor="startDate"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={updateEmployeeData.startDate}
                        onChange={handleEditChange}
                        className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
                        placeholder="Start Date"
                      />
                    </div>
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex gap-2 items-center">
                      {" "}
                      <input
                        type="checkbox"
                        name="pendingApproval"
                        id="pendingApproval"
                        checked={updateEmployeeData.pendingApproval}
                        onChange={handleEditChange}
                        className="h-4 w-4 rounded border-cyan-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      <label
                        htmlFor="pendingApproval"
                        className="text-sm font-medium text-cyan-800"
                      >
                        Pending Approval
                      </label>
                    </div>

                    <div className="flex-1 flex gap-2 items-center">
                      <input
                        type="checkbox"
                        name="isActive"
                        id="isActive"
                        checked={updateEmployeeData.isActive}
                        onChange={handleEditChange}
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

                  <div className="flex gap-3 border-t border-t-cyan-400 pt-8">
                    <button
                      onClick={closeEditModel}
                      className="flex-1 border border-cyan-800 py-2 rounded-xl hover:bg-cyan-50"
                      disabled={isSaving}
                      type="button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-cyan-800 text-white py-2 rounded-xl hover:bg-cyan-700"
                      disabled={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Employees;
