const AddEmployee = () => {
  return (
    <form className="px-10 text-cyan-800">
      <div className=" mt-5">
        <h1 className="text-3xl font-semibold max-md:text-lg">
          Employee Registration
        </h1>
        <p className="opacity-90 max-md:text-sm">
          Submit new employee for approval
        </p>
      </div>
      <div className="bg-white rounded-2xl mt-6 px-8 py-4 pb-6">
        <div>
          {" "}
          <h1 className="text-2xl font-bold mb-3 max-lg:text-lg max-lg:text-center">
            Personal Information
          </h1>
          <div className=" flex gap-3 lg:gap-20 max-lg:flex-col">
            <div className="flex flex-col flex-1">
              <label
                className="text-md text-cyan-500 font-medium"
                htmlFor="firstName"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
                id="firstName"
                type="text"
                placeholder="Enter first name"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label
                className="text-md text-cyan-500 font-medium "
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
                id="lastName"
                type="text"
                placeholder="Enter last Name"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label
                className="text-md text-cyan-500 font-medium "
                htmlFor="gender"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              >
                <option disabled selected>
                  Select gender
                </option>
                <option value="">Male</option>
                <option value="">Female</option>
              </select>
            </div>
          </div>
        </div>

        <hr className="my-5 border-cyan-800/10 b" />

        <h1 className="text-2xl font-bold mb-3 max-lg:text-lg max-lg:text-center">
          Contact Information
        </h1>
        <div className=" flex gap-3 lg:gap-20 max-lg:flex-col">
          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="email"
              type="text"
              placeholder="Enter email"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="phoneNumber"
            >
              Phone number
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="phoneNumber"
              type="text"
              placeholder="Enter phone number"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="address"
              type="text"
              placeholder="Enter Address"
            />
          </div>
        </div>

        <hr className="my-5 border-cyan-800/10 b" />

        <h1 className="text-2xl font-bold mb-3 max-lg:text-lg max-lg:text-center">
          Job Information
        </h1>
        <div className=" flex gap-3 lg:gap-20 max-lg:flex-col">
          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="position"
            >
              Position
            </label>
            <select
              name="position"
              id="position"
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
            >
              <option disabled selected>
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

          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="department"
            >
              Department
            </label>
            <select
              name="department"
              id="department"
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
            >
              <option disabled selected>
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

          <div className="flex flex-col flex-1  relative">
            <label
              className="text-md text-cyan-500 font-medium"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="salary"
              type="text"
              placeholder="Enter salary"
            />
            <span className="absolute top-8 right-4">ETB</span>
            <p className="text-xs hidden lg:block">
              Enter amount in Ethiopian Birr
            </p>
          </div>

          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="startDate"
            >
              Start Date
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="startDate"
              type="date"
              placeholder="Enter start date"
            />
          </div>
        </div>

        <hr className="my-5 border-cyan-800/10" />

        <div className="flex gap-8 my-10 text-lg font-medium lg:gap-40 ">
          <button className="w-full border border-cyan-800 rounded-xl py-3 hover:bg-cyan-100 active:scale-95 cursor-pointer">
            Cancel
          </button>
          <button className="w-full bg-cyan-800 rounded-xl text-white py-3 hover:bg-cyan-600 active:scale-95 cursor-pointer">
            Save Employee
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddEmployee;
