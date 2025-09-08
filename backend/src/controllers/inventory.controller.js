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
    console.log(error.message);
  }
};

const listSuppliers = async (req, res) => {
  try {
    const suppliers = await supplierModel.find({});
    res.status(200).json({
      message: "Suppliers list retrived successfuly",
      success: true,
      data: suppliers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const getSupplierById = async (req, res) => {
  const supplierId = req.params.id;
  if (!supplierId) {
    return res.status(400).json({
      success: false,
      message: "Supplier ID is required",
    });
  }

  try {
    const supplier = await supplierModel.findById(supplierId);

    if (!supplier)
      return res
        .status(404)
        .json({ message: "Supplier is not found", success: false, data: null });
    res.status(200).json({
      message: "supplier retrived successfuly",
      success: true,
      data: supplier,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const updateSupplier = async (req, res) => {
  const { name, contactEmail, phone, address } = req.body;

  if (!name && !contactEmail && !phone && !address)
    return res.status(400).json({
      message: "At least one feild required tobe update",
      success: false,
      data: null,
    });

  const supplierId = req.params.id;
  if (!supplierId)
    return res.status(400).json({
      success: false,
      message: "Supplier ID is required",
    });

  try {
    const supplier = await supplierModel.findById(supplierId);
    if (!supplier)
      return res
        .status(404)
        .json({ message: "supplier is not found", success: false, data: null });

    const updatedSupplier = await supplierModel.findByIdAndUpdate(
      supplierId,
      {
        name,
        contactEmail,
        phone,
        address,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Supplier updated successfully",
      success: true,
      data: updatedSupplier,
    });

    res.status(201);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const deleteSupplier = async (req, res) => {
  const supplierId = req.params.id;
  if (!supplierId)
    return res.status(400).json({
      success: false,
      message: "Supplier ID is required",
    });
  try {
    await supplierModel.findByIdAndDelete(supplierId);
    res.status(200).json({
      message: "supplier deleted successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

// Customer Controller

const addCustomers = async (req, res) => {
  const { name, contactEmail, phone, address } = req.body;
  if (!contactEmail || !name)
    return res.status(400).json({
      message: "Please enter all required fields",
      success: true,
      data: null,
    });

  try {
    const existingCustomer = await customerModel.findOne({ contactEmail });

    if (existingCustomer)
      return res.status(409).json({
        message: "This email is already registered",
        success: false,
        data: null,
      });

    const newCustomer = await customerModel.create({
      name,
      contactEmail,
      phone,
      address,
    });
    res.status(201).json({
      message: "new customer registered successfully",
      success: true,
      data: newCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const listCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find({});

    res.status(200).json({
      message: "Customers list retrived successfuly",
      success: true,
      data: customers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
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
