const express = require("express")
const app = express()
const connectDB = require("./config/connectDB")
const userRouter = require("./routes/user/userRoutes")
const adminRouter = require("./routes/admin/adminRoutes")
const cors = require("cors")
require("dotenv").config();



const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: process.env.CLIENT_URL, 
  credentials: true,              
};

app.use(cors(corsOptions))
app.use(express.json())

app.use("/",userRouter)
app.use("/admin",adminRouter)

connectDB()
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})