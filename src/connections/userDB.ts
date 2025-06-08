import mongoose from "mongoose";

const connectUserDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || "");
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error: any) {
        console.log(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};

export default connectUserDB;
