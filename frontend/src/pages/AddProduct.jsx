import CategorySelector from "../components/CategorySelector.jsx";
const AddProduct = () => {
  return (
    <form onSubmit={""} className="px-10 text-cyan-800">
      <div className=" mt-5">
        <h1 className="text-3xl font-semibold max-md:text-lg">
          Product Registration
        </h1>
        <p className="opacity-90 max-md:text-sm">
          Add a new product to your catalog
        </p>
      </div>
      <div className="bg-white rounded-2xl mt-6 px-8 py-4 pb-6">
        <div>
          {" "}
          <h1 className="text-2xl font-bold mb-3 max-lg:text-lg max-lg:text-center">
            Product Details
          </h1>
          <div className=" flex gap-3 lg:gap-20 max-lg:flex-col">
            <div className="flex flex-col flex-1">
              <label
                className="text-md text-cyan-500 font-medium"
                htmlFor="firstName"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
                id="productName"
                type="text"
                name="productName"
                onChange={""}
                value={""}
                placeholder="Enter product name"
              />
            </div>

            {/* <div className="flex flex-col flex-1">
              <label
                className="text-md text-cyan-500 font-medium "
                htmlFor="gender"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                id="gender"
                // value={employeeData.gender}
                // onChange={onChangeHandler}
                className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              >
                <option value="">Select category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div> */}

            <CategorySelector />
          </div>
          <div className="flex flex-col flex-1 mt-6">
            <label
              className="text-md text-cyan-500 font-medium"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20 resize-none"
              id="description"
              name="description"
              rows={4}
              placeholder="Enter short product description"
            ></textarea>
          </div>
        </div>

        <hr className="my-5 border-cyan-800/10 b" />

        <h1 className="text-2xl font-bold mb-3 max-lg:text-lg max-lg:text-center">
          Stock and Pricing
        </h1>
        <div className=" flex gap-3 lg:gap-20 max-lg:flex-col">
          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium"
              htmlFor="email"
            >
              Unit Price<span className="text-red-500">*</span>
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="unitPrice"
              type="number"
              name="unitPrice"
              autoComplete="unitPrice"
              // value={employeeData.email}
              // onChange={onChangeHandler}
              placeholder="Enter price"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="stockQuantity"
            >
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="stockQuantity"
              type="number"
              default={0}
              name="stockQuantity"
              // value={employeeData.stockQuantity}
              // onChange={onChangeHandler}
              placeholder="Enter available stock quantity"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="address"
            >
              Low Stock Threshold <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20"
              id="lowStockThreshold"
              type="text"
              name="lowStockThreshold"
              default={10}
              // value={employeeData.address}
              // onChange={onChangeHandler}
              placeholder="Enter Address"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label
              className="text-md text-cyan-500 font-medium "
              htmlFor="address"
            >
              Created Date <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full mt-1 border border-cyan-300 rounded-md px-3 py-2 text-sm outline-0 focus:ring-4 focus:ring-cyan-500/20 cursor-not-allowed"
              id="lowStockThreshold"
              type="text"
              name="lowStockThreshold"
              readOnly
              disabled
              default={10}
              // value={employeeData.address}
              // onChange={onChangeHandler}
              placeholder=""
            />
          </div>
        </div>

        <hr className="my-5 border-cyan-800/10" />

        <div className="flex gap-8 my-10 text-lg font-medium lg:gap-40 ">
          <button
            type="button"
            // onClick={onCancelHandler}
            className="w-full border border-cyan-800 rounded-xl py-3 hover:bg-cyan-100 active:scale-95 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full bg-cyan-800 rounded-xl text-white py-3 hover:bg-cyan-600 active:scale-95 cursor-pointer"
          >
            Save Product
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
