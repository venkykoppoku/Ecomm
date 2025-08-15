import catchAsync from "../middlewares/catchAsync.js";
import User from "../models/user.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/sendToken.js";

//register user /api/v1/register
export const registerUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  sendToken(user, 201, res);
});

//login user
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    return next(new ErrorHandler("Incorrect password", 404));
  }

  sendToken(user, 201, res);
});
