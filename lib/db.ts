import mongoose from "mongoose"

/**
 * Re-use the Mongoose connection across HMR / serverless
 * invocations to avoid exhausting connection pools.
 */
const globalAny = global as unknown as {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
}

let cached = globalAny.mongoose

if (!cached) {
  cached = globalAny.mongoose = { conn: null, promise: null }
}

/**
 * Get a cached (or new) MongoDB connection.
 * Throws only when the function is executed **and** MONGODB_URI is missing,
 * so your app can still build without the env-var.
 */
export async function connectDB() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error("Missing MONGODB_URI. Add it in Vercel → Project Settings → Environment Variables.")
  }

  // Re-use existing connection
  if (cached.conn) return cached.conn

  // Create a new connection if none exists yet
  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false }).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
