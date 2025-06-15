import mongoose from "mongoose";

const DATABASE_URL = process.env.MONGO_URI;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

// Use a plain object for caching instead of global
const mongooseCache = {
  conn: null as mongoose.Mongoose | null,
  promise: null as Promise<mongoose.Mongoose> | null,
};

async function connectDB() {
  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    mongooseCache.promise = (async () => {
      try {
        const connection = await mongoose.connect(DATABASE_URL as string, opts);
        return connection;
      } catch (error) {
        mongooseCache.promise = null; // Reset the promise cache on failure
        throw error;
      }
    })();
  }

  try {
    mongooseCache.conn = await mongooseCache.promise;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to connect to the database: ${error.message}`);
    }
    throw new Error("Failed to connect to the database: An unknown error occurred");
  }

  return mongooseCache.conn;
}

export default connectDB;