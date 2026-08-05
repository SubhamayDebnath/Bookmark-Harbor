import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseCache ?? {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

const connectDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI!, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log(`MongoDB Connected: ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('Failed to connect database:', error);
    throw error;
  }
};

export default connectDatabase;
