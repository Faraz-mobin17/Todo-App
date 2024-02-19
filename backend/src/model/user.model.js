import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { envVars } from "../../config/serverConfig";
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
/*
 * save hone se pehele agr password modified nhi hai to next middleware ko call krdo
 * else hash krdo password ko and database me store krdo phir
 */
userSchema.pre("save", async function (next) {
  if (!this.isModified(this.password)) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
/*
 * check kro ki current password and jo password hamne bheja hai
 * wo same hai ki nhi
 */
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    envVars.ACCESS_TOKEN_SECRET,
    {
      expiresIn: envVars.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    envVars.REFRESH_TOKEN_SECRET,
    {
      expiresIn: envVars.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
