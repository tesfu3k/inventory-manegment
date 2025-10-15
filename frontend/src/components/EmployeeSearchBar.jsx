import { Search } from "lucide-react";
import { useState } from "react";

const EmployeeSearchBar = ({ onSearch }) => {
  // --- local states ---
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  // --- handle search ---
  const handleSearch = () => {
    if (typeof onSearch === "function") {
      onSearch({
        query,
        department,
        status,
      });
    }
  };
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
          onChange={(e) => {
            setDepartment(e.target.value);
            handleSearch();
          }}
        >
          <option value="">All Departments</option>
          <option value="HR">Human Resources</option>
          <option value="Sales">Sales</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Operations">Operations</option>
        </select>
        <select
          className="border rounded-lg p-2"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleSearch();
          }}
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
