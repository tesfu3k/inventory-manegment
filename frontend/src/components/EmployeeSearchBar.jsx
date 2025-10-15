import { Search } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const EmployeeSearchBar = ({ onSearch }) => {
  // --- local states ---
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [status, setStatus] = useState("");

  // --- handle search ---
  const handleSearch = (overrides = {}) => {
    if (typeof onSearch === "function") {
      onSearch({
        query,
        department,
        status,
        ...overrides,
      });
    }
  };

  //Debounced Implementation
  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch();
    }, 400);
    return () => clearTimeout(handler);
  }, [query, department, status]);

  const handleDepartmentChange = (event) => {
    const value = event.target.value;
    setDepartment(value);
    handleSearch({ department: value });
  };

  const handleStatusChange = (event) => {
    const value = event.target.value;
    setStatus(value);
    handleSearch({ status: value });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/employees/departments`,
          { withCredentials: true }
        );
        if (data.success) setDepartments(data.data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
    fetchDepartments();
  }, []);
  return (
    <div className="flex gap-4 relative bg-white mt-5 py-5 px-8 rounded-2xl max-md:flex-col">
      <Search className="absolute top-7 left-10 " />
      <input
        className=" border rounded-lg p-2 pl-8 flex-1"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search by name or phone number email"
      />
      <div className="flex gap-4">
        <select
          className="border rounded-lg p-2"
          value={department}
          onChange={handleDepartmentChange}
        >
          <option value="">All Departments</option>
          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>
        <select
          className="border rounded-lg p-2"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeSearchBar;
