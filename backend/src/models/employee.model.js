import mongoose from "mongoose";
const employeeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    setData: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
    },
    position: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    pendingApproval: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const employeeModel = mongoose.model("Employee", employeeSchema);
