import { Search } from "lucide-react";
import { useState } from "react";

const EmployeeSearchBar = ({ onSearch }) => {
  // --- local states ---
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");

  // --- when user types or changes dropdowns ---
  const handleSearch = () => {
    onSearch({
      query,
      department,
      status,
    });
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
          <option value="" disabled>
            All Departments
          </option>
          <option value="hr">Human Resources</option>
          <option value="sales">Sales</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
          <option value="operations">Operations</option>
        </select>
        <select
          className="border rounded-lg p-2"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleSearch();
          }}
        >
          <option value="" disabled>
            Status
          </option>
          <option value="Active">Active</option>
          <option value="InActive">In Active</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeSearchBar;
