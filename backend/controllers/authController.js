import catchAsync from "../middlewares/catchAsync.js";
import User from "../models/user.js";

export const registerUser = catchAsync(async (req, res) => {
  await User.create(req.body);
  res.status(201).json({
    success: true,
  });
});
