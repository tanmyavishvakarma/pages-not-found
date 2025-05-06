import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnect = async () => {
    try {
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL);
        console.log('MongoDB connected successfully');
        return mongoose.connection;
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    };
}

export default mongoConnect; 