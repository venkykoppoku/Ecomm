import catchAsync from "../middlewares/catchAsync.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

// create new order => /api/v1/order/new
export const createNewOrder = catchAsync(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxAmount,
    shippingAmount,
    totalAmount,
    paymentMethod,
    paymentInfo,
    user: req?.user._id,
  });

  res.status(201).json({
    order,
  });
});

//get current user orders => /api/v1/me/orders
export const currentUserOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req?.user._id });

  return res.status(200).json({
    orders,
  });
});

//get order by id => /api/v1/orders/:id
export const getOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id ${req.params.id}`, 404)
    );
  }

  return res.status(200).json({
    order,
  });
});

//get all users orders => /api/v1/admin/orders
export const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find();

  return res.status(200).json({
    orders,
  });
});

// Update Order - ADMIN  =>  /api/v1/admin/orders/:id
export const updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // Update products stock
  order?.orderItems?.forEach(async (item) => {
    const product = await Product.findById(item?.product?.toString());
    if (!product) {
      return next(new ErrorHandler("No Product found with this ID", 404));
    }
    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

//delete order by id => /api/v1/orders/:id
export const deleteOrderById = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with id ${req.params.id}`, 404)
    );
  }
  await order.deleteOne();

  return res.status(200).json({
    success: true,
  });
});
