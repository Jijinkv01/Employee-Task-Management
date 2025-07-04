const Admin = require("../model/admin/adminSchema")
const Task = require("../model/task/taskSchema")
const User = require("../model/user/userSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const login = async(req,res)=>{
    try {
        const {username, password} = req.body
        const admin = await Admin.findOne({username})
        console.log("admin:",admin)
        if(!admin){
            res.status(400).json({success:false, message:"user not exist"})
        }
        if(password !== admin.password){
            return res.status(400).json({success:false, message:"invalid credential"})
        }
        const token = jwt.sign(
            {id : admin._id, username : admin.username},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        console.log("token",token)
            
        res.status(200).json({success: true,message: "Login successful",token,admin: {username: admin.username,},})


    } catch (error) {
        
    }
}

const logout = async(req,res)=>{
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}

const getAllUsers = async(req,res)=>{
    try {
         const page = parseInt(req.query.page) || 1
    const limit = 5
    const skip = (page - 1) * limit
    const search = req.query.search || ""

    const query = {
      $or: [
        { username: { $regex: '^' + search, $options: 'i' } },
        { email: { $regex: '^' + search, $options: 'i' } }
      ]
    }

    const totalUsers = await User.countDocuments(query)
    const totalPages = Math.ceil(totalUsers / limit)

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    res.json({ users, totalPages })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users", error: error.message })
    }
}

const deleteUser = async(req,res)=>{
    try {
        const userId = req.params.id
        console.log("userid",userId)
        const user = await User.findByIdAndDelete(userId)
        if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
     res.status(200).json({ success: true, message: "User deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message })
    }
}

const updateUser = async(req,res)=>{
    try {
        const id = req.params.id
        const { username } = req.body 
        console.log(username)

       const updatedUser = await User.findByIdAndUpdate(
      id,
      { username },
      { new: true } 
    )
    console.log(updateUser)
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser
    })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message })

    }
}

const createUser = async(req,res)=>{
    try {
        const {email, username, password} = req.body
        console.log("req.body",email,username,password)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const hashedPassword  = await bcrypt.hash(password,10)
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();
        console.log(newUser)

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
}

const getEmployeeNames = async(req,res)=>{
    const users = await User.find({}, 'username email');
    res.json(users);
}

const createTask = async(req,res)=>{
    try {
        const { assignedTo, name, description } = req.body;

  if (!assignedTo || !name || !description) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const task = new Task({ assignedTo, name, description });
  await task.save();

  res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }
}

const fetchTasks = async(req,res)=>{
    try {
        const tasks = await Task.find().populate('assignedTo', 'username email').sort({ createdAt: -1 }) // only populate username & email
    res.status(200).json({ success: true, tasks })
    } catch (error) {
        console.error("Error in fetchTasks:", error);
        res.status(500).json({ success: false, message: 'Failed to fetch tasks', error })
    }
}

const deleteTask = async(req,res)=>{
    try {
        const taskId = req.params.id;
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ success: true, message: "Task deleted successfully" });

    } catch (error) {
        console.error("Delete error:", error);
    res.status(500).json({ success: false, message: "Failed to delete task" });

    }
}

const dashboardCounts = async(req,res)=>{
    try {
        const totalUsers = await User.countDocuments()
    const totalTasks = await Task.countDocuments()
    const pendingTasks = await Task.countDocuments({ status: 'Pending' })
    const finishedTasks = await Task.countDocuments({ status: 'Finished' })

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalTasks,
        pendingTasks,
        finishedTasks
      }
    })
    } catch (error) {
        console.error(error)
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard counts' })
    }
}

const userRes = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.json({ success: true, user });
    } catch (error) {
         res.status(500).json({ success: false, message: "User fetch failed" });
    }
}

const taskRes = async(req,res)=>{
    try {
        const tasks = await Task.find({ assignedTo: req.params.id });
    res.json({ success: true, tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch tasks" });
    }
}

const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
    const { approvalStatus } = req.body;

    const updateFields = {
      approvalStatus,
      isCommited: approvalStatus === "Approved",
    };

    // If approved, also mark the task as finished
    if (approvalStatus === "Approved") {
      updateFields.status = "Finished";
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updateFields,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, task: updatedTask });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}



module.exports = {login, 
    logout, 
    getAllUsers, 
    deleteUser, 
    updateUser, 
    createUser, 
    getEmployeeNames, 
    createTask, 
    fetchTasks, 
    deleteTask, 
    dashboardCounts,
    userRes,
    taskRes,
    updateTaskStatus
}