import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    // check for the user
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(error, "Something went wrong while generating tokens ");
  }
};
const checkAvatar = (avatarLocalPath) => {
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Needed");
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;
  if (
    [username, email, password, fullname].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }
  // chcek if user already exists
  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (userExists) {
    throw new ApiError(409, "User with email or username already exists");
  }
  // Check for avatar
  const avatarLocalPath = files?.avatar[0]?.path;
  // const coverImageLocalPath = files?.coverImage[0]?.path;
  let coverImageLocalPath;
  if (files && Array.isArray(files.coverImage) && files.coverImage.length > 0) {
    coverImageLocalPath = files.coverImage[0].path;
  }
  checkAvatar(avatarLocalPath);

  // Upload avatar and cover image to Cloudinary in parallel
  const [avatar, coverImage] = await Promise.all([
    uploadOnCloudinary(avatarLocalPath),
    uploadOnCloudinary(coverImageLocalPath),
  ]);

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  // Remove password from refresh token field
  const createdUser = await User.findById(user._id)
    .lean()
    .select("-password -refreshToken");

  // Check for user creation
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering a user");
  }

  // If created, return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  // take the details
  const { username, email, password } = req.body;
  if (!username && !email) {
    throw new ApiError(400, "Username or email required");
  }
  // check if users exists
  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  });
  // if not exists throw an error
  if (!userExists) {
    throw new ApiError(400, "User not exists");
  }
  // check if the password is correct
  const isPasswordValid = await userExists.isPasswordCorrect(password);
  // if not throw the error
  if (!isPasswordValid) {
    throw new ApiError(400, "User password not correct");
  }
  // else generate refresh and access token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userExists._id
  );
  // login user and send cookies
  const loggedInUser = await User.findById(userExists._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser, loginUser, logoutUser };
