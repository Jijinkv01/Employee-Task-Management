import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const LoginComponent = () => {
     const navigate = useNavigate()
     const { user } = useAuth()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState("")
    const {login : loginUser} = useAuth()

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!email) return setError("email is required")
        if(!password) return setError("password is required")
          setEmail("")
          setPassword("")
          setError("")


        try {
            const res = await axios.post("http://localhost:3000/login",{email,password})
            if(res.data.success){
              loginUser(res.data.user, res.data.token)
                alert("Login Successfull")
                navigate("/")   
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Login error');
        }

    }
    useEffect(() => {
      if (user) {
        navigate("/", { replace: true })
      }
    }, [user])


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <form
          onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User Login</h2>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email ID</label>
              <input
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>
    
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter a password"
              />
            </div>
    
            {error && (
                <div className='flex justify-center text-red-600 text-lg'>{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
            <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </p>
          </form>
        </div>
  )
}

export default LoginComponent



//  <p className="text-center text-gray-600 mt-4">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-blue-600 hover:underline font-medium">
//               Sign up
//             </Link>
//           </p>