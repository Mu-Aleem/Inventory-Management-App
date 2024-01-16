import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  if (password.length < 6) {
    throw new ApiError(400, "password must be up to  6 characters");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({ name, email, password });
  user.password = undefined;

  return res
    .status(201)
    .json(new ApiResponse(200, user, "User registered Successfully"));
});

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found");
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    throw new ApiError(401, "invalid credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  user.__v = undefined;
  return res
    .status(201)
    .json(new ApiResponse(200, { user, token }, "User login Successfully"));
};

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user; // Assuming you have middleware to set req.user after authentication

  return res
    .status(200)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(401, "User Not Found");
  }
  user.password = undefined;
  user.__v = undefined;

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
};

const updateAccountDetails = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(401, "User Not Found");
  }
  const { name, email, phone, photo, bio } = user;
  user.email = email;
  user.name = req.body.name || name;
  user.phone = req.body.phone || phone;
  user.photo = req.body.photo || photo;
  user.bio = req.body.bio || bio;
  const updateuser = await user.save();
  updateuser.password = undefined;
  updateuser.__v = undefined;
  return res
    .status(200)
    .json(new ApiResponse(200, updateuser, "User updated successfully"));
};

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAccountDetails,
};
