//import User from "../models/user.model.js";
import employeeModel from "../models/employee.model.js";

const registerEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    salary,
    startDate,
    department,
    position,
    phone,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !salary ||
    !startDate ||
    !department ||
    !position ||
    !phone ||
    !address
  )
    return res.status(400).json({
      message: "Please enter all required fields",
      success: false,
      data: null,
    });
  // if (password.length < 6)
  //   return res
  //     .status(400)
  //     .json({ message: "weak password", success: false, data: null });

  try {
    const existingEmployee = await employeeModel.findOne({ email: email });
    if (existingEmployee)
      return res.status(400).json({
        message: "This email is already registered",
        success: false,
        data: null,
      });

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // //creat Employee document
    // const newEmployee = await Employee.create({
    //   name: `${firstName} ${lastName}`,
    //   email,
    //   // password: hashedPassword,
    //   role: "employee",
    //   isActive: false,
    // });

    // Remove password from user object (so it won’t leak in response)
    // const { password: _, ...userWithoutPassword } = newUser._doc;

    //create Employee document linked to user
    const newEmployee = await employeeModel.create({
      // userId: User._id,
      firstName,
      lastName,
      email,
      salary,
      startDate,
      department,
      position,
      phone,
      address,
      pendingApproval: true,
      isActive: false,
    });

    // Prepare employee response without userId
    // const { userId, ...employeeResponse } = newEmployee._doc;

    res.status(201).json({
      message: "Employee registered, awaiting approval",
      success: true,
      //data: employeeResponse,
      data: newEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
    console.log(error);
  }
};

const listPendingEmployees = async (req, res) => {
  try {
    //to get pending employees, excluding userId.
    const pendingEmployees = await employeeModel.find({
      pendingApproval: true,
    });

    res.status(200).json({
      message: "Pending employees retrieved",
      success: true,
      data: pendingEmployees,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
    console.log(error);
  }
};

const approveEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Find employee only if pendingApproval is true
    const employee = await employeeModel.findById(employeeId);

    if (!employee)
      return res.status(404).json({
        message: "Employee not found or already approved",
        success: false,
        data: null,
      });

    //Update linked User
    const approvedEmployee = await employeeModel.findByIdAndUpdate(
      employeeId,
      {
        isActive: true,
        pendingApproval: false,
      },
      { new: true }
    );

    // Approved Employee list

    // // Exclude userId from response
    // const { userId, ...approveEmployee } = updatedEmployee._doc;
    res.status(200).json({
      message: "Employee approved",
      success: true,
      data: approvedEmployee,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
    console.log(error.message);
  }
};

const rejectEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await employeeModel.findOne({
      _id: employeeId,
      pendingApproval: true,
    });

    if (!employee)
      return res.status(404).json({
        message: "Employee not found or already processed",
        success: false,
        data: null,
      });

    // const userId = employee.userId;

    await employeeModel.findByIdAndDelete(employeeId);

    res.status(200).json({
      message: "Employee registration rejected",
      success: true,
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
    console.log(error.message);
  }
};

const listApprovedEmployees = async (req, res) => {
  try {
    const getApprovedEmployees = await employeeModel.find({
      isActive: true,
      pendingApproval: false,
    });

    res.status(200).json({
      message: "Employees retrieved",
      success: true,
      data: getApprovedEmployees,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
    console.log(error.message);
  }
};

const getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;

  try {
    const employee = await employeeModel.findById(employeeId);
    if (!employee)
      return res
        .status(404)
        .json({ message: "Employee not found", success: false, data: null });

    res
      .status(200)
      .json({ message: "Employee Retrieved", success: true, data: employee });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
    console.log(error.message);
  }
};

export {
  registerEmployee,
  listApprovedEmployees,
  approveEmployee,
  rejectEmployee,
  listPendingEmployees,
  getEmployeeById,
};
