const User = require("../model/user/userSchema")
const Task = require("../model/task/taskSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")



const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        console.log("req.body", email, username, password)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        // console.log("req:",email,password)
        const user = await User.findOne({ email })
        console.log("user", user)
        if (!user) {
            return res.status(400).json({ success: false, message: "User not find" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        // console.log("isMatch",isMatch)
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" })
        }
        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            success: true, message: "Login successful", token,
            user: { _id: user._id,  email: user.email, username: user.username, },
            
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error", error })
    }
}

const logout = async (req, res) => {
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}

const getTasks = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing in token" });
    }
        const tasks = await Task.find({ assignedTo: new mongoose.Types.ObjectId(userId) }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.error("Error in getTasks:", error);
        res.status(500).json({ success: false, message: "Failed to fetch tasks" });
    }
}

const commitTask = async (req, res) => {
    try {
        const { message } = req.body;
        const { taskId } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { commitMessage: message,
                isCommited:true
             },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        res.status(200).json({ success: true, task: updatedTask });

    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to commit task" });
    }
}





module.exports = { registerUser, 
    login, 
    logout, 
    getTasks, 
    commitTask 
}