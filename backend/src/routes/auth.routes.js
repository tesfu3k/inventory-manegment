import { Router } from "express";
const route = new Router();
import {
  currentUser,
  signIn,
  signOut,
  signUp,
} from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

route.post("/sign-up", signUp);
route.post("/sign-in", signIn);
route.post("/sign-out", signOut);
route.get("/me", protectRoute, currentUser);

export default route;
