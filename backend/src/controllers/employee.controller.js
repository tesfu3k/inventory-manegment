//import User from "../models/user.model.js";
import employeeModel from "../models/employee.model.js";
import { customerModel } from "../models/customer.model.js";
import { supplierModel } from "../models/supplier.model.js";
import { productModel } from "../models/product.model.js";
import { saleModel } from "../models/sale.model.js";
import { purchaseModel } from "../models/purchase.model.js";
import { invitationModel } from "../models/invitation.model.js";
import mongoose from "mongoose";

const registerEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
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
    !gender ||
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
      gender,
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
    const employee = await employeeModel.findById(employeeId);

    if (!employee)
      return res.status(404).json({
        message: "Employee not found",
        success: false,
        data: null,
      });

    const wasPending = employee.pendingApproval;

    await employeeModel.findByIdAndDelete(employeeId);

    res.status(200).json({
      message: wasPending
        ? "Employee registration rejected"
        : "Employee deleted successfully",
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

const updateEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    gender,
    salary,
    startDate,
    department,
    position,
    phone,
    address,
    pendingApproval,
    isActive,
  } = req.body;
  if (
    !firstName &&
    !lastName &&
    !email &&
    !gender &&
    !salary &&
    !startDate &&
    !department &&
    !position &&
    !phone &&
    !address &&
    !pendingApproval &&
    !isActive
  )
    return res.status(400).json({
      message: "At least one feild required tobe update",
      success: false,
      data: null,
    });
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({
      message: "Valid employee id required",
      success: false,
      data: null,
    });

  try {
    const employee = await employeeModel.findById(id);
    if (!employee)
      return res.status(400).json({
        success: false,
        message: "No emplyee is found to update",
        data: null,
      });
    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        gender,
        salary,
        startDate,
        department,
        position,
        phone,
        address,
        pendingApproval,
        isActive,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Employee updated successfully",
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
  }
};

