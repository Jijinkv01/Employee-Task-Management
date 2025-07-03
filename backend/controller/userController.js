const User = require("../model/user/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const registerUser = async(req,res)=>{
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

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error });
    }

}

const login = async(req,res)=>{
    try {
        const {email,password} = req.body
        // console.log("req:",email,password)
        const user = await User.findOne({email})
        console.log("user",user)
        if(!user){
            return res.status(400).json({success:false,message:"User not find"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        // console.log("isMatch",isMatch)
        if(!isMatch){
           return res.status(400).json({success:false, message:"Invalid credentials"})
        }
        // Create JWT token
        const token = jwt.sign(
            {userId : user._id , email : user.email},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        
         return res.status(200).json({success: true, message: "Login successful",token,
            user: {email: user.email,username: user.username,},
    });
    

    } catch (error) {
        return res.status(500).json({success:false, message:"Server Error",error})
    }
}

const logout = async(req,res)=>{
    return res.status(200).json({ success: true, message: "Logged out successfully" });
}




module.exports = {registerUser, login, logout}