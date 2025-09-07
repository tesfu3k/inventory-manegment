import mongoose, { Schema } from "mongoose";

const saleSchema = mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    totalPrice: Number,
    saleDate: { type: Date, default: Date.now },
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    notes: String,
  },
  { timestamps: true }
);

export const saleModel = mongoose.model("Sale", saleSchema);
