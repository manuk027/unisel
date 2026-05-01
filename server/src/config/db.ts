import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error("Mongo URI is not defined.");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connected.");
}