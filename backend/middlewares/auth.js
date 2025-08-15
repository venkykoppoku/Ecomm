import user from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsync from "./catchAsync.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req?.cookies;

  if (!token) {
    return next(new ErrorHandler("Login first to access resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  req.user = await user.findById(decoded.id);
  next();
});
