import User from "../models/user.model.js";
import Employee from "../models/employee.model.js";
import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs";

const registerEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
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
    !password ||
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
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "weak password", success: false, data: null });

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        message: "This email is already registered",
        success: false,
        data: null,
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creat user document
    const newUser = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: "employee",
      isActive: false,
    });

    // Remove password from user object (so it won’t leak in response)
    const { password: _, ...userWithoutPassword } = newUser._doc;

    //create Employee document linked to user
    const newEmployee = await Employee.create({
      userId: User._id,
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
    const { userId, ...employeeResponse } = newEmployee._doc;

    res.status(201).json({
      message: "Employee registered, awaiting approval",
      success: true,
      data: employeeResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ massage: "internal sever error", success: false, data: null });
    console.log(error.message);
  }
};

const listPendingEmployees = async (req, res) => {
  try {
    //to get pending employees, excluding userId.
    const pendingEmployees = await Employee.find({
      pendingApproval: true,
    }).select("-userId");

    res.status(200).json({
      message: "Pending employees retrieved",
      success: true,
      data: pendingEmployees,
    });
  } catch (error) {
    res
      .status(500)
      .json({ massage: "internal sever error", success: false, data: null });
    console.log(error.message);
  }
};

const approveEmployee = async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Find employee only if pendingApproval is true
    const employee = await Employee.findById({
      _id: employeeId,
      pendingApproval: true,
    });

    if (!employee)
      return res.status(404).json({
        message: "Employee not found or already approved",
        success: false,
        data: null,
      });

    //Update linked User
    const updatedEmployee = await User.findByIdAndUpdate(employee.userId, {
      isActive: true,
    });

    // Exclude userId from response
    const { userId, ...approveEmployee } = updatedEmployee._doc;
    res
      .status(200)
      .json({
        message: "Employee approved",
        success: true,
        data: approveEmployee,
      });
  } catch (error) {
    res
      .status(500)
      .json({ massage: "internal sever error", success: false, data: null });
    console.log(error.message);
  }
};
