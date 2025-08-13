import Product from "../models/product.js";

// get all products /api/v1/products
export const getAllProducts = async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({ products });
};

// create the product /api/v1/admin/products
export const createProduct = async (req, res) => {
  console.log();
  const product = await Product.create(req.body.product);
  return res.status(200).json({ product });
};
