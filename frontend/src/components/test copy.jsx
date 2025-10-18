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
//import EmployeeTableTest from "../components/Table";
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
  const requiredConfirmationText = "DELETE";
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

  const handleDelete = async () => {
    if (!employeeToDelete) return;

    if (deleteConfirmation.trim().toUpperCase() !== requiredConfirmationText) {
      toast.error(
        `Please type ${requiredConfirmationText} to confirm deletion.`
      );
      return;
    }

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

      toast.error(data.message || "Failed to delete employee");
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
            >
              <Edit size={16} />
            </button>
            <button
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
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
      {employeeToDelete && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-semibold text-cyan-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-sm text-cyan-700 mb-4">
              This will permanently remove{" "}
              <span className="font-semibold">
                {employeeToDelete.firstName} {employeeToDelete.lastName}
              </span>{" "}
              from your employees list. Type{" "}
              <span className="font-semibold">{requiredConfirmationText}</span>{" "}
              below to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder={`Type ${requiredConfirmationText} to confirm`}
              className="w-full rounded-lg border border-cyan-300 px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
            />
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeDeleteModal}
                className="flex-1 rounded-xl border border-cyan-800 py-2 text-cyan-800 hover:bg-cyan-50 active:scale-95"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={
                  deleteConfirmation.trim().toUpperCase() !==
                    requiredConfirmationText || isDeleting
                }
                className="flex-1 rounded-xl bg-red-600 py-2 text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-400 active:scale-95"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <img src="/Portrait_Placeholder.png" alt="Logo" /> */}
      {/* <EmployeeTableTest /> */}
    </div>
  );
};

export default Employees;
