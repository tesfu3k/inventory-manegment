import { Router } from "express";

import { protectRoute } from "../../middlewares/auth.middleware";
import adminMiddleware from "../../middlewares/admin.middleware";

const route = new Router();

//  ============= Inventery routes=============

// Suppliers routes
route.post("/suppliers", protectRoute, adminMiddleware, addSuppliers);
route.get("/suppliers", protectRoute, adminMiddleware, listSuppliers);
route.get("suppliers/:id", protectRoute, adminMiddleware, getSupplierById);
route.put("suppliers/:id", protectRoute, adminMiddleware, updateSupplier);
route.delete("/suppliers/:id", protectRoute, adminMiddleware, deleteSupplier);

// Customers routes
route.post("/customers", protectRoute, adminMiddleware, addCustomers);
route.get("/customers", protectRoute, adminMiddleware, listCustomers);
route.get("customers/:id", protectRoute, adminMiddleware, getCustomerById);
route.put("customers/:id", protectRoute, adminMiddleware, updateCustomer);
route.delete("/customers/:id", protectRoute, adminMiddleware, deleteCustomer);

// Products routes
route.post("/products", protectRoute, adminMiddleware, addProducts);
route.get("/products", protectRoute, adminMiddleware, listProducts);
route.get("products/:id", protectRoute, adminMiddleware, getProductById);
route.put("products/:id", protectRoute, adminMiddleware, updateProduct);
route.delete("/products/:id", protectRoute, adminMiddleware, deleteProduct);

// Purchases routes
route.post("/purchases", protectRoute, adminMiddleware, addPurchases);
route.get("/purchases", protectRoute, adminMiddleware, listPurchases);
route.get("purchases/:id", protectRoute, adminMiddleware, getPurchaseById);
route.put("purchases/:id", protectRoute, adminMiddleware, updatePurchase);
route.delete("/purchases/:id", protectRoute, adminMiddleware, deletePurchase);

// Sales routes
route.post("/sales", protectRoute, adminMiddleware, addSales);
route.get("/sales", protectRoute, adminMiddleware, listSales);
route.get("sales/:id", protectRoute, adminMiddleware, getSaleById);
route.put("sales/:id", protectRoute, adminMiddleware, updateSale);
route.delete("/sales/:id", protectRoute, adminMiddleware, deleteSale);

export default route;
