import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const Connection = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB database connection established successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default Connection;
