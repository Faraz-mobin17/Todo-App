import mongoose, { Schema } from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required for registration"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: [true, "full name required"],
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: [true, "avatar required"],
    },
    password: {
      type: String,
      required: [true, "password reqiured"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
