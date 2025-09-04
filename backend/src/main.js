import express from "express";
import "dotenv/config";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

import { connectDB } from "../src/config/db.config.js";

const app = express();

app.use(express.json()); // will allow to read req.body

const port = process.env.PORT || 3000;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Inventory management API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(cookieParser());

app.use("/api/auth", authRoute);

connectDB();
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
