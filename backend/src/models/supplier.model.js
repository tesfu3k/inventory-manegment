import mongoose from "mongoose";

const supplierSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
    unique: true,
  },
});
