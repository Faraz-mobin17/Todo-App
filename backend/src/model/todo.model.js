// import mongoose, { Schema } from "mongoose";

// const todoSchema = new Schema(
//   {
//     todo: {
//       type: String,
//       required: [true, "Todo required you can't create empty todo"],
//     },
//     checked: {
//       type: Boolean,
//       default: false,
//     },
//     username: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     email: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     fullname: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//     avatar: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// export const Todo = mongoose.model("Todo", todoSchema);

import mongoose, { Schema, Types } from "mongoose";

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: [true, "Todo required you can't create empty todo"],
      // Add validation if needed
      validate: {
        validator: (v) => v.length >= 3,
        message: "Todo must be atleast 3 characters long",
      },
    },
    checked: {
      type: Boolean,
      default: false,
    },
    // Remove these fields and use the `User` model's `_id` instead
    // username: { type: Types.ObjectId, ref: "User" },
    // email: { type: Types.ObjectId, ref: "User" },
    // fullname: { type: Types.ObjectId, ref: "User" },
    // avatar: { type: Types.ObjectId, ref: "User" },
    user: { type: Types.ObjectId, ref: "User" }, // Use this single field instead
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
