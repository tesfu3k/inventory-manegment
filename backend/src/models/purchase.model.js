import mongoose, { Schema } from "mongoose";

const purchaseSchema = mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    costPerUnit: { type: Number, required: true },
    totalCost: Number,
    purchaseDate: { type: Date, default: Date.now },
    // employeeId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Employee",
    //   required: true,
    // },
    notes: String,
  },
  { timestamps: true }
);

export const purchaseModel = mongoose.model("Purchase", purchaseSchema);
