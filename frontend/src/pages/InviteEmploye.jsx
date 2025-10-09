import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const InviteEmploye = () => {
  const [isError, setIsError] = useState(false);
  const [errorMesage, setErrorMesage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [regInviteEmployee, setRegInviteEmployee] = useState({
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
  });
  const { id } = useParams();
  const navigate = useNavigate();
  // useEffect once load
  /**
   * check if the id in the model is not expire or not submited then
   * in the api
   * - check if the id is exisit
   * - not expired or not submited if yes then show a message in the page "registration like arleady expired or submitted"
   * - other wise show the form and take the data then filep the isSubmited = true then save the data
   */
  // after save change the isSubmited true

  useEffect(() => {
    const validateURL = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/employees/invite/${id}`,
          {
            withCredentials: true,
            validateStatus: (status) => status < 500,
          }
        );

        if (!data.success) {
          setIsError(true);
          setErrorMesage(data.message || "Invalid or expired invitation link");
        }
      } catch (error) {
        console.error("Error validating invitation:", error);
        setIsError(true);
        setErrorMesage("Something went wrong. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    validateURL();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        {" "}
        Validating invitation link...
      </div>
    );

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Invalid Link</h1>
        <p>{errorMesage}</p>
      </div>
    );

  const onChangeHandler = (e) => {
    const { value, name } = e.target;

    setRegInviteEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !regInviteEmployee.firstName ||
      !regInviteEmployee.lastName ||
      !regInviteEmployee.email ||
      !regInviteEmployee.gender ||
      !regInviteEmployee.salary ||
      !regInviteEmployee.startDate ||
      !regInviteEmployee.department ||
      !regInviteEmployee.position ||
      !regInviteEmployee.phone ||
      !regInviteEmployee.address
    )
      return toast.error("Enter all required fields");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="px-10 py-8 max-w-4xl mx-auto text-cyan-800 bg-white rounded-2xl shadow-lg"
    >
      <h1 className="text-3xl font-semibold mb-4 text-center">
        Complete Employee Registration
      </h1>
      <p className="text-center mb-6 text-gray-500">
        Fill in your details to complete your registration
      </p>

      {/* Personal Information */}
      <h2 className="text-2xl font-bold mb-3">Personal Information</h2>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={regInviteEmployee.firstName}
            onChange={onChangeHandler}
            placeholder="Enter first name"
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={regInviteEmployee.lastName}
            onChange={onChangeHandler}
            placeholder="Enter last name"
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            name="gender"
            value={regInviteEmployee.gender}
            onChange={onChangeHandler}
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      <hr className="my-5 border-cyan-800/10" />

      {/* Contact Information */}
      <h2 className="text-2xl font-bold mb-3">Contact Information</h2>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={regInviteEmployee.email}
            onChange={onChangeHandler}
            placeholder="Enter email"
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={regInviteEmployee.phone}
            onChange={onChangeHandler}
            placeholder="e.g. +251 9xx xxx xxx"
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={regInviteEmployee.address}
            onChange={onChangeHandler}
            placeholder="Enter address"
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          />
        </div>
      </div>

      <hr className="my-5 border-cyan-800/10" />

      {/* Job Information */}
      <h2 className="text-2xl font-bold mb-3">Job Information</h2>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Position <span className="text-red-500">*</span>
          </label>
          <select
            name="position"
            value={regInviteEmployee.position}
            onChange={onChangeHandler}
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          >
            <option value="" disabled>
              Select position
            </option>
            <option value="engineer">Engineer</option>
            <option value="seniorEngineer">Senior Engineer</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="intern">Intern</option>
            <option value="designer">Designer</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            name="department"
            value={regInviteEmployee.department}
            onChange={onChangeHandler}
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          >
            <option value="" disabled>
              Select department
            </option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="sales">Sales</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
            <option value="operations">Operations</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col relative">
          <label className="text-cyan-500 font-medium">
            Salary <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min={0}
            step={1}
            name="salary"
            value={regInviteEmployee.salary}
            onChange={onChangeHandler}
            placeholder="Enter salary"
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          />
          <span className="absolute top-8 right-4">ETB</span>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-cyan-500 font-medium">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="startDate"
            value={regInviteEmployee.startDate}
            onChange={onChangeHandler}
            className="mt-1 border border-cyan-300 rounded-md px-3 py-2 outline-0 focus:ring-4 focus:ring-cyan-500/20"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex-1 border border-cyan-800 rounded-xl py-3 hover:bg-cyan-100 active:scale-95"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-cyan-800 text-white py-3 rounded-xl hover:bg-cyan-600 active:scale-95"
        >
          Complete Registration
        </button>
      </div>
    </form>
  );
};

export default InviteEmploye;
