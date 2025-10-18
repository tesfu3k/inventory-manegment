import mongoose from "mongoose";
const invitationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export const invitationModel = mongoose.model("Invitation", invitationSchema);
