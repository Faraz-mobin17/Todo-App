import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    todo: {
      type: String,
      required: [true, "Todo required you can't create empty todo"],
    },
    checked: {
      type: Boolean,
      default: false,
    },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    fullname: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    avatar: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
