import mongoose from "mongoose";
import seedData from "./seedData";

// Disable mongoose buffering globally to prevent timeout issues
mongoose.set("bufferCommands", false);
mongoose.set("bufferMaxEntries", 0);

export class Database {
  public static open = async (mongoUrl: string, retries: number = 5) => {
    if (!mongoUrl) {
      throw new Error("MongoDB URL is required");
    }

    console.log("🔄 Attempting to connect to MongoDB...");

    const options = {
      // Timeout settings - increased for Railway deployment
      serverSelectionTimeoutMS: 60000, // 60 seconds
      socketTimeoutMS: 60000, // 60 seconds
      connectTimeoutMS: 60000, // 60 seconds

      // Disable buffering to prevent timeout issues
      bufferMaxEntries: 0,
      bufferCommands: false,

      // Connection pool settings
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 30000,

      // Heartbeat settings
      heartbeatFrequencyMS: 10000,

      // Retry settings
      retryWrites: true,
      retryReads: true,

      // Write concern
      w: "majority",

      // Auto index creation (disable for production)
      autoIndex: process.env.NODE_ENV !== "production",
      autoCreate: process.env.NODE_ENV !== "production",

      // Additional options for better compatibility
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Retry logic for connection
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🔄 Connection attempt ${attempt}/${retries}`);

        await mongoose.connect(mongoUrl, options as any);

        console.log("✅ Database connected successfully");

        // Setup connection event listeners
        Database.setupConnectionEventListeners();

        // Only seed data in development or if explicitly requested
        if (process.env.NODE_ENV !== "production" || process.env.SEED_DATA === "true") {
          console.log("🌱 Seeding data...");
          await seedData();
          console.log("✅ Data seeding completed");
        }

        return; // Success, exit retry loop
      } catch (error) {
        console.error(`❌ Connection attempt ${attempt} failed:`, error.message);

        if (attempt === retries) {
          console.error("❌ All connection attempts failed");
          throw error;
        }

        // Wait before retrying (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  private static setupConnectionEventListeners = () => {
    // Connection successful
    mongoose.connection.on("connected", () => {
      console.log("✅ Mongoose connected to MongoDB");
    });

    // Connection error
    mongoose.connection.on("error", (error) => {
      console.error("❌ MongoDB connection error:", error);
    });

    // Connection disconnected
    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB disconnected");
    });

    // Connection reconnected
    mongoose.connection.on("reconnected", () => {
      console.log("✅ MongoDB reconnected");
    });

    // Connection close
    mongoose.connection.on("close", () => {
      console.log("🔒 MongoDB connection closed");
    });

    // Handle connection state changes
    mongoose.connection.on("fullsetup", () => {
      console.log("✅ MongoDB replica set connected");
    });

    mongoose.connection.on("all", () => {
      console.log("✅ MongoDB replica set all connections established");
    });
  };

  public static disconnect = async () => {
    try {
      console.log("🔄 Disconnecting from database...");
      await mongoose.disconnect();
      console.log("✅ Database disconnected successfully");
    } catch (error) {
      console.error("❌ Error disconnecting database:", error);
      throw error;
    }
  };

  // Helper method to check connection status
  public static isConnected = (): boolean => {
    return mongoose.connection.readyState === 1;
  };

  // Helper method to get connection info
  public static getConnectionInfo = () => {
    return {
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
      states: {
        0: "disconnected",
        1: "connected",
        2: "connecting",
        3: "disconnecting",
        99: "uninitialized",
      },
    };
  };

  // Graceful shutdown method
  public static gracefulShutdown = async (signal: string) => {
    console.log(`\n${signal} received. Closing MongoDB connection...`);

    try {
      await Database.disconnect();
      console.log("✅ MongoDB connection closed gracefully");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error during graceful shutdown:", error);
      process.exit(1);
    }
  };
}

// Export connection utility functions
export const connectWithRetry = async (mongoUrl: string, maxRetries: number = 5) => {
  return Database.open(mongoUrl, maxRetries);
};

export const getConnectionStatus = () => {
  return Database.getConnectionInfo();
};

export const isDbConnected = () => {
  return Database.isConnected();
};
