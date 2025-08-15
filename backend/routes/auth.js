import express from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/authController.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);

export default router;
