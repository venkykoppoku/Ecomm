import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product-controller.js";
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").post(createProduct);
router.route("/products/:id").get(getProductById);

export default router;
