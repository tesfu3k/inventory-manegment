import { Router } from "express";

import { protectRoute } from "../../middlewares/auth.middleware";
import adminMiddleware from "../../middlewares/admin.middleware";

const route = new Router();

// Inventery routes

// Suppliers
route.post("/suppliers", protectRoute, adminMiddleware, addSuppliers);
route.get("/suppliers", protectRoute, adminMiddleware, listSuppliers);
route.get("suppliers/:id", protectRoute, adminMiddleware, getSupplierById);
route.put("suppliers/:id", protectRoute, adminMiddleware, updateSupplier);
route.delete("/suppliers/:id", protectRoute, adminMiddleware, deleteSupplier);
