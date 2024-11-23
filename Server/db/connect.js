import { mongoose } from 'mongoose';

// Function to connect to the database
export const connectDB = (url) => {
  return mongoose.connect(url); // Connect to MongoDB using the provided URL
};
