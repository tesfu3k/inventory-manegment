import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    unitPrice: {
      type: Number,
      required: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    lowStockThreshed: { type: Number, default: 10 },
    category: String,
  },
  { timestamps: true }
);

export const productModel = mongoose.model("Product", productSchema);
