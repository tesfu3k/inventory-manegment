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
                First Name
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

        <hr className="my-10 border-cyan-800/10 b" />

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
      </div>
    </form>
  );
};

export default AddEmployee;
