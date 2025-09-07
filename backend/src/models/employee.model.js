import mongoose from "mongoose";
const employeeSchema = mongoose.Schema(
  {
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
    startDate: {
      type: Date,
      required: true,
    },
    department: String,
    position: String,
    phone: String,
    address: String,
    isActive: {
      type: Boolean,
      default: false,
    },
    pendingApproval: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const employeeModel = mongoose.model("Employee", employeeSchema);

export default employeeModel;
