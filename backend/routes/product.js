import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product-controller.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router.route("/products/:id").get(getProductById);
router
  .route("admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProductById);
router
  .route("admin/products/:id")
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProductById);

export default router;
