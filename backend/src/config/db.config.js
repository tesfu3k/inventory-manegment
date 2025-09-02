import mongooze from "mongoose";

export const connectDB = async () => {
  try {
    await mongooze.connect(process.env.MONGO_URL);
    console.log("DB connected DB connected successfully");
  } catch (error) {
    console.log("DB is not connected", error);
    process.exit(1);
  }
};
