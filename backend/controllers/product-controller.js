import catchAsync from "../middlewares/catchAsync.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

// get all products /api/v1/products
export const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({ products });
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
