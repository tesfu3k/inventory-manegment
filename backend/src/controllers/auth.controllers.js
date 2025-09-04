import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  // 1. Validate the input data
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please enter all required fields",
      success: false,
      data: null,
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters long",
      success: false,
      data: null,
    });
  }

  try {
    // 2. Check if the email already exists
    const existedUser = await userModel.findOne({ email: email });
    if (existedUser) {
      return res.status(400).json({
        message: "This email is already registered",
        success: false,
        data: null,
      });
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Save the user to the database
    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    // 5. Send the success response
    // Destructure the user object to remove the password before sending the response
    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    // Handle any other errors (e.g., database connection issues)
    res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "please enter all requred field" });
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "Weak password", success: false, data: null });

  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "incorrect email or password" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword)
      return res.status(400).json({ message: "incorrect email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie(token, "token", {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, //15d in millisecond
      secure: process.env.STATUS === "production" ? true : false,
    });

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      message: "sign in successfully",
      success: true,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "something went wwrong", success: false, data: null });
    console.log(error.message);
  }
};

const signOut = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "sign out successfully", success: true, data: null });
};

const currentUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await userModel.findByOne(userId);
    const { password: _, ...userWithoutPassword } = user._doc;
    res.status(200).json({
      message: "user retrived successfully",
      success: true,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", success: false, data: null });
    console.log(error.message);
  }
};

export { signIn, signOut, signUp, currentUser };
