import catchAsync from "../middlewares/catchAsync.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

// get all products /api/v1/products
export const getAllProducts = catchAsync(async (req, res) => {
  const {
    search = "",
    category = "",
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
    pageSize = 4,
    pageIndex = 1,
  } = req.query;

  const min = Math.max(0, parseFloat(minPrice) || 0);
  const max = Math.max(min, parseFloat(maxPrice) || Number.MAX_SAFE_INTEGER);
  const page = Math.max(1, parseInt(pageIndex, 10) || 1);
  const limit = Math.max(1, parseInt(pageSize, 10) || 1);
  console.log(limit);

  //mongodb filter
  const filter = {};
  if (search.trim()) {
    filter.name = { $regex: search.trim(), $options: "i" };
  }

  if (category.trim()) {
    const categories = category
      .split(",")
      .map((cat) => cat.trim())
      .filter(Boolean);
    if (categories.length > 0) {
      filter.category = { $in: categories };
    }
  }

  if (min || max) {
    filter.price = { $gte: min, $lte: max };
  }

  //count total products
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
  return res.status(200).json({ total, products });
});

// create the product /api/v1/admin/products
export const createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body.product);
  return res.status(200).json({ product });
});

// get product by product id /api/v1/products/:id
export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    // return res
    //   .status(404)
    //   .json({ message: `product not found with id ${req?.params?.id}` });

    return next(
      new ErrorHandler(`product not found with id ${req?.params?.id}`, 404)
    );
  }

  return res.status(200).json({ product });
});

// update product by product id /api/v1/products/:id
export const updateProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(
      new ErrorHandler(`product not found with id ${req?.params?.id}`, 404)
    );
  }

  const newProduct = await Product.findByIdAndUpdate(
    req?.params?.id,
    req.body,
    {
      new: true,
    }
  );

  return res.status(200).json({ product: newProduct });
});

// delete product by product id /api/v1/products/:id
export const deleteProductById = catchAsync(async (req, res) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(
      new ErrorHandler(`product not found with id ${req?.params?.id}`, 404)
    );
  }

  await product.deleteOne();

  return res
    .status(200)
    .json({ message: `Product with id ${req?.params?.id} deleted` });
});
