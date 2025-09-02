import { Router } from "express";
const route = new Router();
import {
  currentUser,
  signIn,
  signOut,
  signUP,
} from "../controllers/auth.controllers.js";

route.post("sign-up", signUP);
route.post("sign-in", signIn);
route.get("sign-out", signOut);
route.get("me", currentUser);

export default route;
