import express from "express";
import {
  createProduct,
  getAllProducts,
} from "../controllers/product-controller.js";
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").post(createProduct);

export default router;
