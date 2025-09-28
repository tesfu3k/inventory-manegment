import Cards from "../components/Cards";
import EmployeeNavBar from "../components/EmployeeNavBar";
import { UserCog, Clock, UserCheck, UserPlus } from "lucide-react";
import EmployeeSearchBar from "../components/EmployeeSearchBar";

const employeeStatus = [
  {
    id: 1,
    icons: UserCog,
    title: "Total Employees",
    value: "0",
  },
  {
    id: 2,
    icons: Clock,
    title: "Pending Employees",
    value: "0",
  },
  {
    id: 3,
    icons: UserCheck,
    title: "Active Employees",
    value: "0",
  },
  {
    id: 4,
    icons: UserPlus,
    title: "New Hires ",
    value: "0 ",
    per: "/month",
  },
];

const Employees = () => {
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
    </div>
  );
};

export default Employees;
