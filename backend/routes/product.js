import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product-controller.js";
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").post(createProduct);
router.route("/products/:id").get(getProductById);
router.route("/products/:id").put(updateProductById);
router.route("/products/:id").delete(deleteProductById);


export default router;
