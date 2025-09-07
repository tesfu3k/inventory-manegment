import { Router } from "express";
import { protectRoute } from "../../middlewares/auth.middleware.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";
import {
  approveEmployee,
  getEmployeeById,
  listApprovedEmployees,
  listPendingEmployees,
  registerEmployee,
  rejectEmployee,
} from "../controllers/employee.controller.js";

const route = new Router();

//Public self-registration
route.post("/register", registerEmployee);

//Admin-only: view pending registrations list
route.get("/pending", protectRoute, adminMiddleware, listPendingEmployees);

//Admin-only: Approve a pending employee
route.post("/:id/approve", protectRoute, adminMiddleware, approveEmployee);

//Admin-only: Reject/Delete a pending employee
route.delete("/:id", protectRoute, adminMiddleware, rejectEmployee);

//Admin-only: view approved employees list
route.get("/", protectRoute, adminMiddleware, listApprovedEmployees);

// Admin or self: Get specific employee details
route.get("/:id", protectRoute, adminMiddleware, getEmployeeById);

export default route;
