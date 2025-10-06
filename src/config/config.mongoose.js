const mongoose = require("mongoose");

const {
  MONGODB_URI,
  MONGO_URI,
  MONGOOSE_DEBUG,
} = process.env;

const DEFAULT_URI = MONGODB_URI || MONGO_URI;
const CONNECTION_TIMEOUT_MS = Number(process.env.MONGODB_TIMEOUT_MS || 5000);
const FAMILY = process.env.MONGODB_FAMILY
  ? Number(process.env.MONGODB_FAMILY)
  : 4;

let connectionPromise = null;

function connectMongoose() {
  if (!DEFAULT_URI) {
    throw new Error(
      "Missing MONGODB_URI environment variable. Update .env with a valid connection string."
    );
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  if (MONGOOSE_DEBUG === "true") {
    mongoose.set("debug", true);
  }

  connectionPromise = mongoose
    .connect(DEFAULT_URI, {
      serverSelectionTimeoutMS: CONNECTION_TIMEOUT_MS,
      family: FAMILY,
    })
    .then(() => {
      console.log("✅ Connected to MongoDB");
      return mongoose.connection;
    })
    .catch((error) => {
      connectionPromise = null;
      console.error("❌ Could not connect to MongoDB", error);
      throw error;
    });

  return connectionPromise;
}

module.exports = {
  connectMongoose,
  mongoose,
};
