import { Router } from "express";

import { protectRoute } from "../../middlewares/auth.middleware.js";
import adminMiddleware from "../../middlewares/admin.middleware.js";
import {
  addCustomers,
  addProducts,
  addPurchases,
  addSales,
  addSuppliers,
  deleteCustomer,
  deleteProduct,
  deletePurchase,
  deleteSale,
  deleteSupplier,
  getCustomerById,
  getProductById,
  getPurchaseById,
  getSaleById,
  getSupplierById,
  listCustomers,
  listProducts,
  listPurchases,
  listSales,
  listSuppliers,
  updateCustomer,
  updateProduct,
  updatePurchase,
  updateSale,
  updateSupplier,
} from "../controllers/inventory.controller.js";

const route = new Router();

//  ============= Inventery routes=============

// Suppliers routes
route.post("/suppliers", protectRoute, adminMiddleware, addSuppliers);
route.get("/suppliers", protectRoute, adminMiddleware, listSuppliers);
route.get("/supplier/:id", protectRoute, adminMiddleware, getSupplierById); //getSupplierById
route.put("/supplier/:id", protectRoute, adminMiddleware, updateSupplier);
route.delete("/supplier/:id", protectRoute, adminMiddleware, deleteSupplier);

// Customers routes
route.post("/customers", protectRoute, adminMiddleware, addCustomers);
route.get("/customers", protectRoute, adminMiddleware, listCustomers);
route.get("/customer/:id", protectRoute, adminMiddleware, getCustomerById);
route.put("/customer/:id", protectRoute, adminMiddleware, updateCustomer);
route.delete("/customer/:id", protectRoute, adminMiddleware, deleteCustomer);

// Products routes
route.post("/products", protectRoute, adminMiddleware, addProducts);
route.get("/products", protectRoute, adminMiddleware, listProducts);
route.get("/product/:id", protectRoute, adminMiddleware, getProductById);
route.put("/product/:id", protectRoute, adminMiddleware, updateProduct);
route.delete("/product/:id", protectRoute, adminMiddleware, deleteProduct);

// Purchases routes
route.post("/purchases", protectRoute, adminMiddleware, addPurchases);
route.get("/purchases", protectRoute, adminMiddleware, listPurchases);
route.get("/purchase/:id", protectRoute, adminMiddleware, getPurchaseById);
route.put("/purchase/:id", protectRoute, adminMiddleware, updatePurchase);
route.delete("/purchase/:id", protectRoute, adminMiddleware, deletePurchase);

// Sales routes
route.post("/sales", protectRoute, adminMiddleware, addSales);
route.get("/sales", protectRoute, adminMiddleware, listSales);
route.get("sale/:id", protectRoute, adminMiddleware, getSaleById);
route.put("sale/:id", protectRoute, adminMiddleware, updateSale);
route.delete("/sale/:id", protectRoute, adminMiddleware, deleteSale);

export default route;
