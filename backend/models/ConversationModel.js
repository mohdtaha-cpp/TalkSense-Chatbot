import mongoose from "mongoose";


const schema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    result_text: {
        type: String,
        required: true,
    },
    result_table_path: {
        type: String,
        default: "",
    },
    result_visualization_path: {
        type: String,
        default: "",
    },
    error: {
        type: String,
        default: "",
    }
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.model("Conversation", schema);