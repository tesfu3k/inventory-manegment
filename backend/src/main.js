import express from "express";
import "dotenv/config";
import authRoute from "./route/auth.route.js";

import { connectDB } from "../src/config/db.config.js";

const app = express();

app.use(express.json()); // will allow to red req.body

const port = process.env.PORT || 3000;

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("api/auth", authRoute);

connectDB();
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
