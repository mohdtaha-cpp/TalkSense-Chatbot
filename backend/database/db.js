import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ChatBot",
    });

    console.log("Successfully Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDb;