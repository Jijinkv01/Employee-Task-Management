const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {
        type: "String",
        unique: true,
        required: true
    },
    username: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
},{timestamps:true})

const User = mongoose.model("user",userSchema)

module.exports = User