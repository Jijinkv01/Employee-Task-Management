const mongoose = require("mongoose")


const connectDB = async()=>{
    
    try {
        await mongoose.connect("mongodb+srv://jijinkv:jijin@taskmanagement.i27vrmh.mongodb.net/");
        console.log("MongoDB is connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

module.exports = connectDB