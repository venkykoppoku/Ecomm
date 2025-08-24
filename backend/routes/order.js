import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import {
  createNewOrder,
  currentUserOrders,
  getAllOrders,
  getOrderById,
  updateOrder,
} from "../controllers/orderController.js";
const router = express.Router();

router.route("/order/new").post(isAuthenticated, createNewOrder);
router.route("/me/orders").get(isAuthenticated, currentUserOrders);
router.route("/orders/:id").get(isAuthenticated, getOrderById);

router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/orders/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrder);

router
  .route("/admin/orders/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), updateOrder);

export default router;
