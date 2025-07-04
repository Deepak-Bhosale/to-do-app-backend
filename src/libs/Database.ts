import mongoose from "mongoose";
import seedData from "./seedData";

export class Database {
  public static open = async (mongoUrl: string) => {
    try {
      const options = {
        autoIndex: false,
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      };

      await mongoose.connect(mongoUrl, options as any);
      console.log("\n Database connected successfully");

      await seedData();
    } catch (error) {
      console.error(" Failed to connect to MongoDB:", error);
      process.exit(1);
    }
  };

  public static disconnect = async () => {
    try {
      await mongoose.disconnect();
      console.log(" Database disconnected");
    } catch (error) {
      console.error(" Error disconnecting database:", error);
    }
  };
}
