import catchAsync from "../middlewares/catchAsync.js";
import User from "../models/user.js";

export const registerUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  const token = user.getJwtToken();
  res.status(201).json({
    token,
  });
});
