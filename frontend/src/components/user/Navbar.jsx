import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from "axios"

const Navbar = () => {
  const { user, logout } = useAuth() 
  const navigate = useNavigate()

  const handleLogout = async() => {
    try {
      const token = localStorage.getItem("token")
    await axios.post("http://localhost:3000/logout",{},{
      Headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    localStorage.removeItem("token")
    logout()
    navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="text-3xl font-medium">
        <h1>Welcome {user.username}!</h1>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  )
}

export default Navbar