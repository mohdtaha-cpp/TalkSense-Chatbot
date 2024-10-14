import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", schema);