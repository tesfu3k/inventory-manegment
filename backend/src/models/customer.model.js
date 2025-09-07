import mongoose from "mongoose";

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactEmail: { type: String, required: true, unique: true },
    phone: string,
    address: String,
  },
  { timestamps: true }
);

const customerModel = mongoose.model("Customer", customerSchema);

export { customerModel };
