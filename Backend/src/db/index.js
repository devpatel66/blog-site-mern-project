import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try {
        const connectionInts = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Connection Successful || "+connectionInts.connection.host)
    } catch (error) {
        console.log("MongoDB connection error || ",error)
    }
}

export default connectDB;