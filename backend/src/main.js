import express from "express";
import "dotenv/config";
import authRoute from "./routes/auth.routes.js";
import employeesRoute from "./routes/employee.routes.js";
import inventoryRoute from "./routes/inventory.route.js";
import cookieParser from "cookie-parser";

import { connectDB } from "../src/config/db.config.js";

const app = express();

// Middleware
app.use(express.json()); // will allow to read req.body
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Inventory management API is running",
    timestamp: new Date().toISOString(),
  });
});

//routes
app.use("/api/auth", authRoute);
app.use("/api/employees", employeesRoute);
app.use("/api/inventory", inventoryRoute);

connectDB();
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
