import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Atlas connected");
    } catch (error) {
        console.error("DB Connection Error: ", error.message);
        console.error("Stack Trace: ", error.stack);
    }
}

export default dbConnection

