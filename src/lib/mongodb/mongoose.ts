import mongoose from "mongoose";

let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);
  if (initialized) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "blog-next",
    });
    console.log("Connected to MongoDB");

    initialized = true;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
