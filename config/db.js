import mongoose from 'mongoose'

let cached = global.mongoose

if (!cached) {
  cached = {
    conn: null,
    promise: null
  }
  global.mongoose = cached 
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/kartza`, opts).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
