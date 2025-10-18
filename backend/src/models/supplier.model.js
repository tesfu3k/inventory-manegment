import mongoose from "mongoose";

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    address: String,
  },
  { timestaps: true }
);
const supplierModel = mongoose.model("Supplier", supplierSchema);

export { supplierModel };
