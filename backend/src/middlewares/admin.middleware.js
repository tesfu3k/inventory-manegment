import jwt from "jsonwebtoken";
//import userModel from "../src/models/user.model.js";
import userModel from "../../src/models/user.model.js";

const adminMiddleware = async (req, res, next) => {
  try {
    // req.userId should already be set by protectRoute middleware
    const user = await userModel.findById(req.userId);

    if (!user)
      return res
        .status(404)
        .json({ Message: "user not found", success: false, data: null });

    if (user.role !== "admin")
      return res
        .status(403)
        .json({ message: "Admin access required", success: false, data: null });

    //If user is admin, allow request to continue
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server internal error", success: false, data: null });
    console.log(error.message);
  }
};

export default adminMiddleware;
