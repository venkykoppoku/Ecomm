import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js";

const seedProducts = async () => {
  let DB_URI = "mongodb://localhost:27017/ecomm";

  try {
    await mongoose.connect(DB_URI);
    await Product.deleteMany();
    console.log("All existing products deleted");

    await Product.insertMany(products);
    console.log("Seed products inserted");
  } catch (error) {
    console.log(error?.message);
  }
};

seedProducts();
