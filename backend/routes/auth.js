import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getProfileInfo,
  getUserById,
  loginUser,
  logOutUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateUser,
  uploadAvatar,
} from "../controllers/authController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);

router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getProfileInfo);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/me/upload_avatar").put(isAuthenticated, uploadAvatar);

router.route("/password/update").put(isAuthenticated, updatePassword);

router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getUserById);

router
  .route("/admin/user/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateUser);

router
  .route("/admin/user/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;
