import { Router } from "express";

import { protectRoute } from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

import {
  approveEmployee,
  dashboardStatus,
  employeeStatus,
  updateEmployee,
  genInviteLink,
  getAllEmployee,
  getEmployeeById,
  listApprovedEmployees,
  listPendingEmployees,
  registerEmployee,
  registerInvitedEmployee,
  rejectEmployee,
  verifyInviteLink,
} from "../controllers/employee.controller.js";

const route = new Router();

//Public self-registration
route.post("/register", registerEmployee);

//Admin-only: invitation link generator
route.post("/invite", protectRoute, adminMiddleware, genInviteLink);

//Public: verify invite link
route.get("/invite/:id", verifyInviteLink);

// Public: Register invited employee
route.post("/invite/:id", registerInvitedEmployee);

//Admin-only: view pending registrations list
route.get("/pending", protectRoute, adminMiddleware, listPendingEmployees);

//Admin-only: Approve a pending employee
route.post("/:id/approve", protectRoute, adminMiddleware, approveEmployee);

//Admin-only: All employees list
route.get("/all", protectRoute, adminMiddleware, getAllEmployee);

// Admin: Get employees status data
route.get("/status", protectRoute, adminMiddleware, employeeStatus);

// Admin: Get dashboard status data
route.get("/dashbord-status", protectRoute, adminMiddleware, dashboardStatus);

//Admin-only: Update employee details
route.put("/:id", protectRoute, adminMiddleware, updateEmployee);

//Admin-only: Reject/Delete a pending employee
route.delete("/:id", protectRoute, adminMiddleware, rejectEmployee);

//Admin-only: view approved employees list
route.get("/", protectRoute, adminMiddleware, listApprovedEmployees);

// Admin or self: Get specific employee details
route.get("/:id", protectRoute, adminMiddleware, getEmployeeById);

export default route;
