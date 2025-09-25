import jwt from "jsonwebtoken";
import userModel from "../../src/models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(401)
        .json({ message: "unauthorized user", success: false, data: null });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id)
      return res
        .status(401)
        .json({ message: "unauthorized user", success: false, data: null });

    const user = await userModel.findById(decoded.id);
    if (!user)
      return res
        .status(401)
        .json({ message: "unauthorized user", success: false, data: null });

    req.userId = user._id;

    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "server internal error", success: false, data: null });
    console.log(error.message);
  }
};
