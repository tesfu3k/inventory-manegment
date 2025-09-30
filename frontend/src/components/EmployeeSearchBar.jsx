import { Search } from "lucide-react";

const EmployeeSearchBar = () => {
  return (
    <div className="flex gap-4 relative bg-white mt-5 py-5 px-8 rounded-2xl max-md:flex-col">
      <Search className="absolute top-7 left-10 " />
      <input
        className=" border rounded-lg p-2 pl-8 flex-1"
        type="search"
        placeholder="Search by name or phone number email"
      />
      <div className="flex gap-4">
        <select className="border rounded-lg p-2">
          <option value="" disabled selected>
            All Departments
          </option>
          <option value="hr">Human Resources</option>
          <option value="sales">Sales</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
          <option value="operations">Operations</option>
        </select>
        <select className="border rounded-lg p-2">
          <option value="" disabled selected>
            Status
          </option>
          <option value="Active">Active</option>
          <option value="InActive">In Active</option>
        </select>
      </div>
    </div>
  );
};

export default EmployeeSearchBar;
