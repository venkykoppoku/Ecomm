import express from "express";
import {
  forgotPassword,
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/authController.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);

router.route("/password/forgot").post(forgotPassword);

export default router;
