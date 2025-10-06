const mongoose = require("mongoose");

const {
  MONGODB_URI,
  MONGO_URI,
  MONGOOSE_DEBUG,
} = process.env;

const FALLBACK_URI = buildUriFromFragments();
const DEFAULT_URI = MONGODB_URI || MONGO_URI || FALLBACK_URI;
const CONNECTION_TIMEOUT_MS = Number(process.env.MONGODB_TIMEOUT_MS || 5000);
const FAMILY = process.env.MONGODB_FAMILY
  ? Number(process.env.MONGODB_FAMILY)
  : 4;

let connectionPromise = null;

function buildUriFromFragments() {
  const protocol = normalizeProtocol(
    process.env.MONGODB_PROTOCOL || process.env.MONGO_PROTOCOL
  );
  const host = process.env.MONGODB_HOST || process.env.MONGO_HOST;
  const port = process.env.MONGODB_PORT || process.env.MONGO_PORT;
  const database =
    process.env.MONGODB_DATABASE ||
    process.env.MONGODB_DB ||
    process.env.MONGO_DATABASE ||
    process.env.MONGO_DB;

  if (!host || !database) {
    return null;
  }

  const username =
    process.env.MONGODB_USERNAME ||
    process.env.MONGO_USERNAME ||
    process.env.MONGO_USER;
  const password =
    process.env.MONGODB_PASSWORD ||
    process.env.MONGO_PASSWORD ||
    process.env.MONGO_PASS;

  const query = buildQueryString();

  const credentials =
    username !== undefined && username !== ""
      ? `${encodeURIComponent(username)}:${encodeURIComponent(password || "")}`
      : null;

  const authority = credentials
    ? `${credentials}@${host}${port ? `:${port}` : ""}`
    : `${host}${port ? `:${port}` : ""}`;

  return `${protocol}://${authority}/${database}${query}`;
}

function normalizeProtocol(rawProtocol) {
  if (!rawProtocol) {
    return "mongodb";
  }

  const protocol = String(rawProtocol).trim().toLowerCase().replace(/:$/, "");
  if (!protocol) {
    return "mongodb";
  }

  return protocol;
}

function buildQueryString() {
  const parts = [];

  const rawOptions = process.env.MONGODB_OPTIONS || process.env.MONGO_OPTIONS;
  if (rawOptions) {
    const normalized = String(rawOptions).replace(/^\?/, "");
    if (normalized) {
      normalized
        .split("&")
        .map((value) => value.trim())
        .filter(Boolean)
        .forEach((value) => parts.push(value));
    }
  }

  const authSource =
    process.env.MONGODB_AUTH_SOURCE || process.env.MONGO_AUTH_SOURCE;
  if (authSource) {
    parts.push(`authSource=${encodeURIComponent(authSource)}`);
  }

  if (!parts.length) {
    return "";
  }

  return `?${parts.join("&")}`;
}

function sanitizeConnectionString(uri) {
  if (!uri) return uri;

  try {
    const parsed = new URL(uri);
    if (parsed.username || parsed.password) {
      parsed.username = parsed.username ? "***" : "";
      parsed.password = parsed.password ? "***" : "";
      return parsed.toString();
    }
    return uri;
  } catch (_error) {
    return uri;
  }
}

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

  const maskedUri = sanitizeConnectionString(DEFAULT_URI);
  console.log(`🔌 Connecting to MongoDB using ${maskedUri}`);

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
