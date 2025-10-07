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
import { useEffect, useState } from "react";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState({
    totalEmployees: "",
    pendingEmployees: "",
    activeEmployees: "",
    newHires: "",
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

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/employees/all",
          { withCredentials: true }
        );
        setEmployees(data.data);
      } catch (error) {
        toast.error(
          error.message || "Something went wrong. Please try again later"
        );
      }
    };
    getEmployee();

    const fatchStatus = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/employees/status",
          { withCredentials: true }
        );
        setStatus(data.status);
      } catch (error) {
        toast.error(
          error.message || "Something went wrong. Please try again later"
        );
      }
    };
    fatchStatus();
  }, []);
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
                alt={employee.name}
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
    </div>
  );
};

export default Employees;