const getAllEmployee = async (req, res) => {
  try {
    const allEmployees = await employeeModel.find({});

    res.status(200).json({
      message: "All employees retrieved",
      success: true,
      data: allEmployees,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal sever error", success: false, data: null });
    console.log(error);
  }
};

const getPaginatedEmployeeList = async (req, res) => {
  try {
    //  Extract pagination parameters from the query string (default page=1, limit=10)
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    // Fetch the current page data and total count
    const [employees, total] = await Promise.all([
      employeeModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),

      employeeModel.countDocuments(),
    ]);

    // Calculate total pages and range display (e.g. 1–10 of 124)
    const totalPages = Math.ceil(total / limit);
    const from = total === 0 ? 0 : skip + 1;
    const to = Math.min(skip + limit, total);

    //  Respond with paginated results and meta info
    res.status(200).json({
      message: "Employees retrieved successfully",
      success: true,
      data: employees,
      meta: {
        page,
        limit,
        total,
        totalPages,
        from,
        to,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      data: null,
    });
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

const employeeStatus = async (req, res) => {
  try {
    const totalEmployees = await employeeModel.countDocuments();

    // Pending approvals
    const pendingEmployees = await employeeModel.countDocuments({
      pendingApproval: true,
    });

    // Active employees
    const activeEmployees = await employeeModel.countDocuments({
      isActive: true,
    });

    // New hires within last 30 days
    const newHires = await employeeModel.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    res.json({
      success: true,
      status: { totalEmployees, pendingEmployees, activeEmployees, newHires },
    });
  } catch (error) {
    console.error("Error fetching employee status:", error);
    res.status(500).json({
      message: "Failed to fetch stats",
      success: false,
      data: null,
    });
  }
};

const genInviteLink = async (req, res) => {
  const { userId } = req; // get userId from middleware
  const expirationDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
  if (!mongoose.Types.ObjectId.isValid(userId))
    return res
      .status(404)
      .json({ mmessage: "unauthorized", success: false, data: null });
  try {
    const invitation = await invitationModel.create({
      userId,
      expiredAt: expirationDate,
    });

    const invitationURL = `${process.env.FRONTEND_URL}/employees/record/${invitation._id}`;

    res.status(201).json({
      message: "Invitation url created sucessfully",
      success: true,
      data: { link: invitationURL },
    });
  } catch (error) {
    console.error("Error generating invitation link:", error);
    res.status(500).json({
      message: "Failed to generate link",
      success: false,
      data: null,
    });
  }
};

const verifyInviteLink = async (req, res) => {
  const { id } = req.params; // get Invitation Id from url

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({
        message: "Invalid invitation linkS",
        success: false,
        data: null,
      });

    const invitation = await invitationModel.findById(id);

    if (!invitation)
      return res.status(400).json({
        message: "Invitation is not found",
        success: false,
        data: null,
      });

    // Check if expired
    if (new Date() > new Date(invitation.expiredAt))
      return res.status(410).json({
        message: "This invitation link has expired",
        success: false,
        data: null,
      });
    // Check if already submitted
    if (invitation.isSubmitted)
      return res.status(409).json({
        message: "The Registration link has already submitted",
        success: false,
        data: null,
      });

    // if it is valid link
    res.status(200).json({
      message: "Invitation link is valid",
      success: true,
      data: { id: invitation._id },
    });
  } catch (error) {
    console.error("Error varifying invitation link", error);
    res.status(500).json({
      message: "Server error verifying invitation link.",
      success: false,
      data: null,
    });
  }
};

export const registerInvitedEmployee = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    const invitation = await invitationModel.findById(id);
    if (!invitation)
      return res
        .status(400)
        .json({ success: false, message: "Invalid invitation link" });

    if (invitation.isSubmitted)
      return res
        .status(400)
        .json({ success: false, message: "Invitation already used" });

    if (invitation.expiredAt < new Date())
      return res
        .status(400)
        .json({ success: false, message: "Invitation link expired" });

    // if (invitation.email !== formData.email)
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Email does not match invitation" });

    const existingEmployee = await employeeModel.findOne({
      email: formData.email,
    });
    if (existingEmployee)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    // Create new employee
    const newEmployee = await employeeModel.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      salary: formData.salary,
      startDate: formData.startDate,
      department: formData.department,
      position: formData.position,
      phone: formData.phone,
      address: formData.address,
      pendingApproval: true,
      isActive: false,
    });

    // Mark invitation as used
    invitation.isSubmitted = true;
    await invitation.save();

    res.status(201).json({
      success: true,
      message: "Employee registered successfully and awaiting approval",
      data: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const dashboardStatus = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const totalEmployees = await employeeModel.countDocuments();
    const totalCustomers = await customerModel.countDocuments();
    const totalSupplier = await supplierModel.countDocuments();
    const totalProduct = await productModel.countDocuments();

    const todaySale = await saleModel
      .find({ createdAt: { $gte: today } })
      .select({ totalPrice: true });
    const todayTotalSale = todaySale.reduce((prev, price) => prev + price, 0);

    const todayPurchase = await purchaseModel
      .find({
        createdAt: { $gte: today },
      })
      .select({ totalCost: true });
    const todayTotalPurchase = todayPurchase.reduce(
      (prev, price) => prev + price,
      0
    );

    // let totalPrice = 0;
    // totalSale.forEach((price) => {
    //   totalPrice += price
    // })

    return res.status(200).json({
      success: true,
      status: {
        totalCustomers,
        totalEmployees,
        todayTotalPurchase,
        totalSupplier,
        todayTotalSale,
        totalProduct,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard status:", error);
    res.status(500).json({
      message: "Failed to fetch stats",
      success: false,
      data: null,
    });
  }
};

export {
  registerEmployee,
  listApprovedEmployees,
  approveEmployee,
  rejectEmployee,
  listPendingEmployees,
  getEmployeeById,
  getAllEmployee,
  employeeStatus,
  dashboardStatus,
  genInviteLink,
  verifyInviteLink,
  updateEmployee,
  getPaginatedEmployeeList
};
