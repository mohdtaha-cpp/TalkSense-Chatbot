import { Chat } from "../models/ChatModel.js";
import { Conversation } from "../models/ConversationModel.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user.id;

    const chat = await Chat.create({
      user: userId,
    });

    return res.json(chat);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.json(chats);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat for this User",
      });
    const conversation = await Conversation.create({
      user: req.user.id,
      chat: chat._id,
      question: req.body.question,
      summary: req.body.answer,
      result_text: req.body.answer,
      result_table_path: req.body.table,
      result_visualization_path: req.body.chart,
      error: req.body.error      
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.question },
      { new: true }
    );

    res.json({
      conversation,
      updatedChat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id });

    if (!conversation)
      return res.status(404).json({
        message: "No conversation in this chat",
      });

    res.json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat)
      return res.status(404).json({
        message: "No chat to delete",
      });

    if (chat.user.toString() !== req.user._id.toString())
      return res.status(403).json({
        message: "Unauthorized",
      });

    await chat.deleteOne();

    res.json({
      message: "Chat Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};