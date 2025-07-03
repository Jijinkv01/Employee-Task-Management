const express = require("express")
const app = express()
const connectDB = require("./config/connectDB")
const userRouter = require("./routes/user/userRoutes")
const adminRouter = require("./routes/admin/adminRoutes")
const cors = require("cors")
require("dotenv").config();




app.use(cors())
app.use(express.json())

app.use("/",userRouter)
app.use("/admin",adminRouter)

connectDB()
app.listen(3000,()=>{
    console.log("sever is running..")
})