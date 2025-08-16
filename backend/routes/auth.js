import express from "express";
import {
  forgotPassword,
  getProfileInfo,
  loginUser,
  logOutUser,
  registerUser,
  resetPassword,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getProfileInfo);

export default router;
