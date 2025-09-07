import { supplierModel } from "../models/supplier.model.js";
import { customerModel } from "../models/customer.model.js";
import { productModel } from "../models/product.model.js";
import { purchaseModel } from "../models/purchase.model.js";
import { saleModel } from "../models/sale.model.js";

// Supplier Controller

const addSuppliers = async (req, res) => {
  const { name, contactEmail, phone, address } = req.body;
  if (!name || !contactEmail)
    return res.status(400).json({
      message: "Please enter all required fields",
      success: true,
      data: null,
    });

  try {
    const existingSupplier = await supplierModel.findOne({ contactEmail });
    if (existingSupplier)
      return res.status(409).json({
        message: "This email is already registered",
        success: false,
        data: null,
      });
    const newSupplier = await supplierModel.create({
      name,
      contactEmail,
      phone,
      address,
    });

    res.status(201).json({
      message: "Supplier created sucessfully",
      success: true,
      data: newSupplier,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
  }
};

const listSuppliers = (req, res) => {
  res.json({ message: "listSuppliers" });
};

const getSupplierById = (req, res) => {
  res.json({ message: "getSupplierById" });
};

const updateSupplier = (req, res) => {
  res.json({ message: "updateSupplier" });
};
const deleteSupplier = (req, res) => {
  res.json({ message: "deleteSupplier" });
};

// Customer Controller

const addCustomers = (req, res) => {
  res.json({ message: "addCustomers" });
};

const listCustomers = (req, res) => {
  res.json({ message: "listCustomers" });
};

const getCustomerById = (req, res) => {
  res.json({ message: "getCustomerById" });
};

const updateCustomer = (req, res) => {
  res.json({ message: "updateCustomer" });
};
const deleteCustomer = (req, res) => {
  res.json({ message: "deleteCustomer" });
};

// Product Controller

const addProducts = (req, res) => {
  res.json({ message: "addProducts" });
};

const listProducts = (req, res) => {
  res.json({ message: "listProducts" });
};

const getProductById = (req, res) => {
  res.json({ message: "getProductById" });
};

const updateProduct = (req, res) => {
  res.json({ message: "updateProduct" });
};
const deleteProduct = (req, res) => {
  res.json({ message: "deleteProduct" });
};

// Purchase Controller

const addPurchases = (req, res) => {
  res.json({ message: "addPurchases" });
};

const listPurchases = (req, res) => {
  res.json({ message: "listPurchases" });
};

const getPurchaseById = (req, res) => {
  res.json({ message: "getPurchaseById" });
};

const updatePurchase = (req, res) => {
  res.json({ message: "updatePurchase" });
};
const deletePurchase = (req, res) => {
  res.json({ message: "deletePurchase" });
};

// Sale Controller

const addSales = (req, res) => {
  res.json({ message: "addSales" });
};

const listSales = (req, res) => {
  res.json({ message: "listSales" });
};

const getSaleById = (req, res) => {
  res.json({ message: "getSaleById" });
};

const updateSale = (req, res) => {
  res.json({ message: "updateSale" });
};
const deleteSale = (req, res) => {
  res.json({ message: "deleteSale" });
};

export {
  addSuppliers,
  addCustomers,
  addProducts,
  addPurchases,
  addSales,
  listSuppliers,
  listCustomers,
  listProducts,
  listPurchases,
  listSales,
  getSupplierById,
  getCustomerById,
  getProductById,
  getPurchaseById,
  getSaleById,
  updateSupplier,
  updateCustomer,
  updateProduct,
  updatePurchase,
  updateSale,
  deleteSupplier,
  deleteCustomer,
  deleteProduct,
  deletePurchase,
  deleteSale,
};
