import catchAsync from "../middlewares/catchAsync.js";
import User from "../models/user.js";
import { uploadFile } from "../utils/cloudinary.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";

//register user /api/v1/register
export const registerUser = catchAsync(async (req, res) => {
  const user = await User.create(req.body);
  sendToken(user, 201, res);
});

//login user /api/v1/login
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email or password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(`User not found with  email ${email} `, 404));
  }
  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    return next(new ErrorHandler("Incorrect password", 404));
  }

  sendToken(user, 201, res);
});

//logout user /api/v1/logout
export const logOutUser = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logged out",
  });
});

//upload avatar => /api/v1/me/uploade_avatar
export const uploadAvatar = catchAsync(async (req, res, next) => {
  const avatarRes = await uploadFile(req.body.avatar, "/Home/e-comm/avatars");
  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarRes,
  });

  res.status(200).json({
    user,
  });
});

//forgotPassword /api.v1/password/forgot
export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save();

  //create reset password url
  const resetUrl = `${process.env.FRONT_END_URL}/api/v1/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user.email, resetUrl);

  try {
    await sendEmail({
      to: user.email,
      subject: "Ecomm password recovery",
      message: message,
    });

    res.status(200).json({
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error?.message, 500));
  }
});

//reset password /api/v1/password/reset/:token8
export const resetPassword = catchAsync(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  // Set the new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//user profile /api/v1/me
export const getProfileInfo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json({ user });
});

//update password /api/v1/password/update
export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");

  const isPasswordsMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordsMatched) {
    return next(new ErrorHandler("Old password not matched", 400));
  }

  user.password = req.body.password;
  user.save();

  res.status(200).json({
    success: true,
  });
});

//update user profile /api/v1/me/update
export const updateProfile = catchAsync(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,
    name: req.body.name,
  };

  const user = await User.findByIdAndUpdate(req?.user?._id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

//get all users /api/v1/admin/users
export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

//get user by id  /api/v1/admin/user/:id
export const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req?.params?.id);

  if (!user) {
    return next(
      new ErrorHandler(`user not found with id ${req?.params?.id}`, 404)
    );
  }

  res.status(200).json({
    user,
  });
});

// Update User Details - ADMIN  =>  /api/v1/admin/users/:id
export const updateUser = catchAsync(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

// Delete User - ADMIN  =>  /api/v1/admin/users/:id
export const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  // TODO - Remove user avatar from cloudinary

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});
