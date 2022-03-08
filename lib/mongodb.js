import mongoose from 'mongoose'
require('dotenv/config')

const MONGO_URI = process.env.MONGODB_URI

const connectDB = handler => async (req, res) => {
    try {
        if (mongoose.connections[0].readyState) {
            return handler(req, res)
        }
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log('MongoDB connected')
        return handler(req, res)
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
}

export default connectDB

