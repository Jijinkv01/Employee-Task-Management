import axios from 'axios'
import React from 'react'
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'


const LoginAdmin = () => {
    const navigate = useNavigate()
    const { admin } = useAdminAuth()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error,setError] = useState("")
    const { login: loginAdmin } = useAdminAuth()

  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(!username) return setError("Username is required")
    if(!password) return setError("password is required")
      setUsername("")
    setPassword("")
    setError("")
    try {
      const res = await axios.post("http://localhost:3000/admin/login",{username, password})
      if(res.data.success){
        loginAdmin(res.data.admin, res.data.token)
        alert(res.data.message)
        navigate("/admin/dashboard")

      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Login error');
    }
  }
useEffect(() => {
  if (admin) {
    navigate("/admin/dashboard", { replace: true })
  }
}, [admin])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter admin username"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
        {error && (
          <div className='text-red-500 flex justify-center'>{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginAdmin