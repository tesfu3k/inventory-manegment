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

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      success: false,
      message: "Customer ID is required",
    });
  try {
    const customer = await customerModel.findById(id);
    if (!customer)
      return res.status(404).json({
        message: "coustmer is not found",
        success: false,
        data: null,
      });

    res.status(202).json({
      message: "customer retrived successfully, ",
      success: true,
      data: customer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const updateCustomer = async (req, res) => {
  const { name, contactEmail, phone, address } = req.body;
  if (!name && !contactEmail && !phone && !address)
    return res.status(400).json({
      message:
        "at least one customer information  required that must be updated ",
      success: false,
      data: null,
    });

  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      success: false,
      message: "Customer ID is required",
    });
  try {
    const customer = await customerModel.findById(id);
    if (!customer)
      return res.status(404).json({
        message: "coustmer is not found",
        success: false,
        data: null,
      });

    const updatedCustomer = await customerModel.findByIdAndUpdate(
      id,
      { name, contactEmail, phone, address },
      { new: true }
    );
    res.status(200).json({
      message: "customer information updated successfully",
      success: true,
      data: updatedCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      success: false,
      message: "Customer ID is required",
    });

  await customerModel.findByIdAndDelete(id);
  res.status(200).json({
    message: "customer deleted successfully",
    success: true,
    data: null,
  });
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

// Product Controller
const addProducts = async (req, res) => {
  const {
    name,
    unitPrice,
    description,
    stockQuantity,
    lowStockThreshed,
    catagory,
  } = req.body;

  try {
    const productExist = await productModel.findOne({ name });

    if (productExist)
      return res.status(409).json({
        message: "the product already exist",
        success: false,
        data: null,
      });

    if (unitPrice <= 0)
      return res.status(400).json({
        message: "unit price must greater than zero",
        success: false,
        data: null,
      });

    const product = await productModel.create({
      name,
      description,
      unitPrice,
      catagory,
      lowStockThreshed: lowStockThreshed || 10,
      stockQuantity: stockQuantity || 0,
    });

    res.status(201).json({
      message: "product added successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      message: "products are successfully retrived ",
      success: true,
      data: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({
      success: false,
      message: "valid product ID is required",
    });

  try {
    const product = await productModel.findById(id);
    if (!product)
      return res.status(404).json({
        message: "product is not found",
        success: true,
        data: null,
      });
    res.status(200).json({
      message: "product retrived successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, unitPrice, description, lowStockThreshed, catagory } = req.body;

  if (!name && !unitPrice && !description && !lowStockThreshed && !catagory)
    return res.status(400).json({
      message: "At least one product property is required to update",
      success: false,
      data: null,
    });

  try {
    const product = await productModel.findById(id);

    if (!product)
      return res
        .status(404)
        .json({ message: "product not found", success: false, data: null });

    //Update only provided fields (not stockQuantity)
    if (name) product.name = name;
    if (unitPrice) product.unitPrice = unitPrice;
    if (description) product.description = description;
    if (lowStockThreshed) product.lowStockThreshed = lowStockThreshed;
    if (catagory) product.catagory = catagory;

    // Save changes
    const updatedProduct = await product.save();

    // const updatedProduct = await productModel.findByIdAndUpdate(
    //   id,
    //   { name, unitPrice, description, lowStockThreshed, catagory },
    //   { new: true }
    // );

    res.status(200).json({
      message: "product updated successfully",
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ message: "product not found", success: false, data: null });

    if (product.stockQuantity > 0)
      return res.status(400).json({
        message:
          "Cannot delete product with stock available. Reduce stock to 0 first",
        success: false,
        data: null,
      });

    await productModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "product deleted successfully",
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

const getLowStockProducts = async (req, res) => {
  try {
    // Compare stockQuantity with lowStockThreshed using $expr
    const lowStockProducts = await productModel.find({
      $expr: { $lt: ["$stockQuantity", "$lowStockThreshed"] },
    });

    return res.status(200).json({
      success: true,
      message: "Low stock products fetched successfully",
      data: lowStockProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

// Purchase Controller

const addPurchases = async (req, res) => {
  const { productId, supplierId, quantity, costPerUnit, purchaseDate, notes } =
    req.body;

  if (!productId || !supplierId || !quantity || !costPerUnit)
    return res.status(400).json({
      message:
        "Missing required fields: productId, supplierId, costPerUnit and quantity.",
      success: false,
      data: null,
    });
  if (quantity <= 0)
    return res.status(422).json({
      message: "Quantity must be a positive number",
      success: false,
      data: null,
    });

  try {
    const product = await productModel.findById(productId);

    if (!product)
      return res
        .status(422)
        .json({ message: "Product not found", success: false, data: null });

    const supplierExist = await supplierModel.findById(supplierId);

    if (!supplierExist)
      return res
        .status(422)
        .json({ message: "Supplier not found", success: false, data: null });

    const totalCost = quantity * costPerUnit;

    const newPurchase = await purchaseModel.create({
      productId,
      supplierId,
      quantity,
      costPerUnit,
      totalCost, // Include totalCost here,
      purchaseDate,
      notes,
    });

    //Update product stock here in controller
    product.stockQuantity += quantity;

    //Handle success ---

    return res.status(201).json({
      message: "Purchase created successfully",
      success: true,
      data: newPurchase,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const listPurchases = async (req, res) => {
  try {
    const purchases = await purchaseModel
      .find({})
      .populate("productId", "name")
      .populate("supplierId", "name");

    // Check if any purchases were found
    if (!purchases || purchases.length === 0)
      return res.status(200).json({
        message: "No purchases found.",
        success: true,
        data: [],
      });

    return res.status(200).json({
      message: "Purchases retrieved successfully.",
      success: true,
      data: purchases,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
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
  getLowStockProducts,
};
