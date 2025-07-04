import mongoose from "mongoose";
import seedData from "./seedData";

// Disable mongoose buffering globally
mongoose.set("bufferCommands", false);

export class Database {
  public static open = async (mongoUrl: string, retries: number = 5) => {
    if (!mongoUrl) {
      throw new Error("MongoDB URL is required");
    }

    console.log("🔄 Attempting to connect to MongoDB...");

    const options = {
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 60000,
      maxPoolSize: 10,
      retryWrites: true,
      w: "majority",
      autoIndex: process.env.NODE_ENV !== "production",
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🔄 Connection attempt ${attempt}/${retries}`);
        await mongoose.connect(mongoUrl, options);
        console.log("✅ Database connected successfully");

        if (process.env.NODE_ENV !== "production") {
          await seedData();
        }
        return;
      } catch (error) {
        console.error(`❌ Connection attempt ${attempt} failed:`, error.message);

        if (attempt === retries) {
          throw error;
        }

        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  public static disconnect = async () => {
    try {
      await mongoose.disconnect();
      console.log("✅ Database disconnected successfully");
    } catch (error) {
      console.error("❌ Error disconnecting database:", error);
      throw error;
    }
  };
}
