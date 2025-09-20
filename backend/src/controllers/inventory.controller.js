import { supplierModel } from "../models/supplier.model.js";
import { customerModel } from "../models/customer.model.js";
import { productModel } from "../models/product.model.js";
import { purchaseModel } from "../models/purchase.model.js";
import { saleModel } from "../models/sale.model.js";
import mongoose from "mongoose";

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

const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        message: "Invalid purchase ID format.",
        success: false,
        data: null,
      });

    const purchase = await purchaseModel
      .findById(id)
      .populate("productId", "name")
      .populate("supplierId", "name");

    if (!purchase)
      return res
        .status(404)
        .json({ message: "Purchase not found.", success: false, data: null });

    return res.status(200).json({
      message: "Purchase retrieved successfully.",
      success: true,
      data: purchase,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const updatePurchase = async (req, res) => {
  const { id } = req.params;
  const { productId, supplierId, quantity, costPerUnit, purchaseDate, notes } =
    req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        message: "Invalid purchase ID format.",
        success: false,
        data: null,
      });

    const purchase = await purchaseModel.findById(id);
    if (!purchase)
      return res
        .status(404)
        .json({ message: "Purchase not found.", success: false, data: null });

    // update Fields
    const updateFields = {};
    if (notes) return (updateFields.notes = notes);
    if (quantity) {
      if (quantity <= 0)
        return res.status(422).json({
          message: "Quantity must be a positive number.",
          success: false,
          data: null,
        });
      updateFields.quantity = quantity;
    }
    if (costPerUnit) {
      if (costPerUnit < 0)
        return res.status(422).json({
          message: "costPerUnit must be a positive number.",
          success: false,
          data: null,
        });
      updateFields.costPerUnit = costPerUnit;
    }
    if (productId) updateFields.productId = productId;
    if (supplierId) updateFields.supplierId = supplierId;
    if (purchaseDate) updateFields.purchaseDate = purchaseDate;

    //Adjust product stock if quantity has changed
    const oldQuantity = purchase.quantity;
    const newQuantity = updateFields.quantity || oldQuantity;

    const quantityDifference = newQuantity - oldQuantity;
    if (quantityDifference !== 0) {
      const product = await productModel.findById(purchase.productId);
      if (!product)
        return res.status(404).json({
          message: "Associated product not found.",
          success: false,
          data: null,
        });

      product.stockQuantity += quantityDifference;
      await product.save();
    }

    // Recalculate totalCost if necessary
    const newCostPerUnit = updateFields.costPerUnit || purchase.costPerUnit;
    updateFields.totalCost = newCostPerUnit * newQuantity;

    // Update the purchase document

    const updatedPurchase = await purchaseModel.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true, runValidators: true }
    );

    //  handle sucess

    return res.status(200).json({
      message: "Purchase updated successfully.",
      success: true,
      data: updatedPurchase,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};
const deletePurchase = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({
      message: "Invalid purchase ID format.",
      success: false,
      data: null,
    });
  const purchase = await purchaseModel.findByIdAndDelete(id);

  if (!purchase)
    return res.status(404).json({
      message: "Purchase not found.",
      success: false,
      data: null,
    });

  // update product stock
  const product = await productModel.findById(purchase.productId);
  if (product) {
    product.stockQuantity -= purchase.quantity;
    product.save();
  }
  // return success deletion response

  return res.status(200).json({
    message: "purchase deleted succssfully and product stock adjusted",
    success: true,
    data: null,
  });
};

// Sale Controller

const addSales = async (req, res) => {
  const { productId, customerId, quantity, pricePerUnit, saleDate, note } =
    req.body;

  if (!productId || !customerId || !quantity || !pricePerUnit)
    return res.status(400).json({
      message:
        "Missing required fields: productId, customerId, pricePerUnit and quantity.",
      success: false,
      data: null,
    });

  if (quantity <= 0)
    return res.status(400).json({
      message: "Quantity must be greater than zero",
      success: false,
      data: null,
    });

  if (pricePerUnit <= 0)
    return res.status(400).json({
      message: "PricePerUnit must be greater than zero",
      success: false,
      data: null,
    });
  try {
    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ message: "product not found", success: false, data: null });

    const customer = await customerModel.findById(customerId);
    if (!customer)
      return res
        .status(404)
        .json({ message: "customer not found", success: false, data: null });
    if (product.stockQuantity < quantity)
      return res.status(400).json({
        message: "Not enough stock available for this product.",
        success: false,
        data: null,
      });

    // Decrement the stock of the product
    product.stockQuantity -= quantity;
    await product.save();

    const sale = await saleModel.create({
      productId,
      customerId,
      quantity,
      pricePerUnit,
      note,
      saleDate,
    });

    return res.status(201).json({
      message: "Sale created successfully and product stock updated",
      success: true,
      data: sale,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

const listSales = async (req, res) => {
  try {
    const sales = await saleModel
      .find({})
      .populate("productId", "name")
      .populate("CustomerId", "name");

    // Check if any sales were found
    if (!sales || sales.length === 0)
      return res
        .status(200)
        .json({ message: "no sales found", success: true, data: [] });

    return res.status(200).json({
      message: "Sales fached successfully",
      sucess: true,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching sales",
      success: false,
      error: error.message,
    });
  }
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
